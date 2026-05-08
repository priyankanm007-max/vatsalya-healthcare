$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$PublicRoot = Join-Path $Root "public"
$Port = if ($env:PORT) { [int]$env:PORT } else { 3000 }

$Doctors = @(
  @{ id = "D100"; name = "Dr. Anjali Sharma"; specialty = "General Physician"; languages = @("English", "Hindi", "Bhojpuri"); available = $true; nextAvailable = "10 min"; contact = "+91 99999 00001" },
  @{ id = "D101"; name = "Dr. Rajiv Kumar"; specialty = "Pediatrics"; languages = @("English", "Hindi"); available = $false; nextAvailable = "30 min"; contact = "+91 99999 00002" },
  @{ id = "D102"; name = "Dr. Meera Patel"; specialty = "Gynecology"; languages = @("English", "Hindi", "Gujarati"); available = $true; nextAvailable = "5 min"; contact = "+91 99999 00003" },
  @{ id = "D103"; name = "Dr. Karthik Iyer"; specialty = "Diabetes & BP Care"; languages = @("English", "Tamil"); available = $true; nextAvailable = "15 min"; contact = "+91 99999 00004" },
  @{ id = "D104"; name = "Dr. Farah Khan"; specialty = "Mental Health"; languages = @("English", "Hindi", "Urdu"); available = $false; nextAvailable = "45 min"; contact = "+91 99999 00005" }
)
$Appointments = New-Object System.Collections.ArrayList
$Emergencies = New-Object System.Collections.ArrayList

function Get-ContentType($Path) {
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".svg" { "image/svg+xml" }
    default { "application/octet-stream" }
  }
}

function ConvertTo-JsonBytes($Body) {
  [System.Text.Encoding]::UTF8.GetBytes(($Body | ConvertTo-Json -Depth 8))
}

function New-Response($StatusCode, $ContentType, [byte[]]$BodyBytes) {
  $reason = switch ($StatusCode) {
    200 { "OK" }
    400 { "Bad Request" }
    404 { "Not Found" }
    500 { "Internal Server Error" }
    default { "OK" }
  }
  $headers = @(
    "HTTP/1.1 $StatusCode $reason",
    "Content-Type: $ContentType",
    "Content-Length: $($BodyBytes.Length)",
    "Connection: close",
    "",
    ""
  ) -join "`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
  $all = New-Object byte[] ($headerBytes.Length + $BodyBytes.Length)
  [Array]::Copy($headerBytes, 0, $all, 0, $headerBytes.Length)
  [Array]::Copy($BodyBytes, 0, $all, $headerBytes.Length, $BodyBytes.Length)
  $all
}

function New-JsonResponse($StatusCode, $Body) {
  New-Response $StatusCode "application/json; charset=utf-8" (ConvertTo-JsonBytes $Body)
}

function Parse-Query($Query) {
  $result = @{}
  if ([string]::IsNullOrWhiteSpace($Query)) { return $result }
  foreach ($pair in $Query.TrimStart("?").Split("&")) {
    if ([string]::IsNullOrWhiteSpace($pair)) { continue }
    $parts = $pair.Split("=", 2)
    $key = [System.Uri]::UnescapeDataString($parts[0].Replace("+", " "))
    $value = if ($parts.Count -gt 1) { [System.Uri]::UnescapeDataString($parts[1].Replace("+", " ")) } else { "" }
    $result[$key] = $value
  }
  $result
}

function New-Prescription($Appointment) {
  @(
    "Doctor: $($Appointment.doctorName) ($($Appointment.specialty))",
    "Patient: $($Appointment.patientName), $($Appointment.village)",
    "Advice: Drink clean water, rest, and monitor symptoms twice daily.",
    "Medicine: Paracetamol 500mg after food if fever is present. Do not exceed recommended dose.",
    "Follow-up: Return after 7 days or immediately if breathing difficulty, chest pain, fainting, or worsening symptoms occur."
  ) -join "`n"
}

function Handle-Request($Method, $Target, $BodyText) {
  $uri = [System.Uri]::new("http://localhost$Target")
  $path = $uri.AbsolutePath
  $query = Parse-Query $uri.Query

  if ($path -eq "/api/doctors" -and $Method -eq "GET") {
    return New-JsonResponse 200 @{ doctors = $Doctors }
  }
  if ($path -eq "/api/availability" -and $Method -eq "GET") {
    $availability = $Doctors | ForEach-Object { @{ id = $_.id; available = $_.available; nextAvailable = $_.nextAvailable } }
    return New-JsonResponse 200 @{ availability = $availability }
  }
  if ($path -eq "/api/appointments" -and $Method -eq "GET") {
    $patient = $query["patient"]
    if ([string]::IsNullOrWhiteSpace($patient)) {
      return New-JsonResponse 200 @{ appointments = @($Appointments) }
    }
    $matches = @($Appointments | Where-Object { $_.patientName -like "*$patient*" })
    return New-JsonResponse 200 @{ appointments = $matches }
  }
  if ($path -eq "/api/appointments" -and $Method -eq "POST") {
    $body = $BodyText | ConvertFrom-Json
    if (-not $body.patientName -or -not $body.phone -or -not $body.village -or -not $body.doctorId -or -not $body.preferredDate -or -not $body.issue) {
      return New-JsonResponse 400 @{ error = "Missing required fields." }
    }
    $doctor = $Doctors | Where-Object { $_.id -eq $body.doctorId } | Select-Object -First 1
    if (-not $doctor) {
      return New-JsonResponse 404 @{ error = "Doctor not found." }
    }
    $appointment = [ordered]@{
      id = "A$($Appointments.Count + 1)"
      patientName = [string]$body.patientName
      phone = [string]$body.phone
      village = [string]$body.village
      doctorId = [string]$body.doctorId
      doctorName = $doctor.name
      specialty = $doctor.specialty
      preferredDate = [string]$body.preferredDate
      issue = [string]$body.issue
      status = if ($doctor.available) { "Confirmed" } else { "Waiting" }
      prescription = ""
      createdAt = (Get-Date).ToUniversalTime().ToString("o")
    }
    [void]$Appointments.Add($appointment)
    return New-JsonResponse 200 @{ appointment = $appointment }
  }
  if ($path -eq "/api/prescription" -and $Method -eq "GET") {
    $id = $query["appointmentId"]
    if ([string]::IsNullOrWhiteSpace($id)) {
      return New-JsonResponse 400 @{ error = "Appointment ID required." }
    }
    $appointment = $Appointments | Where-Object { $_.id -eq $id } | Select-Object -First 1
    if (-not $appointment) {
      return New-JsonResponse 404 @{ error = "Appointment not found." }
    }
    if ([string]::IsNullOrWhiteSpace($appointment.prescription)) {
      $appointment.prescription = New-Prescription $appointment
    }
    return New-JsonResponse 200 @{ prescription = $appointment.prescription; appointment = $appointment }
  }
  if ($path -eq "/api/emergency" -and $Method -eq "POST") {
    $body = $BodyText | ConvertFrom-Json
    if (-not $body.patientName -or -not $body.phone -or -not $body.location -or -not $body.issue) {
      return New-JsonResponse 400 @{ error = "Missing required fields." }
    }
    $emergency = [ordered]@{
      id = "E$($Emergencies.Count + 1)"
      patientName = [string]$body.patientName
      phone = [string]$body.phone
      location = [string]$body.location
      issue = [string]$body.issue
      status = "Alert sent to local responders and nearest telemedicine desk"
      createdAt = (Get-Date).ToUniversalTime().ToString("o")
    }
    [void]$Emergencies.Add($emergency)
    return New-JsonResponse 200 @{ emergency = $emergency }
  }

  $relativePath = $path.TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = "index.html" }
  $filePath = Join-Path $PublicRoot $relativePath
  if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
    return New-JsonResponse 404 @{ error = "Not found." }
  }
  New-Response 200 (Get-ContentType $filePath) ([System.IO.File]::ReadAllBytes($filePath))
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-Host "GramCare server running on http://localhost:$Port"

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::UTF8, $false, 8192, $true)
    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($requestLine)) { continue }
    $parts = $requestLine.Split(" ")
    $method = $parts[0]
    $target = $parts[1]
    $contentLength = 0

    while ($true) {
      $line = $reader.ReadLine()
      if ($line -eq $null -or $line -eq "") { break }
      if ($line.ToLowerInvariant().StartsWith("content-length:")) {
        $contentLength = [int]$line.Substring(15).Trim()
      }
    }

    $bodyText = ""
    if ($contentLength -gt 0) {
      $buffer = New-Object char[] $contentLength
      [void]$reader.ReadBlock($buffer, 0, $contentLength)
      $bodyText = -join $buffer
    }

    try {
      $responseBytes = Handle-Request $method $target $bodyText
    }
    catch {
      $responseBytes = New-JsonResponse 500 @{ error = $_.Exception.Message }
    }
    $stream.Write($responseBytes, 0, $responseBytes.Length)
  }
  finally {
    $client.Close()
  }
}

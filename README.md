# Vatsalya Rural Telemedicine

Smart telemedicine application for rural healthcare access. It connects rural patients with qualified doctors through live doctor availability, appointment scheduling, consultation actions, digital prescriptions, multilingual UI, low-data design, and emergency healthcare alerts.

## Working Preview

This project is server-backed. Start the PowerShell API/static server:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

Then open:

```text
http://localhost:3000
```

## Optional Node Server

If Node.js is installed, the Express version also works:

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Features

- Live doctor availability from `/api/doctors`
- Appointment booking through `/api/appointments`
- Appointment tracking from backend memory
- Digital prescription lookup through `/api/prescription`
- Emergency alert creation through `/api/emergency`
- English, Hindi, and Tamil UI
- Mobile-first layout for low-network devices

## Project Structure

- `start-server.ps1` - dependency-free PowerShell backend and web server.
- `server.js` - optional Express backend.
- `public/index.html` - app UI.
- `public/styles.css` - responsive styling.
- `public/app.js` - frontend logic that requires the backend API.

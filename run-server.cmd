@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1" >> "%~dp0server.out.log" 2>> "%~dp0server.err.log"

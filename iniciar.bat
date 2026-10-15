@echo off
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
    echo Node.js nao encontrado. Instale em https://nodejs.org e tente de novo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Instalando dependencias...
    call npm install
)

echo Iniciando API (json-server) na porta 3000...
start "API - json-server" cmd /k "npx json-server db.json --port 3000"

echo Iniciando Angular na porta 4200...
start "Angular" cmd /k "npm run dev -- --open"

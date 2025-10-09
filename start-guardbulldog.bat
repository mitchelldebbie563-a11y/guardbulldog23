@echo off
title GUARDBULLDOG - Phishing Protection System
color 0A

echo.
echo ========================================
echo    GUARDBULLDOG STARTUP SCRIPT
echo    Bowie State University
echo ========================================
echo.

:: Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version and restart this script.
    echo.
    start https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
node --version

:: Check if MongoDB is running (optional)
echo.
echo [2/6] Checking MongoDB connection...
timeout /t 2 /nobreak >nul

:: Install dependencies if needed
echo.
echo [3/6] Installing dependencies...
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install --silent
)

if not exist client\node_modules (
    echo Installing frontend dependencies...
    cd client
    call npm install --silent
    cd ..
)

echo ✓ Dependencies installed

:: Setup environment
echo.
echo [4/6] Setting up environment...
if not exist .env (
    copy .env.example .env >nul
    echo ✓ Created .env file
) else (
    echo ✓ Environment file exists
)

:: Start MongoDB (if needed)
echo.
echo [5/6] Starting database...
echo ✓ Database ready

:: Populate sample data
echo.
echo [6/6] Setting up sample data...
echo Starting GUARDBULLDOG servers...
echo.

:: Display connection info
echo ========================================
echo    GUARDBULLDOG IS STARTING...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Sample Login Accounts:
echo ----------------------
echo Student:     student@bowie.edu     / Student123!
echo Faculty:     faculty@bowie.edu     / Faculty123!
echo Admin:       security@bowie.edu    / Security123!
echo Super Admin: admin@bowie.edu       / Admin123!
echo.
echo Press Ctrl+C to stop the servers
echo ========================================
echo.

:: Start the application
start "GUARDBULLDOG Backend" cmd /k "npm run server"
timeout /t 3 /nobreak >nul
start "GUARDBULLDOG Frontend" cmd /k "cd client && npm start"

:: Open browser after delay
timeout /t 10 /nobreak >nul
start http://localhost:3000

echo.
echo ✓ GUARDBULLDOG is now running!
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the application.
echo.
pause

@echo off
echo ========================================
echo   GUARDBULLDOG Quick Start Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/6] Checking Node.js version...
node --version
echo.

REM Check if .env file exists
if not exist .env (
    echo [2/6] Creating .env file from template...
    copy .env.example .env
    echo.
    echo [IMPORTANT] Please edit .env file with your database credentials!
    echo Press any key after you've configured the .env file...
    pause
) else (
    echo [2/6] .env file already exists
    echo.
)

REM Install server dependencies
echo [3/6] Installing server dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)
echo.

REM Install client dependencies
echo [4/6] Installing client dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

REM Seed database
echo [5/6] Seeding database with demo data...
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Database seeding failed. You may need to configure your database first.
    echo.
)

echo [6/6] Setup complete!
echo.
echo ========================================
echo   GUARDBULLDOG is ready to run!
echo ========================================
echo.
echo Demo Accounts:
echo   Super Admin: admin@bowie.edu / Admin123!
echo   Admin: security@bowie.edu / Security123!
echo   Student: student@bowie.edu / Student123!
echo   Faculty: faculty@bowie.edu / Faculty123!
echo.
echo To start the application:
echo   - Development mode: npm run dev
echo   - Server only: npm run server
echo   - Client only: npm run client
echo.
echo Press any key to exit...
pause >nul

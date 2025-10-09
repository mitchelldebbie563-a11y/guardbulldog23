@echo off
echo ========================================
echo GUARDBULLDOG Installation and Setup
echo ========================================

echo.
echo Step 1: Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version and restart this script after installation.
    echo.
    echo Opening Node.js download page...
    start https://nodejs.org/
    pause
    exit /b 1
) else (
    echo Node.js is installed!
    node --version
)

echo.
echo Step 2: Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies!
    pause
    exit /b 1
)

echo.
echo Step 3: Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies!
    pause
    exit /b 1
)
cd ..

echo.
echo Step 4: Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo Created .env file from .env.example
    echo Please edit .env file with your MongoDB connection string if needed
)

echo.
echo Step 5: Populating sample data...
echo Starting server briefly to populate data...
start /b npm run server
timeout /t 5 /nobreak >nul
node server/scripts/populateSampleData.js
taskkill /f /im node.exe >nul 2>&1

echo.
echo ========================================
echo Setup Complete! Starting GUARDBULLDOG...
echo ========================================
echo.
echo The application will start on:
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Sample login accounts:
echo Student:    student@bowie.edu    / Student123!
echo Admin:      security@bowie.edu   / Security123!
echo Super Admin: admin@bowie.edu     / Admin123!
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev

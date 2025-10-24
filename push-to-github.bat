@echo off
echo ========================================
echo   Push GUARDBULLDOG to GitHub
echo ========================================
echo.

echo Repository: https://github.com/mitchelldebbie563-a11y/guardbulldog23.git
echo.

echo [1/6] Checking Git installation...
git --version
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Git not found!
    echo Please restart your terminal/IDE after installing Git.
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo [2/6] Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo Repository already initialized
)

echo.
echo [3/6] Adding all files...
git add .

echo.
echo [4/6] Committing changes...
git commit -m "Complete GUARDBULLDOG implementation with PostgreSQL backend and React frontend"

echo.
echo [5/6] Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/mitchelldebbie563-a11y/guardbulldog23.git

echo.
echo [6/6] Pushing to GitHub...
echo.
echo NOTE: You may be asked to authenticate with GitHub.
echo Please enter your GitHub credentials when prompted.
echo.
git branch -M main
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your code is now at:
    echo https://github.com/mitchelldebbie563-a11y/guardbulldog23
    echo.
    echo Next steps:
    echo 1. Verify code on GitHub
    echo 2. Connect Netlify to auto-deploy frontend
    echo 3. Connect Render to deploy backend with database
    echo.
) else (
    echo.
    echo ========================================
    echo   Push Failed
    echo ========================================
    echo.
    echo This might be due to:
    echo 1. Authentication required
    echo 2. Network issues
    echo 3. Repository permissions
    echo.
    echo Try running this script again.
    echo.
)

pause

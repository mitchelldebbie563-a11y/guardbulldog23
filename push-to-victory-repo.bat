@echo off
echo ========================================
echo   Push to Your Repository
echo ========================================
echo.

echo Repository: https://github.com/victoryubogu0-hub/Guardbulldog
echo.

echo [1/5] Initializing Git...
git init

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Committing changes...
git commit -m "Complete GUARDBULLDOG implementation with PostgreSQL backend and React frontend"

echo.
echo [4/5] Setting up remote...
git remote remove origin 2>nul
git remote add origin https://github.com/victoryubogu0-hub/Guardbulldog.git

echo.
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo View at: https://github.com/victoryubogu0-hub/Guardbulldog
    echo.
    echo Next steps:
    echo 1. Connect Netlify to this GitHub repo for auto-deploy
    echo 2. Add DATABASE_URL environment variable
    echo 3. Your app will be fully live!
    echo.
) else (
    echo.
    echo ========================================
    echo   Push Failed
    echo ========================================
    echo.
    echo Please check your GitHub credentials.
    echo.
)

pause

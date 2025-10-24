@echo off
echo ========================================
echo   GUARDBULLDOG Frontend Deployment
echo ========================================
echo.

cd client

echo [1/2] Building the application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo [2/2] Deploying to Netlify...
echo.
echo Please follow the prompts:
echo 1. Select "Create & configure a new project"
echo 2. Choose your team
echo 3. Enter site name: guardbulldog-bsu
echo 4. Confirm build directory: build
echo.
pause

npx netlify-cli deploy --prod --dir=build

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
pause

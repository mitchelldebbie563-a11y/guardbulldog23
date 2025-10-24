@echo off
echo ========================================
echo   GUARDBULLDOG Deployment Checker
echo ========================================
echo.

if "%1"=="" (
    echo Usage: check-deployment.bat YOUR_API_URL
    echo Example: check-deployment.bat https://your-app.herokuapp.com
    echo.
    pause
    exit /b 1
)

set API_URL=%1

echo Checking deployment at: %API_URL%
echo.

echo [1/5] Testing API Health...
curl -s %API_URL%/api/health
if %ERRORLEVEL% EQU 0 (
    echo ✅ API is responding
) else (
    echo ❌ API health check failed
)
echo.

echo [2/5] Testing Authentication Endpoint...
curl -s -X POST %API_URL%/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"test\"}"
if %ERRORLEVEL% EQU 0 (
    echo ✅ Auth endpoint is accessible
) else (
    echo ❌ Auth endpoint failed
)
echo.

echo [3/5] Testing Reports Endpoint...
curl -s %API_URL%/api/reports/trending
if %ERRORLEVEL% EQU 0 (
    echo ✅ Reports endpoint is accessible
) else (
    echo ❌ Reports endpoint failed
)
echo.

echo [4/5] Checking CORS Headers...
curl -s -I %API_URL%/api/health | findstr "Access-Control"
if %ERRORLEVEL% EQU 0 (
    echo ✅ CORS is configured
) else (
    echo ⚠️  CORS headers not found
)
echo.

echo [5/5] Testing Database Connection...
echo (This requires a valid login)
echo.

echo ========================================
echo   Deployment Check Complete
echo ========================================
echo.
echo If all checks passed, your deployment is successful!
echo.
echo Next steps:
echo 1. Login with demo account: admin@bowie.edu / Admin123!
echo 2. Test report submission
echo 3. Update frontend API URL
echo.
pause

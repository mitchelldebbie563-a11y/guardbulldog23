@echo off
echo ========================================
echo   GUARDBULLDOG Complete Deployment
echo ========================================
echo.

echo This will deploy your complete application:
echo - Frontend (React App)
echo - Backend (Netlify Functions)
echo - Database (PostgreSQL via environment variables)
echo.

cd client

echo [1/3] Building the application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Deploying to Netlify...
npx netlify-cli deploy --prod --dir=build

echo.
echo [3/3] Setting up environment variables...
echo.
echo IMPORTANT: You need to set these environment variables in Netlify:
echo.
echo 1. Go to: https://app.netlify.com/sites/elaborate-dragon-93e37d/settings/env
echo 2. Add these variables:
echo.
echo    DATABASE_URL = your_postgresql_connection_string
echo    JWT_SECRET = your_jwt_secret_key
echo    NODE_ENV = production
echo.
echo After setting environment variables, your backend will be fully functional!
echo.
echo ========================================
echo   Deployment Instructions
echo ========================================
echo.
echo Your frontend is deployed at:
echo https://elaborate-dragon-93e37d.netlify.app
echo.
echo To complete the setup:
echo 1. Get a PostgreSQL database (free options):
echo    - Supabase: https://supabase.com
echo    - ElephantSQL: https://www.elephantsql.com
echo    - Neon: https://neon.tech
echo.
echo 2. Add the DATABASE_URL to Netlify environment variables
echo.
echo 3. Generate JWT_SECRET:
echo    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
echo.
echo 4. Add JWT_SECRET to Netlify environment variables
echo.
echo 5. Redeploy to apply changes
echo.
pause

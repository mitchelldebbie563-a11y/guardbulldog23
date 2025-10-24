@echo off
echo ========================================
echo   GUARDBULLDOG - Heroku Deployment
echo ========================================
echo.

REM Check if Heroku CLI is installed
where heroku >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Heroku CLI is not installed!
    echo.
    echo Please install Heroku CLI from:
    echo https://devcenter.heroku.com/articles/heroku-cli
    echo.
    pause
    exit /b 1
)

echo [1/8] Logging into Heroku...
call heroku login
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Heroku login failed
    pause
    exit /b 1
)
echo.

echo [2/8] Creating Heroku app...
set APP_NAME=guardbulldog-%RANDOM%
call heroku create %APP_NAME%
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to create Heroku app
    pause
    exit /b 1
)
echo App created: %APP_NAME%
echo.

echo [3/8] Adding PostgreSQL database...
call heroku addons:create heroku-postgresql:hobby-dev -a %APP_NAME%
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add PostgreSQL
    pause
    exit /b 1
)
echo.

echo [4/8] Generating JWT secret...
for /f %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set JWT_SECRET=%%i
echo.

echo [5/8] Setting environment variables...
call heroku config:set JWT_SECRET=%JWT_SECRET% -a %APP_NAME%
call heroku config:set NODE_ENV=production -a %APP_NAME%
call heroku config:set CLIENT_URL=https://%APP_NAME%.herokuapp.com -a %APP_NAME%
echo.

echo [6/8] Initializing git repository...
if not exist .git (
    git init
    git add .
    git commit -m "Initial commit for Heroku deployment"
)
echo.

echo [7/8] Deploying to Heroku...
call heroku git:remote -a %APP_NAME%
git push heroku main
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Deployment failed
    echo Check the logs with: heroku logs --tail -a %APP_NAME%
    pause
    exit /b 1
)
echo.

echo [8/8] Seeding database...
call heroku run npm run seed -a %APP_NAME%
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your GUARDBULLDOG API is now live at:
echo https://%APP_NAME%.herokuapp.com
echo.
echo API Health Check:
echo https://%APP_NAME%.herokuapp.com/api/health
echo.
echo Demo Accounts:
echo   Super Admin: admin@bowie.edu / Admin123!
echo   Admin: security@bowie.edu / Security123!
echo   Student: student@bowie.edu / Student123!
echo   Faculty: faculty@bowie.edu / Faculty123!
echo.
echo Next Steps:
echo 1. Update your frontend API URL to: https://%APP_NAME%.herokuapp.com/api
echo 2. Test the API: curl https://%APP_NAME%.herokuapp.com/api/health
echo 3. Deploy your frontend to Netlify
echo.
echo View logs: heroku logs --tail -a %APP_NAME%
echo Open app: heroku open -a %APP_NAME%
echo.
pause

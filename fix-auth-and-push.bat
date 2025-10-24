@echo off
echo ========================================
echo   Fix Authentication and Push
echo ========================================
echo.

echo [1/6] Clearing Git credentials...
git credential-manager delete https://github.com
cmdkey /delete:LegacyGeneric:target=git:https://github.com 2>nul

echo.
echo [2/6] Removing old remote...
git remote remove origin 2>nul

echo.
echo [3/6] Adding Mitchell repository...
git remote add origin https://mitchelldebbie563-a11y@github.com/mitchelldebbie563-a11y/guardbulldog23.git

echo.
echo [4/6] Adding all files...
git add .

echo.
echo [5/6] Committing changes...
git commit -m "Complete GUARDBULLDOG implementation with full database" 2>nul

echo.
echo [6/6] Pushing to GitHub...
echo.
echo ========================================
echo   AUTHENTICATION REQUIRED
echo ========================================
echo.
echo You will be prompted to login to GitHub.
echo.
echo Use these credentials:
echo   Username: mitchelldebbie563-a11y
echo   Password: Your Personal Access Token
echo.
echo Don't have a token? Create one at:
echo https://github.com/settings/tokens
echo.
echo Click "Generate new token (classic)"
echo Select: repo (all permissions)
echo Copy the token and use as password
echo.
pause

git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS!
    echo ========================================
    echo.
    echo Code pushed to: https://github.com/mitchelldebbie563-a11y/guardbulldog23
    echo.
) else (
    echo.
    echo ========================================
    echo   Push Failed
    echo ========================================
    echo.
    echo Please use GitHub Desktop instead.
    echo It's easier for managing multiple accounts.
    echo.
)

pause

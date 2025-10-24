@echo off
echo ========================================
echo   Push to GitHub with Authentication
echo ========================================
echo.

echo This will clear your Git credentials and let you login again.
echo.

echo [1/4] Clearing old Git credentials...
git credential-cache exit 2>nul
git config --global --unset credential.helper 2>nul

echo.
echo [2/4] Setting up credential helper...
git config --global credential.helper manager

echo.
echo [3/4] Removing old remote...
git remote remove origin 2>nul

echo.
echo [4/4] Adding remote and pushing...
git remote add origin https://github.com/mitchelldebbie563-a11y/guardbulldog23.git

echo.
echo ========================================
echo   IMPORTANT: Authentication Required
echo ========================================
echo.
echo When prompted:
echo   Username: mitchelldebbie563-a11y
echo   Password: Use your GitHub Personal Access Token
echo.
echo Don't have a token? Create one at:
echo https://github.com/settings/tokens
echo.
echo Click "Generate new token (classic)"
echo Select: repo (all permissions)
echo Copy the token and use it as password
echo.
pause

git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo View at: https://github.com/mitchelldebbie563-a11y/guardbulldog23
    echo.
) else (
    echo.
    echo ========================================
    echo   Authentication Failed
    echo ========================================
    echo.
    echo Please create a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Select "repo" scope
    echo 4. Copy the token
    echo 5. Run this script again and use token as password
    echo.
)

pause

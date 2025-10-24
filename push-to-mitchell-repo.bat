@echo off
echo ========================================
echo   Push to Mitchell Repository
echo ========================================
echo.

echo Repository: https://github.com/mitchelldebbie563-a11y/guardbulldog23.git
echo.

echo [1/5] Removing old remote...
git remote remove origin 2>nul

echo.
echo [2/5] Adding Mitchell repository...
git remote add origin https://github.com/mitchelldebbie563-a11y/guardbulldog23.git

echo.
echo [3/5] Adding all files...
git add .

echo.
echo [4/5] Committing changes...
git commit -m "Complete GUARDBULLDOG implementation with full database"

echo.
echo [5/5] Pushing to Mitchell repository...
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to Mitchell repo!
    echo ========================================
    echo.
    echo View at: https://github.com/mitchelldebbie563-a11y/guardbulldog23
    echo.
) else (
    echo.
    echo ========================================
    echo   Push Failed
    echo ========================================
    echo.
    echo You may need to authenticate as mitchelldebbie563-a11y
    echo Use GitHub Desktop or create a Personal Access Token
    echo.
)

pause

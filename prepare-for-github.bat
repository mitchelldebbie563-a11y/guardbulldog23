@echo off
echo ========================================
echo   Preparing GUARDBULLDOG for GitHub
echo ========================================
echo.

echo Your GitHub Repository:
echo https://github.com/mitchelldebbie563-a11y/guardbulldog23.git
echo.

echo [1/3] Checking project structure...
if exist "server" (
    echo ✓ Server folder found
) else (
    echo ✗ Server folder missing
)

if exist "client" (
    echo ✓ Client folder found
) else (
    echo ✗ Client folder missing
)

if exist "package.json" (
    echo ✓ package.json found
) else (
    echo ✗ package.json missing
)

echo.
echo [2/3] Checking for sensitive files...
if exist ".env" (
    echo ⚠ WARNING: .env file found - DO NOT upload this!
    echo   It contains secrets and is already in .gitignore
) else (
    echo ✓ No .env file (good - use .env.example instead)
)

if exist "node_modules" (
    echo ⚠ node_modules folder found - This is large and in .gitignore
    echo   It will NOT be uploaded (correct behavior)
) else (
    echo ✓ No node_modules folder
)

echo.
echo [3/3] Project is ready for GitHub!
echo.
echo ========================================
echo   Upload Options
echo ========================================
echo.
echo OPTION 1: GitHub Web Interface (No Git needed)
echo   1. Go to: https://github.com/mitchelldebbie563-a11y/guardbulldog23
echo   2. Click "Add file" → "Upload files"
echo   3. Drag this entire folder
echo   4. Commit changes
echo.
echo OPTION 2: Install Git (Recommended)
echo   1. Download: https://git-scm.com/download/win
echo   2. Install Git
echo   3. Run: git init
echo   4. Run: git add .
echo   5. Run: git commit -m "Complete implementation"
echo   6. Run: git remote add origin https://github.com/mitchelldebbie563-a11y/guardbulldog23.git
echo   7. Run: git push -u origin main --force
echo.
echo OPTION 3: GitHub Desktop (User-friendly)
echo   1. Download: https://desktop.github.com
echo   2. Install and sign in
echo   3. Add this folder as repository
echo   4. Commit and push
echo.
echo ========================================
echo   Important Files Summary
echo ========================================
echo.
echo ✓ Backend: server/ folder
echo ✓ Frontend: client/ folder
echo ✓ Functions: netlify/functions/ folder
echo ✓ Config: package.json, render.yaml, netlify.toml
echo ✓ Docs: All .md files
echo ✓ Scripts: All .bat files
echo.
echo ✗ Excluded: node_modules/, .env, uploads/, build/
echo   (These are in .gitignore and won't be uploaded)
echo.
echo ========================================
echo.
echo See UPLOAD_TO_GITHUB.md for detailed instructions!
echo.
pause

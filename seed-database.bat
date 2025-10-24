@echo off
echo ========================================
echo   Seeding Database with Demo Data
echo ========================================
echo.

set DATABASE_URL=postgresql://postgres:Steve2025%%40%%23$$@db.qbwvgznwpkvxltjmqnvu.supabase.co:5432/postgres
set JWT_SECRET=4a6e9fc2aa494b5dcb35644d966657d245106c12419b50ad7d45858184d25c60
set NODE_ENV=development

echo Running database seed script...
node server/scripts/seed.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Database Seeded Successfully!
    echo ========================================
    echo.
    echo Demo Accounts Created:
    echo   Super Admin: admin@bowie.edu / Admin123!
    echo   Admin: security@bowie.edu / Security123!
    echo   Student: student@bowie.edu / Student123!
    echo   Faculty: faculty@bowie.edu / Faculty123!
    echo.
) else (
    echo.
    echo ========================================
    echo   Seeding Failed
    echo ========================================
    echo.
    echo Check the error messages above.
    echo.
)

pause

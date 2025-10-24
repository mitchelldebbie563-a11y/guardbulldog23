@echo off
cd client
npx netlify-cli env:set DATABASE_URL "postgresql://postgres:Steve2025@#$$@db.qbwvgznwpkvxltjmqnvu.supabase.co:5432/postgres"
pause

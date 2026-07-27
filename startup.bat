@echo off
echo Installing dependencies using pnpm v9...
call npx pnpm@9 install
if %errorlevel% neq 0 (
    echo Installation failed!
    pause
    exit /b %errorlevel%
)

echo Starting Vite development server...
call npx pnpm@9 run dev
pause

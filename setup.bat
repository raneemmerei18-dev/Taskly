# Taskly Installation & Setup Script for Windows
# Run this script to setup both frontend and backend

@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Taskly - Full Stack Task Manager Setup
echo ==========================================
echo.

REM Check Node.js installation
echo 📦 Checking Node.js...
where node >nul 2>nul
if !errorlevel! neq 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js !NODE_VERSION!
)

REM Check npm installation
echo 📦 Checking npm...
where npm >nul 2>nul
if !errorlevel! neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm !NPM_VERSION!
)

echo.
echo ---
echo.

REM Setup Backend
echo 🔧 Setting up Backend...
cd backend

if exist ".env" (
    echo ✅ .env file already exists
) else (
    echo 📝 Creating .env from .env.example
    copy .env.example .env
)

echo 📥 Installing backend dependencies...
call npm install

if !errorlevel! equ 0 (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ---
echo.

REM Setup Frontend
echo 🎨 Setting up Frontend...
cd frontend

if exist ".env" (
    echo ✅ .env file already exists
) else (
    echo 📝 Creating .env from .env.example
    copy .env.example .env
)

echo 📥 Installing frontend dependencies...
call npm install

if !errorlevel! equ 0 (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ==========================================
echo ✅ Setup Complete!
echo.
echo 📋 Next Steps:
echo 1. Start MongoDB (if not already running^)
echo 2. From project root, run:
echo    npm run dev
echo 3. Open http://localhost:5173 in your browser
echo 4. Optional: run backend/frontend separately from their folders
echo.
echo Happy coding! 🎉
echo.
pause

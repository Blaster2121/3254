@echo off
REM Law.Docx Legal Tools - Quick Setup Script for Windows
REM This script helps Windows users quickly set up the legal tools application

echo 🚀 Law.Docx Legal Tools - Quick Setup
echo ======================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Required version: 14 or higher
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available!
    pause
    exit /b 1
)

echo ✅ npm detected
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the application:
echo   npm start
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo 📚 For detailed instructions, see README.md
echo.
echo 🔗 POE Bot for lease analysis:
echo   https://poe.com/Lease_Risks
echo.
pause

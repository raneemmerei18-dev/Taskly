#!/bin/bash

# Taskly Installation & Setup Script
# Run this script to setup both frontend and backend

echo "🚀 Taskly - Full Stack Task Manager Setup"
echo "=========================================="
echo ""

# Check Node.js installation
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js $(node --version)"
fi

# Check npm installation
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
else
    echo "✅ npm $(npm --version)"
fi

echo ""
echo "---"
echo ""

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend

if [ -f ".env" ]; then
    echo "✅ .env file already exists"
else
    echo "📝 Creating .env from .env.example"
    cp .env.example .env
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "---"
echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd frontend

if [ -f ".env" ]; then
    echo "✅ .env file already exists"
else
    echo "📝 Creating .env from .env.example"
    cp .env.example .env
fi

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB (if not already running)"
echo "2. From project root, run:"
echo "   npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo "4. Optional: run backend/frontend separately from their folders"
echo ""
echo "Happy coding! 🎉"

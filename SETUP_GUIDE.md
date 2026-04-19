# Detailed Setup & Deployment Guide

## 📋 System Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **MongoDB**: v4.4 or higher
- **Git**: (optional, for cloning)
- **RAM**: 4GB minimum
- **Disk Space**: 2GB for node_modules + databases

## 🔧 Detailed Installation Steps

### Step 1: Install Node.js & npm

#### Windows
1. Go to https://nodejs.org/
2. Download LTS version
3. Run installer with default settings
4. Restart your computer
5. Verify installation:
```bash
node --version
npm --version
```

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Verify
node --version
npm --version
```

### Step 2: MongoDB Setup

#### Option A: Local MongoDB Installation

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer with default options
3. Check "Install as a Service"
4. Start service: `net start MongoDB`

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
5. Add to backend `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskly
```

#### Option C: Docker (Easiest)

```bash
# Install Docker first from https://www.docker.com/

# Run MongoDB container
docker run -d -p 27017:27017 --name taskly-mongo mongo:latest

# To stop:
docker stop taskly-mongo

# To restart:
docker start taskly-mongo
```

### Step 3: Backend Setup

```bash
# Navigate to backend
cd backend

# Install all dependencies
npm install

# Create .env file (copy provided template)
copy .env.example .env  # Windows
# OR
cp .env.example .env    # macOS/Linux

# Start development server
npm run start:dev

# You should see:
# [Nest] 12345 - 04/07/2024, 10:30:00 AM     LOG [NestFactory] Nest application successfully started
# 🚀 Backend running on http://localhost:3001
```

**Backend is now running!** ✅

### Step 4: Frontend Setup (in new terminal)

```bash
# Navigate to frontend
cd frontend

# Install all dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # macOS/Linux

# Start development server
npm run dev

# You should see:
# ➜  Local:   http://localhost:5173/
# ➜  Press q to quit
```

**Frontend is now running!** ✅

### Step 5: Access the Application

1. Open browser: http://localhost:5173
2. Create an account or login
3. Start managing tasks!

## 🧪 Testing the Application

### Manual Testing Steps

1. **Register New User**
   - Go to /login
   - Click "Register"
   - Enter email: `test@example.com`
   - Enter password: `test123456`
   - See success message

2. **Login**
   - Enter same credentials
   - Should be redirected to /tasks

3. **Create Task**
   - Enter "Buy groceries" in input
   - Click "Add Task"
   - See new task appear at top

4. **Toggle Completion**
   - Click checkbox next to task
   - Task should gray out and show strikethrough

5. **Edit Task**
   - Click on task title
   - Edit text inline
   - Click outside to save

6. **Filter Tasks**
   - Click "Done" filter
   - Only completed tasks shown
   - Click "Pending" - only incomplete tasks
   - Click "All" - all tasks shown

7. **Delete Task**
   - Click ✕ button
   - Confirm deletion
   - Task removed from list

8. **Logout**
   - Click "Logout" button
   - Back to login page
   - Token removed from localStorage

9. **Persistence**
   - Logout
   - Login again
   - Tasks still there!

## 🚀 Production Deployment

### Build Backend

```bash
cd backend

# Build TypeScript
npm run build

# This creates dist/ folder with compiled JavaScript

# For production, use:
npm run start:prod

# Or use a process manager:
npm install -g pm2
pm2 start dist/main.js --name "taskly-api"
```

### Build Frontend

```bash
cd frontend

# Create optimized production build
npm run build

# This creates dist/ folder with optimized assets

# To preview:
npm run preview
```

### Deployment Options

#### Deploy Backend (NestJS)

**Heroku:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create taskly-api

# Add MongoDB Atlas connection
heroku config:set MONGODB_URI="your-atlas-uri"
heroku config:set JWT_SECRET="your-secret"

# Deploy
git push heroku main
```

**DigitalOcean / VPS:**
```bash
# Upload backend folder
scp -r backend/ user@your-server:/var/www/

# SSH into server
ssh user@your-server

# Install dependencies
cd /var/www/backend
npm install

# Start with PM2
pm2 start dist/main.js --name "taskly"
```

**AWS / Azure:** Use their respective deployment guides

#### Deploy Frontend (Vue)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

**GitHub Pages:**
```bash
# Update vite.config.ts
# Change: base: '/taskly/' (if deploying to /taskly/)

npm run build

# Deploy dist folder to gh-pages branch
```

## 📊 Environment Configuration for Deployment

### Production Backend (.env)

```env
# Use MongoDB Atlas or managed service
MONGODB_URI=mongodb+srv://production-user:password@cluster.mongodb.net/taskly-prod

# Strong secret key - generate with:
# openssl rand -hex 32
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z

# Update to your frontend URL
CORS_ORIGIN=https://taskly-frontend.vercel.app

# Use port from environment or default to 3001
PORT=3001
```

### Production Frontend (.env.production)

```env
VITE_API_URL=https://taskly-api.herokuapp.com
# OR
VITE_API_URL=https://api.yourdomain.com
```

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] CORS_ORIGIN points to production frontend
- [ ] MONGODB_URI uses strong passwords
- [ ] Environment files are not committed to git
- [ ] HTTPS enabled in production
- [ ] Password hashing: bcrypt with 10+ rounds (✓ auto)
- [ ] Input validation enabled (✓ auto)
- [ ] Auth guards on protected routes (✓ auto)

## 🐛 Debugging Tips

### Enable Debug Logging

**Backend:**
```typescript
// In auth.service.ts around line 30
console.log('Login attempt:', email);
```

**Frontend:**
```javascript
// In api.ts
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  }
);
```

### Database Debugging

```bash
# MongoDB shell (local)
mongo
> use taskly
> db.users.find()
> db.tasks.find()

# MongoDB Compass (GUI)
# Download from https://www.mongodb.com/products/compass
```

### Network Debugging

```bash
# Monitor requests in browser DevTools
# Press F12 > Network tab
# Create task and watch requests

# Or use curl:
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

## 📈 Performance Optimization

### Backend
```bash
# Enable compression
npm install compression
```

### Frontend
```bash
# Build size analysis
npm install -g rollup-plugin-visualizer

# Will show which packages take most space
```

### Database
```javascript
// Create indexes in MongoDB
db.tasks.createIndex({ userId: 1, createdAt: -1 })
db.users.createIndex({ email: 1 })
```

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB not running - see MongoDB Setup section |
| `Token expires too quickly` | Check JWT_SECRET in backend |
| `CORS error` | Update CORS_ORIGIN in backend .env |
| `Can't login after fresh install` | Clear localStorage in browser dev tools |
| `Slow when creating tasks` | Check database connection, add indexes |
| `Port already in use` | Kill process or use different port |

---

**Need help? Check the main README.md or troubleshooting section!**

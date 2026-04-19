# Taskly - Full-Stack Task Manager

A modern, full-stack task management application built with Vue 3 (frontend), NestJS (backend), and MongoDB (database).

![Taskly](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb)

## 🎯 Features

- ✨ **Modern UI** - Clean, gradient-based design with smooth animations
- 🔐 **Authentication** - JWT-based login and registration with password hashing
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🎨 **Inline Editing** - Click to edit task titles directly
- 🔍 **Filtering** - Filter tasks by status (All, Done, Pending)
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🚀 **Production Ready** - Clean architecture, proper error handling, validated inputs
- 💾 **Persistent Storage** - Tasks stored in MongoDB with user isolation
- 🛡️ **Security** - CORS configured, password hashing with bcrypt, JWT protection

## 📋 Project Structure

```
Taskly/
├── backend/                          # NestJS Backend API
│   ├── src/
│   │   ├── auth/                     # Authentication module
│   │   │   ├── dtos/
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── login.dto.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                    # Users module
│   │   │   ├── schemas/
│   │   │   │   └── user.schema.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── tasks/                    # Tasks module
│   │   │   ├── dtos/
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── task.schema.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── common/                   # Shared functionality
│   │   │   ├── guards/
│   │   │   │   └── jwt.guard.ts
│   │   │   └── decorators/
│   │   │       └── current-user.decorator.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .env
│   └── README.md
│
├── frontend/                         # Vue 3 Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.vue
│   │   │   ├── TaskForm.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── pages/
│   │   │   ├── LoginPage.vue
│   │   │   └── TasksPage.vue
│   │   ├── router/
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── taskService.ts
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.example
│   ├── .env
│   └── README.md
│
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+
- **npm** or **yarn**
- **MongoDB** (local or cloud - MongoDB Atlas)

### 1️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows with MongoDB installed
net start MongoDB

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in backend `.env`

### 2️⃣ Install All Dependencies (One Command)

```bash
# Run from project root
npm run install:all
```

### 3️⃣ Run Frontend + Backend Together

```bash
# Run from project root
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

### 4️⃣ (Optional) Run Services Separately

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already provided, but verify settings)
# Check .env for correct MONGODB_URI

# Start in development mode
npm run start:dev

# Backend will run on http://localhost:3001
```

```bash
cd frontend

# Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

### 5️⃣ Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🔑 Environment Variables

### Backend (.env)

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/taskly
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskly

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Server Port
PORT=3001
```

### Frontend (.env)

```env
# API URL
VITE_API_URL=http://localhost:3001
```

## 📚 API Documentation

### Authentication Endpoints

**Register**
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { "token": "eyJhbGc..." }
```

**Login**
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { "token": "eyJhbGc..." }
```

### Task Endpoints

**Get All Tasks** (Protected)
```
GET /tasks
Authorization: Bearer <token>

Response: [
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "completed": false,
    "userId": "507f1f77bcf86cd799439010",
    "createdAt": "2024-04-07T10:30:00Z"
  }
]
```

**Create Task** (Protected)
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries"
}

Response: { "_id": "...", "title": "...", "completed": false, ... }
```

**Update Task** (Protected)
```
PATCH /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",  // optional
  "completed": true          // optional
}

Response: { "_id": "...", "title": "...", "completed": true, ... }
```

**Delete Task** (Protected)
```
DELETE /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
```

## 🎨 Frontend Features

### Login Page
- Clean, modern gradient design
- Email and password fields with validation
- Toggle between login and register modes
- Error messages display
- Auto-redirect after login

### Tasks Dashboard
- Display all user tasks in card format
- Real-time task count
- Add new tasks via input form
- Toggle task completion with checkbox
- Click title to edit inline
- Delete tasks with confirmation
- Filter tasks (All, Done, Pending)
- Empty state with helpful message
- Loading spinner during data fetch
- Logout button

### Responsive Design
- Works on desktop, tablet, and mobile
- Flexible layouts using CSS Grid and Flexbox
- Touch-friendly buttons and inputs
- Optimized for all screen sizes

## 🔐 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **CORS Protection** - Configured for frontend domain
- ✅ **Input Validation** - class-validator on backend
- ✅ **User Isolation** - Users can only access their own tasks
- ✅ **Protected Routes** - Auth guard on all task endpoints

## 🏗️ Architecture Highlights

### Clean Code Practices
- Separation of concerns (controllers, services, DTOs)
- Single responsibility principle
- DRY (Don't Repeat Yourself) principles
- Comprehensive comments explaining logic
- TypeScript for type safety

### Backend Architecture
- **Modular Structure** - Auth, Users, Tasks modules
- **DTOs** - Input validation with class-validator
- **Services** - Business logic encapsulation
- **Controllers** - HTTP route handling
- **Guards** - Authentication and authorization
- **Decorators** - Custom metadata (`@CurrentUser`)
- **Schemas** - MongoDB Mongoose schemas

### Frontend Architecture
- **Vue 3 Composition API** - Modern reactive system
- **Service Layer** - API calls abstraction
- **Component-based** - Reusable UI components
- **Router Guards** - Route protection
- **Error Handling** - Try-catch with user feedback
- **State Management** - Local component state with refs

## 📦 Production Build

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build

# Output in dist/ folder - deploy to any static host
```

## 🐛 Testing the Application

### Test Account (After Startup)
1. Go to http://localhost:5173
2. Click "Register" 
3. Create account:
   - Email: `test@example.com`
   - Password: `test123456`
4. After login, create some tasks
5. Try all features:
   - Add tasks
   - Toggle completion
   - Edit task titles
   - Delete tasks
   - Filter by status
   - Logout and login

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running or update `MONGODB_URI` in backend `.env`

### Frontend Can't Connect to Backend
```
Error: Network Error at http://localhost:3001
```
**Solution:** 
- Check if backend is running on port 3001
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend

### Token Errors / Unauthorized
```
Error: 401 Unauthorized
```
**Solution:**
- Try logging out (localStorage cleared)
- Close browser and reopen frontend
- Check JWT token expiration (currently 24h)

### Port Already in Use
```
Error: listen EADDRINUSE :::3001
```
**Solution:**
```bash
# Kill process on port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3001 | xargs kill -9
```

## 📝 Key Technologies

| Layer | Technology | Details |
|-------|-----------|---------|
| Frontend | Vue 3 | Modern JS framework |
| Frontend | TypeScript | Type-safe JavaScript |
| Frontend | Vue Router | Client-side routing |
| Frontend | Axios | HTTP requests |
| Frontend | CSS3 | Modern styling |
| Backend | NestJS | Node.js framework |
| Backend | TypeScript | Type-safe backend |
| Backend | Passport.js | Authentication strategy |
| Backend | JWT | Token-based auth |
| Backend | Mongoose | MongoDB ODM |
| Backend | class-validator | Input validation |
| Backend | bcrypt | Password hashing |
| Database | MongoDB | NoSQL database |

## 🎓 Learning Resources

- Vue 3 Docs: https://vuejs.org/
- NestJS Docs: https://docs.nestjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- JWT: https://jwt.io/

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 👤 Author

Built as a comprehensive, production-ready task manager with modern practices and clean architecture.

---

**Happy Task Managing! 🚀**

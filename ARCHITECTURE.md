# Architecture Documentation

## System Overview

Taskly is a three-tier web application:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       CLIENT TIER (Vue 3)                           │
│                                                                     │
│  ┌────────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  LoginPage     │  │  TasksPage      │  │  Components          │ │
│  │                │  │                 │  │  - TaskCard          │ │
│  │  - Register    │  │  - Task Lists   │  │  - TaskForm          │ │
│  │  - Login       │  │  - Filtering    │  │  - LoadingSpinner    │ │
│  │  - Auth Toggle │  │  - Delete/Edit  │  │                      │ │
│  └────────────────┘  └─────────────────┘  └──────────────────────┘ │
│                                                                     │
│  Services Layer:                                                    │
│  - api.ts (Axios + Interceptors)                                   │
│  - auth.ts (Auth operations)                                       │
│  - taskService.ts (Task CRUD)                                      │
│                                                                     │
│  Router: Vue Router with auth guards                               │
└─────────────────────────────────────────────────────────────────────┘
                                 ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER (NestJS)                        │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ AppModule - Root Module                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐    │
│  │  AuthModule  │  │  UsersModule │  │  TasksModule          │    │
│  │              │  │              │  │                       │    │
│  │ Controller:  │  │ Service:     │  │ Controller:           │    │
│  │ - register   │  │ - create     │  │ - POST /tasks         │    │
│  │ - login      │  │ - findByEmail│  │ - GET /tasks          │    │
│  │              │  │ - validateUsr│  │ - PATCH /tasks/:id    │    │
│  │ Service:     │  │              │  │ - DELETE /tasks/:id   │    │
│  │ - register   │  │              │  │                       │    │
│  │ - login      │  │              │  │ Service:              │    │
│  │              │  │              │  │ - create              │    │
│  │ Strategy:    │  │              │  │ - findAll             │    │
│  │ - JWT        │  │              │  │ - update              │    │
│  │              │  │              │  │ - delete              │    │
│  └──────────────┘  └──────────────┘  └───────────────────────┘    │
│                                                                     │
│  Guards & Middleware:                                               │
│  - JwtAuthGuard: Validates JWT tokens                              │
│  - CurrentUser Decorator: Extracts user from request               │
│                                                                     │
│  Validation:                                                        │
│  - class-validator: Input validation on DTOs                       │
│  - ValidationPipe: Auto validation on controllers                  │
└─────────────────────────────────────────────────────────────────────┘
                                 ↕ MongoDB Protocol
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA TIER (MongoDB)                            │
│                                                                     │
│  ┌──────────────────────┐        ┌──────────────────────┐          │
│  │   Users Collection   │        │  Tasks Collection    │          │
│  │                      │        │                      │          │
│  │  _id: ObjectId       │        │  _id: ObjectId       │          │
│  │  email: string       │        │  title: string       │          │
│  │  password: string    │        │  completed: boolean  │          │
│  │  createdAt: Date     │◄───┐   │  userId: ObjectId    │          │
│  │                      │    │   │  createdAt: Date     │          │
│  └──────────────────────┘    │   └──────────────────────┘          │
│                              │                                      │
│                      (User has many tasks)                         │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. User Registration Flow

```
User Input (email, password)
         ↓
LoginPage Component
         ↓
authService.register(email, password)
         ↓
API Request: POST /auth/register
         ↓
AuthController.register()
         ↓
AuthService.register()
         ↓
UsersService.create()
         ↓
bcrypt.hash(password) → Store hashed password
         ↓
JwtService.sign({userId, email}) → Generate token
         ↓
API Response: { token: "..." }
         ↓
localStorage.setItem('token')
         ↓
Router.push('/tasks')
```

### 2. Task Creation Flow

```
User types task & clicks "Add"
         ↓
TaskForm emits 'add' event
         ↓
TasksPage.addTask(title)
         ↓
taskService.createTask(title)
         ↓
API Request: POST /tasks
  Headers: Authorization: Bearer <token>
  Body: { title: "..." }
         ↓
JwtAuthGuard validates token
         ↓
CurrentUser decorator extracts userId from token
         ↓
TasksController.create()
         ↓
TasksService.create(title, userId)
         ↓
TaskSchema.save() → MongoDB creates document
         ↓
API Response: { _id: "...", title: "...", ... }
         ↓
Task added to components' tasks array
         ↓
Vue re-renders UI with new task
```

### 3. Authentication Guard Flow

```
User navigates to /tasks
         ↓
Router calls beforeEnter guard
         ↓
requireAuth guard checks:
  - authService.isLoggedIn() → localStorage.getItem('token')
  ↓ if true
  next() → Allow navigation
  ↓ if false
  next('/login') → Redirect to login
```

## Module Interactions

### Auth Module
- **Sole Dependency**: UsersModule
- **Provides**: JWT tokens, authentication validation
- **Used By**: Client (routes) and JwtAuthGuard
- **Purpose**: User authentication (register/login)

### Users Module
- **No Dependencies** on other modules
- **Provides**: User CRUD operations, password validation
- **Used By**: AuthModule
- **Purpose**: User data management

### Tasks Module
- **No Dependencies** on other modules
- **Provides**: Task CRUD operations with user isolation
- **Used By**: Client (API calls)
- **Purpose**: Task management

### Common Module
- **Guards**: JwtAuthGuard (protects routes)
- **Decorators**: CurrentUser (extracts user from JWT)
- **Used**: On TasksController methods

## Security Architecture

```
Request Flow:
Request with JWT Token
         ↓
CORS Middleware (Check origin)
         ↓
JwtAuthGuard (Validate token)
         ↓
Passport JWT Strategy (Extract payload)
         ↓
Controller Handler
         ↓
Service Logic (Validate ownership, etc.)
         ↓
Database Operation

Error Handling:
Invalid Token → 401 Unauthorized
Expired Token → 401 Unauthorized
Invalid Credentials → 400 Bad Request (intentionally vague)
User Tries to Access Other's Task → 403 Forbidden
Invalid Input → 400 Bad Request (with validation errors)
```

## Scalability Considerations

### Current Design Supports:
- ✅ Thousands of users
- ✅ Millions of tasks
- ✅ Fast queries with indexing

### For Heavy Production Load:

1. **Database Caching**
   ```javascript
   // Add Redis for session caching
   redis.get(userId) // Cache user data
   ```

2. **Load Balancing**
   ```javascript
   // Run multiple backend instances
   // Use nginx or load balancer
   ```

3. **Database Optimization**
   ```javascript
   // Add indexes (already included)
   db.tasks.createIndex({ userId: 1, createdAt: -1 })
   ```

4. **Frontend Optimization**
   ```javascript
   // Code splitting already done
   // Virtual scrolling for large task lists
   ```

## Error Handling Strategy

```
Frontend Error Handling:
try {
  API Call → Get Response
} catch (error) {
  if (error.status === 401)
    → Clear token & redirect to login
  else if (error.status === 400)
    → Show validation error message
  else
    → Show generic error "Try again"
}

Backend Error Handling:
Controller receives request
    ↓
ValidationPipe auto-validates DTO
    ↓ Invalid?
    → Throw BadRequestException with details
    ↓ Valid?
    → Call Service
    ↓
Service executes business logic
    ↓ Authentication error?
    → Throw UnauthorizedException
    ↓ Authorization error?
    → Throw ForbiddenException
    ↓ Resource not found?
    → Throw NotFoundException
    ↓ Other error?
    → Throw appropriate exception

Exception translated to HTTP response with status code
    ↓
Frontend receives error response
    ↓
Error handler processes it
```

## Performance Optimizations

### Backend
- JWT tokens cache validation
- Database indexes on frequently queried fields
- CORS pre-flight caching

### Frontend
- Code splitting with Vue Router
- Lazy loading of components
- API request caching (localStorage for non-relati

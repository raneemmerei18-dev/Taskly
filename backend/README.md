# NestJS Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file (copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/taskly
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:5173
```

### 3. Prerequisites
- **MongoDB** should be running locally on `mongodb://localhost:27017`
  - On Windows with MongoDB installed, ensure MongoDB service is running
  - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 4. Run Development Server
```bash
npm run start:dev
```

Server will start on `http://localhost:3001`

### 5. API Endpoints

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

**Tasks (requires JWT token in Authorization header):**
- `GET /tasks` - Get all tasks for user
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### 6. Testing Authentication
All protected endpoints require an `Authorization: Bearer <token>` header with the JWT token from login/register response.

# API Reference Quick Guide

## Base URLs

- **Development Backend**: `http://localhost:3001`
- **Development Frontend**: `http://localhost:5173`
- **API Prefix**: `/`

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email or password too short
- `409 Conflict` - Email already registered

**Example with curl:**
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

---

### POST /auth/login

Authenticate user with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Invalid credentials

**Example with curl:**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

---

## Task Endpoints

**⚠️ All task endpoints require authentication!**

Include JWT token in header:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

### GET /tasks

Retrieve all tasks for the authenticated user.

**Request:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "completed": false,
    "userId": "507f1f77bcf86cd799439010",
    "createdAt": "2024-04-07T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Finish project",
    "completed": true,
    "userId": "507f1f77bcf86cd799439010",
    "createdAt": "2024-04-06T15:45:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

**Example with curl:**
```bash
curl -X GET http://localhost:3001/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### POST /tasks

Create a new task.

**Request:**
```json
{
  "title": "Buy groceries"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "completed": false,
  "userId": "507f1f77bcf86cd799439010",
  "createdAt": "2024-04-07T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing or empty title
- `401 Unauthorized` - Missing or invalid token

**Example with curl:**
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'
```

---

### PATCH /tasks/:id

Update a task (title, completion status, or both).

**Request:**
```json
{
  "title": "Updated title",
  "completed": true
}
```

*Both fields are optional - you can update just one.*

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated title",
  "completed": true,
  "userId": "507f1f77bcf86cd799439010",
  "createdAt": "2024-04-07T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid title (empty or too long)
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - You don't own this task
- `404 Not Found` - Task doesn't exist

**Examples:**

Toggle completion:
```bash
curl -X PATCH http://localhost:3001/tasks/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

Update title:
```bash
curl -X PATCH http://localhost:3001/tasks/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New title"}'
```

---

### DELETE /tasks/:id

Delete a task permanently.

**Request:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "completed": false,
  "userId": "507f1f77bcf86cd799439010",
  "createdAt": "2024-04-07T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - You don't own this task
- `404 Not Found` - Task doesn't exist

**Example with curl:**
```bash
curl -X DELETE http://localhost:3001/tasks/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input, missing fields, validation failed |
| 401 | Unauthorized | Missing token, invalid token, expired token |
| 403 | Forbidden | Authenticated but no permission (trying to access other's task) |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Server-side error |

---

## JWT Token Format

JWTs are three parts separated by dots:

```
header.payload.signature
```

**Decoded Payload Example:**
```json
{
  "sub": "507f1f77bcf86cd799439010",
  "email": "user@example.com",
  "iat": 1712494200,
  "exp": 1712580600
}
```

**Fields:**
- `sub`: User ID (subject)
- `email`: User email
- `iat`: Issued at (timestamp)
- `exp`: Expires at (timestamp) - 24 hours after issue

---

## Testing with Frontend Service

### JavaScript/TypeScript

```typescript
import { authService } from '@/services/auth';
import { taskService } from '@/services/taskService';

// Register
await authService.register('user@example.com', 'password123');

// Login
await authService.login('user@example.com', 'password123');

// Get tasks
const tasks = await taskService.getTasks();

// Create task
const newTask = await taskService.createTask('My task title');

// Update task
await taskService.updateTask(taskId, { completed: true });

// Delete task
await taskService.deleteTask(taskId);

// Logout
authService.logout();
```

---

## Common Workflows

### Complete User Journey

```bash
# 1. Register
POST /auth/register
{
  "email": "alice@example.com",
  "password": "secure123"
}
# Response: { "token": "abc123..." }

# 2. Create Task
POST /tasks
Headers: Authorization: Bearer abc123...
{
  "title": "First task"
}
# Response: { "_id": "task1", "title": "First task", "completed": false }

# 3. Get All Tasks
GET /tasks
Headers: Authorization: Bearer abc123...
# Response: [{ "id": "task1", "title": "First task", ... }]

# 4. Update Task
PATCH /tasks/task1
Headers: Authorization: Bearer abc123...
{
  "completed": true
}
# Response: { "_id": "task1", "completed": true, ... }

# 5. Delete Task
DELETE /tasks/task1
Headers: Authorization: Bearer abc123...
# Response: 200 OK
```

---

## Validation Rules

### Email
- Must be valid email format (format@example.com)
- Must be unique across all users
- Cannot be blank

### Password (Register/Login)
- Minimum 6 characters
- Cannot be blank
- Case-sensitive

### Task Title
- Cannot be blank
- Minimum 1 character
- Maximum 500 characters (soft limit)

---

## Rate Limiting

Currently, there is **no rate limiting**. In production, consider:
- Max 5 login requests per minute per IP
- Max 100 task operations per minute per user
- Max 10 register requests per minute per IP

---

## Debugging Tips

### Enable Request Logging (Frontend)

```typescript
// In services/api.ts
api.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

### Test API with Postman

1. Import endpoints from this guide
2. Create "Authorization" environment variable with your token
3. Use `{{Authorization}}` in request headers
4. Test each endpoint

### Check MongoDB Data

```javascript
// In MongoDB shell
use taskly
db.users.find()
db.tasks.find()

// Find user's tasks
db.tasks.find({ userId: ObjectId("507f1f77bcf86cd799439010") })
```

---

**Last Updated**: April 7, 2024
**API Version**: 1.0.0

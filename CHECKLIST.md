# Development Checklist for Taskly

## ✅ Setup Verification

### Prerequisites
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 7+ installed (`npm --version`)
- [ ] MongoDB running (local or Atlas)
- [ ] VS Code or preferred editor
- [ ] Git (optional)

### Backend Setup
- [ ] `cd backend && npm install` completed
- [ ] `.env` file created with MONGODB_URI
- [ ] `npm run start:dev` runs without errors
- [ ] Server logs show "🚀 Backend running on http://localhost:3001"
- [ ] Can access http://localhost:3001 (empty response expected)

### Frontend Setup
- [ ] `cd frontend && npm install` completed
- [ ] `.env` file configured
- [ ] `npm run dev` runs without errors
- [ ] Dev server shows "Local: http://localhost:5173/"
- [ ] Can access http://localhost:5173 (shows login page)

## 🧪 Functional Testing

### Authentication
- [ ] Can register new account
- [ ] Receives success message after registration
- [ ] Redirected to tasks page on success
- [ ] Can login with registered credentials
- [ ] Cannot login with wrong password (shows error)
- [ ] Cannot login with non-existent email (shows error)
- [ ] Token persists in localStorage after login
- [ ] Page persists after refresh while logged in
- [ ] Logout clears token and redirects to login

### Task Management
- [ ] Can create new task
- [ ] New task appears at top of list
- [ ] Can toggle task completion (checkbox works)
- [ ] Completed task shows strikethrough
- [ ] Can delete task with confirmation
- [ ] Task removed immediately after deletion
- [ ] Can edit task title by clicking on it
- [ ] Edit mode shows input field
- [ ] Can save edit by pressing Enter
- [ ] Can cancel edit by pressing Escape
- [ ] Pressing Enter outside edit cancels it

### Filtering & Display
- [ ] "All" filter shows all tasks
- [ ] "Done" filter shows only completed tasks
- [ ] "Pending" filter shows only incomplete tasks
- [ ] Task count shows correct number
- [ ] Empty state message displays when no tasks
- [ ] Empty state message changes based on filter
- [ ] Tasks sorted by creation date (newest first)

### UI/UX
- [ ] Login page displays gradient background
- [ ] Button hover effects work smoothly
- [ ] Loading spinner shows during API calls
- [ ] Error messages display in red
- [ ] Success messages display appropriately
- [ ] Mobile responsive layout works
- [ ] Transitions are smooth (no jank)
- [ ] All text is readable with good contrast

### API Integration
- [ ] Frontend connects to backend on http://localhost:3001
- [ ] API requests include Authorization header
- [ ] Token auto-added to all protected requests
- [ ] Invalid token shows 401 error
- [ ] Expired token shows 401 error
- [ ] User can only access their own tasks
- [ ] Deleting one user's task doesn't affect others

## 🔍 Code Quality

### Backend
- [ ] No TypeScript compile errors
- [ ] All DTOs validate input properly
- [ ] Passwords are hashed (bcrypt)
- [ ] JWT tokens generated correctly
- [ ] Auth guard protects task routes
- [ ] Services have proper error handling
- [ ] Comments explain complex logic
- [ ] No console.errors in normal operation

### Frontend
- [ ] No TypeScript errors in browser console
- [ ] Components are reactive and update correctly
- [ ] localStorage operations work reliably
- [ ] Router guards redirect properly
- [ ] Axios interceptors working
- [ ] No memory leaks in components
- [ ] Async operations have error handling
- [ ] Comments explain important sections

## 🚀 Production Readiness Checklist

- [ ] .env files are NOT committed to git
- [ ] JWT_SECRET is strong and random
- [ ] CORS_ORIGIN points to correct frontend
- [ ] MONGODB_URI uses strong password
- [ ] Passwords hashed with sufficiently strong salt
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] No hardcoded secrets in code
- [ ] HTTPS enabled (for production)
- [ ] Database backups configured
- [ ] Logging configured appropriately
- [ ] Rate limiting enabled (optional)
- [ ] HTTPS certificate valid (for production)

## 📚 Documentation

- [ ] README.md is clear and complete
- [ ] SETUP_GUIDE.md covers all steps
- [ ] ARCHITECTURE.md explains structure
- [ ] Code comments explain complex sections
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Setup scripts executable and tested
- [ ] Troubleshooting guide included

## 🐛 Bug Testing

- [ ] Rapid task creation doesn't cause issues
- [ ] Rapid clicking doesn't cause race conditions
- [ ] Network lag doesn't break app
- [ ] Editing then deleting task doesn't error
- [ ] Logout during API request works
- [ ] Multiple browser tabs stay in sync
- [ ] Navigating with browser back/forward works
- [ ] Refreshing page doesn't lose data

## 🎯 Performance

- [ ] Page loads in < 3 seconds
- [ ] Tasks load within 1 second
- [ ] Creating task instant (< 500ms)
- [ ] No console errors on any action
- [ ] Memory usage stable over time
- [ ] Bundle size optimized (prod build)
- [ ] No unused imports/dependencies
- [ ] Images/assets optimized

## 🚢 Deployment

- [ ] Can build backend: `npm run build`
- [ ] Can build frontend: `npm run build`
- [ ] Dist folders created successfully
- [ ] Backend dist/main.js is executable
- [ ] Frontend dist/ contains index.html
- [ ] Environment config works on server
- [ ] CORS works with production URLs
- [ ] Database connection works remotely

---

**Last Updated**: April 7, 2024
**Version**: 1.0.0

# Vue 3 Frontend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file (copy from `.env.example`):
```
VITE_API_URL=http://localhost:3001
```

### 3. Run Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

This will generate optimized production files in the `dist/` directory.

### 5. Project Structure

- `src/`
  - `components/` - Reusable Vue components (TaskCard, TaskForm, LoadingSpinner)
  - `pages/` - Full page components (LoginPage, TasksPage)
  - `router/` - Vue Router configuration
  - `services/` - API service modules (api, auth, taskService)
  - `App.vue` - Root component
  - `main.ts` - Application entry point

### 6. Features

- **Authentication** - Login and register with JWT tokens
- **Task Management** - Create, read, update, delete tasks
- **Filtering** - Filter tasks by status (All, Done, Pending)
- **Inline Editing** - Click on task title to edit
- **Real-time Status** - Toggle task completion with checkbox
- **Responsive Design** - Works on desktop, tablet, mobile
- **Modern UI** - Gradient styles, smooth transitions, clean layout

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authService } from '../services/auth';
import LoginPage from '../pages/LoginPage.vue';
import TasksPage from '../pages/TasksPage.vue';

/**
 * Route guard to check if user is authenticated
 * Redirects to login if not authenticated
 */
const requireAuth = (_to: any, _from: any, next: any) => {
  if (authService.isLoggedIn()) {
    next();
  } else {
    next('/login');
  }
};

/**
 * Route guard to redirect to tasks if already logged in
 */
const preventAuth = (_to: any, _from: any, next: any) => {
  if (authService.isLoggedIn()) {
    next('/tasks');
  } else {
    next();
  }
};

/**
 * Application routes
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: preventAuth,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage,
    beforeEnter: requireAuth,
  },
  {
    path: '/',
    redirect: '/tasks',
  },
];

/**
 * Create and configure router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

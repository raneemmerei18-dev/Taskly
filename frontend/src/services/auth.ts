import api from './api';

/**
 * AuthService handles authentication API calls
 * Manages user registration, login, and token storage
 */

export const authService = {
  /**
   * Register a new user
   * @param email - User email
   * @param password - User password
   * @returns Token response
   */
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Login user with credentials
   * @param email - User email
   * @param password - User password
   * @returns Token response
   */
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout user by removing token from storage
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Get stored JWT token
   * @returns Token or null if not logged in
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is currently logged in
   * @returns True if token exists
   */
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
};

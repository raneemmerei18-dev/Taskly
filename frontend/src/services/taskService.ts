import api from './api';

/**
 * TaskService handles task API calls
 * Manages all task CRUD operations
 */

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const taskService = {
  /**
   * Get all tasks for the logged-in user
   * @returns Array of tasks
   */
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Create a new task
   * @param title - Task title
   * @returns Created task
   */
  createTask: async (title: string): Promise<Task> => {
    const response = await api.post('/tasks', { title });
    return response.data;
  },

  /**
   * Update a task (title and/or completion status)
   * @param id - Task ID
   * @param data - Fields to update (title and/or completed)
   * @returns Updated task
   */
  updateTask: async (
    id: string,
    data: { title?: string; completed?: boolean }
  ): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  },

  /**
   * Delete a task
   * @param id - Task ID
   */
  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};

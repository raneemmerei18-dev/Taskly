<template>
  <div class="tasks-container">
    <!-- Header -->
    <div class="tasks-header">
      <h1>My Tasks</h1>
      <button @click="logoutUser" class="logout-btn">Logout</button>
    </div>

    <!-- Task form to add new tasks -->
    <TaskForm @add="addTask" :isLoading="isAdding" />

    <!-- Filters -->
    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="activeFilter = filter"
        class="filter-btn"
        :class="{ active: activeFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner />
      <p>Loading tasks...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="loadError" class="empty-state error-state">
      <div class="empty-icon">⚠️</div>
      <h2>Something went wrong</h2>
      <p>{{ loadError }}</p>
      <button class="retry-btn" @click="router.push('/login')">Go back to login</button>
    </div>

    <!-- Empty state -->
    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h2>{{ getEmptyMessage }}</h2>
      <p>
        {{ activeFilter === 'All' ? 'Create your first task to get started!' : 'No tasks in this category.' }}
      </p>
    </div>

    <!-- Tasks list -->
    <div v-else class="tasks-list">
      <transition-group name="task-list">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task._id"
          :task="task"
          @toggle="toggleTaskStatus"
          @delete="deleteTask"
          @edit="editTask"
        />
      </transition-group>
    </div>

    <!-- Task count -->
    <div v-if="!isLoading && tasks.length > 0" class="task-stats">
      <span>{{ completedCount }} of {{ tasks.length }} tasks completed</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth';
import { taskService, Task } from '../services/taskService';
import TaskForm from '../components/TaskForm.vue';
import TaskCard from '../components/TaskCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();

const tasks = ref<Task[]>([]);
const isLoading = ref(true);
const isAdding = ref(false);
const loadError = ref('');
const activeFilter = ref('All');
const filters = ['All', 'Done', 'Pending'];

/**
 * Filter tasks based on active filter
 */
const filteredTasks = computed(() => {
  switch (activeFilter.value) {
    case 'Done':
      return tasks.value.filter((t) => t.completed);
    case 'Pending':
      return tasks.value.filter((t) => !t.completed);
    default:
      return tasks.value;
  }
});

/**
 * Count completed tasks
 */
const completedCount = computed(() => {
  return tasks.value.filter((t) => t.completed).length;
});

/**
 * Get appropriate empty state message
 */
const getEmptyMessage = computed(() => {
  switch (activeFilter.value) {
    case 'Done':
      return 'No completed tasks yet';
    case 'Pending':
      return 'All caught up!';
    default:
      return 'No tasks yet';
  }
});

/**
 * Load all tasks on component mount
 */
onMounted(async () => {
  try {
    tasks.value = await taskService.getTasks();
    loadError.value = '';
  } catch (error: any) {
    console.error('Failed to load tasks:', error);
    loadError.value =
      error.response?.status === 401
        ? 'Your session expired. Please log in again.'
        : 'Failed to load tasks. Please try again.';
  } finally {
    isLoading.value = false;
  }
});

/**
 * Add a new task
 */
const addTask = async (title: string) => {
  isAdding.value = true;
  try {
    const newTask = await taskService.createTask(title);
    // Add to beginning of list
    tasks.value.unshift(newTask);
  } catch (error) {
    console.error('Failed to add task:', error);
  } finally {
    isAdding.value = false;
  }
};

/**
 * Toggle task completion status
 */
const toggleTaskStatus = async (taskId: string) => {
  const task = tasks.value.find((t) => t._id === taskId);
  if (!task) return;

  try {
    const updated = await taskService.updateTask(taskId, {
      completed: !task.completed,
    });
    task.completed = updated.completed;
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};

/**
 * Delete a task
 */
const deleteTask = async (taskId: string) => {
  try {
    await taskService.deleteTask(taskId);
    tasks.value = tasks.value.filter((t) => t._id !== taskId);
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

/**
 * Edit task title
 */
const editTask = async (taskId: string, newTitle: string) => {
  const task = tasks.value.find((t) => t._id === taskId);
  if (!task) return;

  try {
    const updated = await taskService.updateTask(taskId, { title: newTitle });
    task.title = updated.title;
  } catch (error) {
    console.error('Failed to edit task:', error);
  }
};

/**
 * Logout and redirect to login page
 */
const logoutUser = () => {
  authService.logout();
  router.push('/login');
};
</script>

<style scoped>
.tasks-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tasks-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #1f2937;
  font-weight: 700;
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.logout-btn:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.625rem 1.25rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.filter-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  gap: 1rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.error-state {
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.retry-btn {
  margin-top: 1.25rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.retry-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  color: #999;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-stats {
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Transition animations */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Responsive */
@media (max-width: 640px) {
  .tasks-container {
    padding: 1rem;
  }

  .tasks-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .tasks-header h1 {
    font-size: 1.75rem;
  }

  .filters {
    flex-wrap: wrap;
  }
}
</style>

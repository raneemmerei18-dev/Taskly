<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <div class="form-group">
      <input
        v-model="taskTitle"
        type="text"
        placeholder="Add a new task..."
        class="task-input"
        :disabled="isLoading"
        aria-label="New task title"
      />
      <button
        type="submit"
        class="add-btn"
        :disabled="!taskTitle.trim() || isLoading"
      >
        <span v-if="!isLoading">Add Task</span>
        <span v-else>Adding...</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Emits {
  (e: 'add', title: string): void;
}

defineProps<{
  isLoading?: boolean;
}>();

const emit = defineEmits<Emits>();

const taskTitle = ref('');

/**
 * Handle form submission
 */
const onSubmit = () => {
  if (taskTitle.value.trim()) {
    emit('add', taskTitle.value.trim());
    taskTitle.value = '';
  }
};
</script>

<style scoped>
.task-form {
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  gap: 0.75rem;
}

.task-input {
  flex: 1;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-family: inherit;
  color: #1f2937;
  transition: all 0.2s ease;
  background: white;
}

.task-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.task-input:disabled {
  background: #f9fafb;
  color: #999;
  cursor: not-allowed;
}

.add-btn {
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

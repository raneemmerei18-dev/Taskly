<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <!-- Task checkbox and title -->
    <div class="task-content">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="onToggleComplete"
        class="task-checkbox"
        aria-label="Mark task as complete"
      />
      <div class="task-text">
        <h3 class="task-title" @click="startEditing" v-if="!isEditing">
          {{ task.title }}
        </h3>
        <input
          v-else
          v-model="editingTitle"
          @blur="saveEdit"
          @keydown.enter="saveEdit"
          @keydown.escape="cancelEdit"
          class="task-edit-input"
          autoFocus
        />
        <p class="task-date">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Delete button -->
    <button
      @click="onDelete"
      class="delete-btn"
      aria-label="Delete task"
      title="Delete task"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Task } from '../services/taskService';

interface Props {
  task: Task;
}

interface Emits {
  (e: 'toggle', id: string): void;
  (e: 'delete', id: string): void;
  (e: 'edit', id: string, title: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isEditing = ref(false);
const editingTitle = ref(props.task.title);

/**
 * Format the creation date in a human-readable way
 */
const formattedDate = computed(() => {
  const date = new Date(props.task.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
});

/**
 * Toggle task completion status
 */
const onToggleComplete = () => {
  emit('toggle', props.task._id);
};

/**
 * Delete the task
 */
const onDelete = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    emit('delete', props.task._id);
  }
};

/**
 * Enter edit mode for task title
 */
const startEditing = () => {
  isEditing.value = true;
  editingTitle.value = props.task.title;
};

/**
 * Save edited title
 */
const saveEdit = () => {
  if (editingTitle.value.trim() && editingTitle.value !== props.task.title) {
    emit('edit', props.task._id, editingTitle.value.trim());
  }
  isEditing.value = false;
};

/**
 * Cancel editing without saving
 */
const cancelEdit = () => {
  isEditing.value = false;
};
</script>

<style scoped>
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.task-card.completed {
  background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
}

.task-card.completed .task-title {
  color: #999;
  text-decoration: line-through;
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  min-width: 20px;
  margin-top: 0.2rem;
  cursor: pointer;
  accent-color: #6366f1;
  border-radius: 4px;
}

.task-text {
  flex: 1;
  min-width: 0;
}

.task-title {
  margin: 0;
  font-size: 1rem;
  color: #1f2937;
  font-weight: 500;
  cursor: pointer;
  word-break: break-word;
  transition: color 0.2s ease;
}

.task-title:hover {
  color: #6366f1;
}

.task-edit-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 2px solid #6366f1;
  border-radius: 6px;
  font-family: inherit;
  color: #1f2937;
}

.task-edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.task-date {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #999;
}

.delete-btn {
  background: none;
  border: none;
  color: #d97706;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background: #fef3c7;
  color: #b45309;
  transform: scale(1.1);
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>

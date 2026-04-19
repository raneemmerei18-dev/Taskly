<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Taskly</h1>
        <p class="subtitle">Manage your tasks with ease</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <!-- Email field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Submit button -->
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">
            {{ isLogin ? 'Login' : 'Register' }}
          </span>
          <span v-else>{{ isLogin ? 'Logging in...' : 'Registering...' }}</span>
        </button>
      </form>

      <!-- Toggle between login and register -->
      <div class="toggle-auth">
        <p>
          {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
          <button
            type="button"
            @click="isLogin = !isLogin"
            class="toggle-btn"
            :disabled="isLoading"
          >
            {{ isLogin ? 'Register' : 'Login' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const isLogin = ref(true);

/**
 * Handle login or registration form submission
 */
const handleSubmit = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    if (isLogin.value) {
      // Login
      await authService.login(email.value, password.value);
    } else {
      // Register
      await authService.register(email.value, password.value);
    }

    // Redirect to tasks page on success
    router.push('/tasks');
  } catch (error: any) {
    // Show error message from backend
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  margin: 0;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.subtitle {
  margin: 0.5rem 0 0 0;
  color: #999;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
}

.form-group input {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  color: #1f2937;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.form-group input:focus {
  outline: none;
  background: white;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.error-message {
  padding: 0.875rem 1rem;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 10px;
  font-size: 0.95rem;
  border-left: 4px solid #dc2626;
}

.submit-btn {
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toggle-auth {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.toggle-auth p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.toggle-btn:hover:not(:disabled) {
  color: #764ba2;
}

.toggle-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

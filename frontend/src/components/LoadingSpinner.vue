<template>
  <div class="spinner"></div>
</template>

<script setup lang="ts">
/**
 * LoadingSpinner component
 * Simple animated loading indicator
 */
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

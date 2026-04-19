import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

/**
 * Bootstrap the Vue 3 application
 * Mount it to the #app element in index.html
 */
const app = createApp(App);

app.use(router);
app.mount('#app');

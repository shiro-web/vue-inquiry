import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import './index.css';
import { createPinia } from 'pinia';
import { useAuthStore } from './store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

// const authStore = useAuthStore(pinia);

// authStore.loginCheck().then(() => {
//     app.mount('#app');
//   });
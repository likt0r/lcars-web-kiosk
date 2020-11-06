import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
const app = createApp(App).use(store);
app.config.isCustomElement = tag => tag.startsWith('web');
app.mount('#app');

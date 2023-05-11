import { createApp } from 'vue';
import App from '@/App.vue';
import pinia from '@/plugins/pinia';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import './style.css';

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');

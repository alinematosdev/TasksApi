import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Importando o router que acabamos de configurar

createApp(App)
  .use(router) // Usando o Vue Router
  .mount('#app');



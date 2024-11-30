import { createRouter, createWebHistory } from 'vue-router';
import Login from 'C:\Users\victo\OneDrive\Documentos\GitHub\TasksApi\tasksweb\src\App.vue';
import Register from 'C:\Users\victo\OneDrive\Documentos\GitHub\TasksApi\tasksweb\src\components\register.vue';

// Definindo as rotas do aplicativo
const routes = [
  { path: '/', component: Login }, // Página de login
  { path: '/register', component: Register } // Página de cadastro
];

// Criando a instância do Vue Router com o histórico de navegação
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

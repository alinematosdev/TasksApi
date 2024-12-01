import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import HomePage from '../components/HomePage.vue';
import RegisterComponent from '../components/RegisterComponent.vue';

const routes = [
  { path: '/', name: 'login', component: LoginComponent },
  { path: '/Home', name: 'home', component: HomePage },
  { path: '/RegisterComponent', name: 'register', component: RegisterComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

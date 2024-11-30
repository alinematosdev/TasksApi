import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import Home from '../components/HomePage.vue';


const routes = [
    {
        path:'/',
        name: 'login',
        component: Login,
    },
    {
        path:'/RegisterComponent',
        name: 'register',
        component: Register,
    },
    {
        path: '/Home',
        name: 'home',
        component: Home,
    },

   
]

const router = createRouter
({
    history: createWebHistory(),
    routes,
});

export default router;

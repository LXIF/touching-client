import { createRouter, createWebHistory } from 'vue-router'

import UserView from './pages/UserView'
import RafalView from './pages/RafalView'
import AndriView from './pages/AndriView'


const routes = [
    {
        path: '/',
        component: UserView
    },
    {
        path: '/rafal',
        component: RafalView
    },
    {
        path: '/andri',
        component: AndriView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
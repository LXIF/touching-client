import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index'

import UserView from './pages/UserView'
import RafalView from './pages/RafalView'
import AndriView from './pages/AndriView'
import InitView from './pages/InitView'


const routes = [
    {
        path: '/',
        component: UserView,
        beforeEnter(to, _, next) {
            localStorage.setItem('x', 50);
            localStorage.setItem('y', 50);
            localStorage.setItem('id', 'user');
            
            if(localStorage.getItem('id') === 'user' && !to.query.x && !to.query.y) {
                store.dispatch('setPosition', {
                    x: Number(localStorage.getItem('x')),
                    y: Number(localStorage.getItem('y'))
                });
                next();
            } else if(!to.query.x && !to.query.y) {
                router.replace('/init');
            } else {
                localStorage.setItem('x', to.query.x);
                localStorage.setItem('y', to.query.y);
                localStorage.setItem('id', 'user');
                store.dispatch('setId', {
                    id: 'user'
                });
                store.dispatch('setPosition', {
                    x: to.query.x,
                    y: to.query.y
                });
            }
        }
    },
    {
        path: '/rafal',
        component: RafalView,
        beforeEnter() {
            store.dispatch('setId', {
                id: 'rafal'
            });
            store.dispatch('setPosition', {
                x: 50,
                y: 50
            });
        }
    },
    {
        path: '/andri',
        component: AndriView,
        beforeEnter() {
            store.dispatch('setId', {
                id: 'andri'
            });
            store.dispatch('setPosition', {
                x: 50,
                y: 50
            });
        }
    },
    {
        path: '/init',
        component: InitView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
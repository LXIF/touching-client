import { createStore } from 'vuex';

import { io } from 'socket.io-client';

const socket = io(process.env.VUE_APP_HOST_IP);

const store = createStore({
    state() {
        return {
            id: 'user',
            position: {
                x: 0,
                y: 0
            },
            presence: {
                x: 0,
                y: 0,
                radius: 3
            },
            users: [],
            rafals: [],
            andris: []
        }
    },
    mutations: {
        setId(state, payload) {
            state.id = payload.id
        },
        setPosition(state, payload) {
            state.position.x = payload.x;
            state.position.y = payload.y;
        },
        setPresence(state, payload) {
            state.presence.x = payload.x;
            state.presence.y = payload.y;
            state.presence.radius = payload.radius;
        },
        updateUsers(state, payload) {
            state.users = payload;
        },
        updateAndris(state, payload) {
            state.andris = payload;
        },
        updateRafals(state, payload) {
            state.rafals = payload;
        }
    },
    actions: {
        setId(context, payload) {
            context.commit('setId', payload);
        },
        setPosition(context, payload) {
            context.commit('setPosition', payload);
            socket.emit('howdy', {
                id: context.getters.getId,
                position: context.getters.getPosition
            });
        },
        sendPresence(context, payload) {
            context.commit('setPresence', payload)
            socket.emit('presence', payload);
        },
        receivePresence(context, payload) {
            context.commit('setPresence', payload);
            console.log(payload);
        },
        updateUsers(context, payload) {
            const users = payload.filter((user) => {
                return user.id === 'user'
            });
            const rafals = payload.filter((rafal) => {
                return rafal.id === 'rafal'
            });
            const andris = payload.filter((andri) => {
                return andri.id === 'andri'
            });
            console.log(users);
            console.log(andris);
            context.commit('updateUsers', users);
            context.commit('updateRafals', rafals);
            context.commit('updateAndris', andris);
            // console.log(context.getters['getUsers']);
            // console.log(context.getters['getRafals']);


        }
    },
    getters: {
        getId(state) {
            return state.id;
        },
        getPosition(state) {
            return state.position;
        },
        getPresence(state) {
            return state.presence;
        },
        getUsers(state) {
            return state.users;
        },
        getAndris(state) {
            return state.andris;
        },
        getRafals(state) {
            return state.rafals;
        }
    }

});

socket.on('connect', () => {
    socket.emit('howdy', {
        id: store.getters['getId'],
        position: store.getters['getPosition']
    });
});

socket.on('presence', (presence) => {
    store.dispatch('receivePresence', presence);
});

socket.on('updateUsers', (users) => {
    store.dispatch('updateUsers', users);
});

export default store;
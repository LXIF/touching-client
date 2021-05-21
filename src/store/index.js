import { createStore } from 'vuex';

import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_HOST_IP);

const store = createStore({
    state() {
        return {
            id: 'user',
            connected: false,
            pleaseTouch: false,
            touching: false,
            touchingColor: 360,
            audioStarted: false,
            touchizationMuted: true,
            position: {
                x: 0,
                y: 0
            },
            presence: {
                x: 0,
                y: 0,
                radius: 3
            },
            weather: {
                hue: 0,
                saturation: 0,
                lightness: 0,
                alpha: 0
            },
            touchizationOngoing: false,
            users: [],
            rafals: [],
            andris: [],
            nextPoemSample: undefined,
            rafalColors: false,
            usersColors: false,
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
            state.presence = payload;
        },
        setWeather(state, payload) {
            state.weather = payload;
        },
        updateUsers(state, payload) {
            state.users = payload;
        },
        updateAndris(state, payload) {
            state.andris = payload;
        },
        updateRafals(state, payload) {
            state.rafals = payload;
        },
        startTouchization(state) {
            state.touchizationOngoing = true;
        },
        endTouchization(state) {
            state.touchizationOngoing = false;
        },
        setMuteTouchization(state, payload) {
            state.touchizationMuted = payload;
        },
        setConnectionStatus(state, payload) {
            state.connected = payload;
        },
        startAudio(state) {
            state.audioStarted = true;
        },
        pleaseTouch(state, payload) {
            state.pleaseTouch = payload;
        },
        isTouching(state, payload) {
            state.touching = payload;
        },
        setTouchingColor(state, payload) {
            state.touchingColor = payload;
        },
        setPoemSample(state, payload) {
            state.nextPoemSample = payload;
        },
        setRafalColors(state, on) {
            state.rafalColors = on;
            console.log(state.rafalColors);
        },
        setUsersColors(state, on) {
            state.usersColors = on;
            console.log(state.usersColors);
        },
    },
    actions: {
        setId(context, payload) {
            context.commit('setId', payload);
        },
        setPosition(context, payload) {
            context.commit('setPosition', payload);
            const howdyMessage = {
                id: store.getters['getId'],
                position: store.getters['getPosition'],
                touching: store.getters['isTouching'],
                audioStarted: store.getters['audioStarted'],
            }
            socket.emit('howdy', howdyMessage);
        },
        isTouching(context, payload) {
            context.commit('isTouching', payload);
        },
        sendPresence(context, payload) {
            context.commit('setPresence', payload)
            socket.emit('presence', payload);
        },
        sendWeather(context, payload) {
            context.commit('setWeather', payload);
            socket.emit('weather', payload);
        },
        // sendTouch(context) {
        //     console.log('sending');
        //     context.commit('endTouchRequest');
        //     socket.emit('sendtouch');
        // },
        receivePresence(context, payload) {
            context.commit('setPresence', payload);
        },
        receiveWeather(context, payload) {
            context.commit('setWeather', payload);
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


        },
        pleaseTouch(context, payload) {
            context.commit('pleaseTouch', payload);
        },
        respondTouch(context) {
            context.commit('pleaseTouch', false);
            context.commit('isTouching', true);
            socket.emit('touchization', 'yestouch');
        },
        startTouchization(context) {
            context.commit('startTouchization')
            socket.emit('touchization', 'start');
        },
        setMuteTouchization(context, payload) {
            context.commit('setMuteTouchization', payload);
        },
        sendMuteTouchization(context, payload) {
            if(payload === false) {
                socket.emit('touchization', 'muteoff');
            }
            if(payload === true) {
                socket.emit('touchization', 'muteon');
            }
        },
        skipTouchization() {
            socket.emit('touchization', 'skip');
        },
        resetTouchization() {
            socket.emit('touchization', 'reset');
        },
        toggleTouchizationStrobe() {
            socket.emit('touchization', 'toggleStrobe');
        },
        setConnectionStatus(context, payload) {
            context.commit('setConnectionStatus', payload);
        },
        startAudio(context) {
            context.commit('startAudio');
            socket.emit('updateUser', {
                id: context.getters.getId,
                audioStarted: true,
            });
        },
        setTouchingColor(context, payload) {
            context.commit('setTouchingColor', payload);
        },
        triggerPoemSentence(_, payload) {
            socket.emit('poem', payload);
        },
        setPoemSample(context, payload) {
            context.commit('setPoemSample', payload);
        },
        toggleRafalColors(context) {
            if(context.getters.rafalColors === true) {
                socket.emit('touchization', 'rafalColorsOff');
            } else {
                socket.emit('touchization', 'rafalColorsOn');
            }
        },
        toggleUsersColors(context) {
            context.getters.usersColors;
            if(context.getters.usersColors === true) {
                socket.emit('touchization', 'usersColorsOff');
            } else {
                socket.emit('touchization', 'usersColorsOn');
            }
        },
        setRafalColors(context, on) {
            context.commit('setRafalColors', on);
        },
        setUsersColors(context, on) {
            context.commit('setUsersColors', on);
        },
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
        getWeather(state) {
            return state.weather;
        },
        getUsers(state) {
            return state.users;
        },
        getAndris(state) {
            return state.andris;
        },
        getRafals(state) {
            return state.rafals;
        },
        touchizationOngoing(state) {
            return state.touchizationOngoing;
        },
        touchizationMuted(state) {
            return state.touchizationMuted;
        },
        connected(state) {
            return state.connected;
        },
        isTouching(state) {
            return state.touching;
        },
        audioStarted(state) {
            return state.audioStarted
        },
        pleaseTouch(state) {
            return state.pleaseTouch
        },
        touchingColor(state) {
            return state.touchingColor;
        },
        nextPoemSample(state) {
            return state.nextPoemSample;
        },
        rafalColors(state) {
            return state.rafalColors;
        },
        usersColors(state) {
            return state.usersColors;
        },
    }

});

socket.on('connect', () => {
    store.dispatch('setConnectionStatus', true);
    const howdyMessage = {
        id: store.getters['getId'],
        position: store.getters['getPosition'],
        touching: store.getters['isTouching'],
        audioStarted: store.getters['audioStarted'],
    };
    console.log(howdyMessage);
    socket.emit('howdy', howdyMessage);
});

socket.on('disconnect', () => {
    store.dispatch('setConnectionStatus', false);
})

socket.on('presence', (presence) => {
    store.dispatch('receivePresence', presence);
});

socket.on('weather', (weather) => {
    store.dispatch('receiveWeather', weather);
});

socket.on('updateUsers', (users) => {
    store.dispatch('updateUsers', users);
});

socket.on('touchization', (message) => {
    if(message === 'pleasetouch') {
        store.dispatch('pleaseTouch', true);
    }
    if(message === 'nowtouched') {//only for rafals
        store.dispatch('isTouching', true);
    }
    if(message === 'nownottouched') {//only for rafals
        store.dispatch('isTouching', false);
    }
    if(message === 'muteon') {
        store.dispatch('setMuteTouchization', true);
    }
    if(message === 'muteoff') {
        store.dispatch('setMuteTouchization', false);
    }
    if(message === 'skip') {
        store.dispatch('isTouching', true);
        store.dispatch('pleaseTouch', false);
    }
    if(message === 'reset') {
        store.dispatch('isTouching', false);
        store.dispatch('pleaseTouch', false);
    }
    if(message === 'rafalColorsOn') {
        store.dispatch('setRafalColors', true);
    }
    if(message === 'rafalColorsOff') {
        store.dispatch('setRafalColors', false);
    }
    if(message === 'usersColorsOn') {
        store.dispatch('setUsersColors', true);
    }
    if(message === 'usersColorsOff') {
        store.dispatch('setUsersColors', false);
    }
});

socket.on('touchcolor', (color) => {
    console.log(color);
    store.dispatch('setTouchingColor', color);
});

socket.on('poem', (message) => {
    store.dispatch('setPoemSample', message);
})

export default store;
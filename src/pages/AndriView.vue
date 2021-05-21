<template>
    <div class='andri-card'>
        <div class='andri'>
            <div id='connections-display'>
                <h1>users</h1>
                <users-list :users='users' />
                <h1>rafals</h1>
                <users-list :users='rafals' />
            </div>

            <div id='presence'>
                <h1>local presence</h1>
                <xy-pad :users='getUsers' id='presence-xy' @presence='sendPresence' :radius='presenceRadius' />
                <label>radius</label>
                <base-fader v-model='presenceRadius' />
            </div>
            
            <div id='weather'>
                <h1>WEATHERS</h1>
                <h2>noise</h2>
                <label>hue</label>
                <base-fader rainbow='true' scale='360' v-model='globalWeather.hue' />
                <label>saturation</label>
                <base-fader v-model='globalWeather.saturation' />
                <label>lightness</label>
                <base-fader v-model='globalWeather.lightness' />
                <label>alpha</label>
                <base-fader scale='1' v-model='globalWeather.alpha' />

                <!-- <h1>WEATHERS</h1>
                <h2>noise</h2>
                <label>hue</label>
                <base-fader rainbow='true' scale='360' v-model='globalWeather.hue' />
                <label>saturation</label>
                <base-fader v-model='globalWeather.saturation' />
                <label>lightness</label>
                <base-fader v-model='globalWeather.lightness' />
                <label>alpha</label>
                <base-fader scale='1' v-model='globalWeather.alpha' /> -->


            </div>
            
            <br><br>

            <div id='touchization'>
                <h1>TOUCHIZATION IS <span v-if='touchizationOngoing'>ON</span></h1>
                <label>RAFAL COLORS </label>
                <label v-if='rafalColors'>RAFAL is COLORS</label><br>
                <label v-if='!rafalColors'>RAFAL is BLACK</label>
                <base-swiper @activate='toggleRafalColors'></base-swiper>
                <label v-if='usersColors'>RAFAL is COLORS</label><br>
                <label v-if='!usersColors'>RAFAL is BLACK</label>
                <base-swiper @activate='toggleUsersColors'></base-swiper>
                <!-- <label>SKIP TOUCHIZATION NODE</label>
                <base-swiper @activate='skipTouchizationNode'></base-swiper>
                <label>RESET TOUCHIZATION</label>
                <base-swiper @activate='resetTouchization'></base-swiper>
                <label>STROBE TOUCHIZATION</label>
                <base-swiper @activate='toggleStrobeTouchization'></base-swiper> -->
                <!-- <label>TOUCHIZATION</label>
                <input type='checkbox' v-model='touchingActive' /> -->
            </div>

            <br><br>

            <div id='poem'>
                <poem-trigger />
            </div>
        </div>
    </div>
</template>

<script>
import XyPad from '../components/UI/XyPad'
import UsersList from '../components/layout/UsersList'
import PoemTrigger from '../components/UI/PoemTrigger'

import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        XyPad,
        UsersList,
        PoemTrigger
    },
    data() {
        return {
            presenceRadius: 10,
            globalWeather: {
                hue: 0,
                saturation: 0,
                lightness: 0,
                alpha: 0
            }
        }
    },
    watch: {
        globalWeather: {
            deep: true,
            handler() {
                this.sendWeather(this.globalWeather);
            }
        },
    },
    methods: {
        ...mapActions([
            'sendPresence',
            'sendWeather'
            ]),
        startTouchization() {
            this.$store.dispatch('startTouchization');
        },
        toggleMuteTouchization() {
            if(this.touchizationMuted) {
                this.$store.dispatch('sendMuteTouchization', false);
            } else {
                this.$store.dispatch('sendMuteTouchization', true);
            }
        },
        skipTouchizationNode() {
            this.$store.dispatch('skipTouchization');
        },
        resetTouchization() {
            this.$store.dispatch('resetTouchization');
        },
        toggleStrobeTouchization() {
            this.$store.dispatch('toggleTouchizationStrobe');
        },
        toggleRafalColors() {
            this.$store.dispatch('toggleRafalColors');
        },
        toggleUsersColors() {
            this.$store.dispatch('toggleUsersColors');
        },
    },
    computed: {
        ...mapGetters(['getUsers']),

        users() {
            return this.$store.getters['getUsers']
        },
        rafals() {
            return this.$store.getters['getRafals']
        },
        touchizationOngoing() {
            return this.$store.getters['touchizationOngoing']
        },
        touchizationMuted() {
            return this.$store.getters['touchizationMuted']
        },
        rafalColors() {
            return this.$store.getters['rafalColors']
        },
        usersColors() {
            return this.$store.getters['usersColors']
        }
    
    }
}
</script>

<style lang="stylus" scoped>
.andri-card
    max-width 400px
    margin 0 auto
</style>
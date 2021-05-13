<template>
    <div class='andri-card'>
        <div class='andri'>
            <h1>local presence</h1>
            <xy-pad :users='getUsers' id='presence-xy' @presence='sendPresence' :radius='presenceRadius' />
            <label>radius</label>
            <base-fader v-model='presenceRadius' />
            <h1>global weather</h1>
            <label>hue</label>
            <base-fader rainbow='true' scale='360' v-model='globalWeather.hue' />
            <label>saturation</label>
            <base-fader v-model='globalWeather.saturation' />
            <label>lightness</label>
            <base-fader v-model='globalWeather.lightness' />
            <label>alpha</label>
            <base-fader scale='1' v-model='globalWeather.alpha' />
            <br><br>
            <label>START TOUCHIZATION</label>
            <base-swiper @activate='startTouchization'></base-swiper>
            <label>MUTE TOUCHIZATION</label>
            <base-swiper @activate='muteTouchization'></base-swiper>
            <label>SKIP TOUCHIZATION NODE</label>
            <base-swiper @activate='skipTouchizationNode'></base-swiper>
            <label>RESET TOUCHIZATION</label>
            <base-swiper @activate='resetTouchization'></base-swiper>
            <!-- <label>TOUCHIZATION</label>
            <input type='checkbox' v-model='touchingActive' /> -->
        </div>
    </div>
</template>

<script>
import XyPad from '../components/UI/XyPad'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        XyPad
    },
    data() {
        return {
            touchingActive: false,
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
        touchingActive(newValue) {
            if(newValue) {
                this.$store.dispatch('startTouchSequence');
            } else {
                console.log('off');
                this.$store.dispatch('endTouchSequence');
            }
        }
    },
    methods: {
        ...mapActions([
            'sendPresence',
            'sendWeather'
            ]),
        startTouchization() {
            console.log('startTouch');
        },
        muteTouchization() {
            console.log('muteTouch');
        },
        skipTouchizationNode() {
            console.log('skipTouch');
        },
        resetTouchization() {
            console.log('resetTouch');
        },
    },
    computed: {
        ...mapGetters(['getUsers'])
    }
}
</script>

<style lang="stylus" scoped>
.andri-card
    max-width 400px
    margin 0 auto
</style>
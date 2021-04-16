<template>
    <div>
        <color-screen id='presence-display'
            :lightness='presenceLightness'
        />
        <color-screen id='weather-display'
            :lightness='weather.lightness'
            :hue='weather.hue'
            :saturation='weather.saturation'
            :alpha='weather.alpha'
        />
        <h1 style='z-index: 1'>hoi</h1>
    </div>
</template>

<script>
import ColorScreen from '../components/user/ColorScreen'
import { mapGetters } from 'vuex'

export default {

    components: {
        ColorScreen
    },
    computed: {
        ...mapGetters({
            position: 'getPosition',
            presence: 'getPresence',
            weather: 'getWeather'
            }),
        presenceLightness() {
            const xDistance = this.position.x - this.presence.x;
            const yDistance = this.position.y - this.presence.y;
            const pointDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            const radius = this.presence.radius;
            console.log('asdf');

            if (pointDistance > radius) {
                return 0;
            } else {
                const distanceFactor = 1 - pointDistance / radius;
                const distancePower = Math.pow(distanceFactor, 0.5);
                const distancePercentage = distancePower * 100  //distance as percentage of radius
                return distancePercentage
            }
        }
    }
}
</script>
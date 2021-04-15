<template>
    <div>
        <color-screen id='presence-display'
            :lightness='presenceLightness'
        />
        <h1 style='z-index: 1'>{{ position }}</h1>
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
            presence: 'getPresence'
            }),
        presenceLightness() {
            const xDistance = this.position.x - this.presence.x;
            const yDistance = this.position.y - this.presence.y;
            const pointDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            const radius = this.presence.radius;

            if (pointDistance > radius) {
                return 0;
            } else {
                const distancePercentage = 100 - (pointDistance / radius * 100)  //distance as percentage of radius
                return distancePercentage
            }
        }
    }
}
</script>
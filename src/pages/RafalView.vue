<template>
    <div>
        <!-- <div class='welcome' v-if='!audioIsActive'>
            <h3>Do you allow your phone to be in touch for the duration of this performance? No data will be collected.</h3>
            <base-button @click='startAudio'>YES</base-button>
        </div> -->
        <color-screen :hue='rafalScreen' saturation='100' lightness='0'></color-screen>
        <connection-frame></connection-frame>
    </div>
</template>

<script>
import ColorScreen from '../components/user/ColorScreen';

export default {
    components: {
        ColorScreen
    },
    data() {
        return {
            rafalScreen: 0
        }
    },
    // mounted() {
    //     setInterval(() => {
    //         this.rafalScreen += 120;
    //         if(this.rafalScreen > 360) {
    //             this.rafalScreen -= 360;
    //         }
    //     }, 300)
    // }
}
</script>
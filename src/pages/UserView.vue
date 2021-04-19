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
        <button @click='startAudio'>start audio</button>
        <button @click='playNote'>trigger noise</button>
    </div>
</template>

<script>
import ColorScreen from '../components/user/ColorScreen'
import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'

import * as Tone from 'tone'

export default {
    setup() {
        const store = useStore();

        const position = computed(() => store.getters.getPosition);
        const presence = computed(() => store.getters.getPresence);
        const weather = computed(() => store.getters.getWeather);
        console.log(weather.value);


        function startAudio() {
            Tone.start();
        }

        const synth = new Tone.Synth();
        synth.envelope.attack = 0.01;
        synth.envelope.release = 0.01;
        const synthDistortion = new Tone.Distortion(0.8);
        const synthFreqShift = new Tone.FrequencyShifter(42);
        const synthVolume = new Tone.Volume();
        synthVolume.mute = true;

        synth.chain(synthVolume, synthDistortion, synthFreqShift, Tone.Destination);

        const synthIsPlaying = ref(true);

       



        function playNote() {
            const nextTime = Math.pow(Math.random(), 2) * 200;
            setTimeout(() => {
                
                if(synthIsPlaying.value) {
                    synth.triggerAttackRelease(2000, 0.05);
                }
                playNote();
            }, nextTime);
        }





        const presenceLightness = computed(() => {
            const xDistance = position.value.x - presence.value.x;
            const yDistance = position.value.y - presence.value.y;
            const pointDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            const radius = presence.value.radius;

            if (pointDistance > radius) {
                return 0;
            } else {
                const distanceFactor = 1 - pointDistance / radius;
                const distancePower = Math.pow(distanceFactor, 0.5);
                const distancePercentage = distancePower * 100  //distance as percentage of radius
                return distancePercentage
            }
        });

        ////////////ADJUST PRESENCE PARAMETERS BASED ON LOCATION//////////////

        watch(presenceLightness, (newValue) => {
            if (newValue === 0) {
                synthVolume.mute = true;
                synthVolume.volume.value = -100;
            } else {
                synthVolume.mute = false;
                synthVolume.volume.value = 0 - (100 - newValue) / 2;
                synthFreqShift.frequency.value = newValue * 3;
            }
            console.log(synthVolume.volume.value);
            // synthVolume.volume.value =
        });

        return {
            playNote,
            startAudio,
            presenceLightness,
            weather
        }
    },
    components: {
        ColorScreen
    }
}
</script>
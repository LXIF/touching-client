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
import ColorScreen from '../components/user/ColorScreen';
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';

import * as Tone from 'tone';

export default {
    setup() {
        console.log('there');
        const store = useStore();

        const position = computed(() => store.getters.getPosition);
        const presence = computed(() => store.getters.getPresence);
        const weather = computed(() => store.getters.getWeather);

        const synth = new Tone.Synth();
        synth.envelope.attack = 0.01;
        synth.envelope.release = 0.01;
        const synthDistortion = new Tone.Distortion(0.8);
        // const synthFreqShift = new Tone.FrequencyShifter(42);
        const synthVolume = new Tone.Volume();
        synthVolume.mute = true;

        synth.chain(synthVolume,
        synthDistortion,
        // synthFreqShift,
        Tone.Destination);

        const synthIsPlaying = ref(true);

       



        function playNote() {
            const nextTime = 200 + Math.pow(Math.random(), 2) * 200;
            setTimeout(() => {
                
                if(synthIsPlaying.value) {
                    synth.triggerAttackRelease(2000, 0.05, Tone.now());
                }
                playNote();
            }, nextTime);
        }



        
        // initialize the noise and start
        const noise = new Tone.Noise("pink").start();
        // make an autofilter to shape the noise
        const autoFilter = new Tone.AutoFilter({
            frequency: 10 + Math.random() * 3,
            baseFrequency: 10,
            octaves: 10,
            type: 'square'
        }).start();
        

        const noiseVolume = new Tone.Volume();
        noiseVolume.mute = true;
        
        // connect the noise
        noise.chain(autoFilter, noiseVolume, Tone.Destination);
        // // start the autofilter LFO
        // autoFilter.start();



        function startAudio() {
            Tone.start();
            playNote();
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

        const weatherLightness = computed(() => {
            const inputLightness = weather.value.lightness;
            
            // const randomValue = Math.random() * 10;
            return inputLightness
        }); 

        ////////////ADJUST PRESENCE PARAMETERS BASED ON LOCATION//////////////

        watch(presenceLightness, (newValue) => {
            if (newValue === 0) {
                synthVolume.mute = true;
                synthVolume.volume.value = -100;
            } else {
                synthVolume.mute = false;
                synthVolume.volume.value = 0 - (100 - newValue) / 2;
                // synthFreqShift.frequency.value = newValue * 3;
            }
            // console.log(synthVolume.volume.value);
            // synthVolume.volume.value =
        });

        watch(weatherLightness, (newValue) => {
            if(newValue <= 10) {
                noiseVolume.mute = true;
                noiseVolume.volume.value = -100;
            } else {
                noiseVolume.mute = false;
                noiseVolume.volume.value = 0 - (100 - newValue);
                // synthFreqShift.frequency.value = newValue * 3;
            }
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
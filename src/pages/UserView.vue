<template>
    <div>
        <!-- <base-swipe
         :show='!audioIsActive' text='swipe right to be touching' @swipe='startAudio'></base-swipe> -->
        <div class='welcome' v-if='!audioIsActive'>
            <h3>Do you allow your phone to be in touch for the duration of this performance? No data will be collected.</h3>
            <base-button @click='startAudio'>YES</base-button>
        </div>
        <!-- <base-swipe :show='!audioIsActive' text='swipe right to be touching' @pointerdown='startAudio'></base-swipe> -->
        <color-screen id='presence-display'
            :lightness='presenceLightness'
        />
        <color-screen id='weather-display'
            :lightness='weather.lightness'
            :hue='weather.hue'
            :saturation='weather.saturation'
            :alpha='weather.alpha'
        />
        <connection-frame></connection-frame>
        
        <!-- <h1 style='z-index: 1; color: red;'>hoi</h1>
        <button @click='startAudio'>start audio</button> -->
        <!-- <button @click='playNote'>trigger noise</button> -->
        <!-- <button @click='sendTouch'>touch me</button> -->
    </div>
</template>

<script>
import ColorScreen from '../components/user/ColorScreen';
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';

import * as Tone from 'tone';

export default {
    setup() {
        console.log('setup');
        const store = useStore();

        const touchRequested = computed(() => store.getters.getTouchRequested);
        function sendTouch() {
            store.dispatch('sendTouch');
        }

        const position = computed(() => store.getters.getPosition);
        const presence = computed(() => store.getters.getPresence);
        const weather = computed(() => store.getters.getWeather);


        function mapRange(in1, in2, out1, out2, value) {
            return (value - in1) * (out2 - out1) / (in2 - in1) + out1;
        }

        // const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


        ////////////Presence Synth///////////

        const presenceSpeed = ref(0.1);

        const synth = new Tone.Synth();
        synth.envelope.attack = 0.01;
        synth.envelope.release = 0.1;
        const chorus = new Tone.Chorus(4, 2.5, 0.5);
        const feedbackDelay = new Tone.FeedbackDelay(presenceSpeed.value, 0.5);
        // const synthDistortion = new Tone.Distortion(0.8);
        // const synthFreqShift = new Tone.FrequencyShifter(42);
        const synthVolume = new Tone.Volume();
        // const synthOutput = new Tone.Meter();
        synthVolume.mute = true;

        // synth.connect(
        //     synthVolume
        // );
        // synthVolume.fan(chorus, synthOutput);
        // chorus.chain(
        //     synthVolume,
        //     chorus,
        //     feedbackDelay,
        //     // synthDistortion,
        //     // synthFreqShift,
        //     Tone.Destination
        // );

        synth.chain(
            synthVolume,
            chorus,
            feedbackDelay,
            // synthDistortion,
            // synthFreqShift,
            Tone.Destination
        );

        // const presenceReactBrightness = ref(0);
        
        // function presenceReact() {
        //     presenceReactBrightness.value = synthOutput.getValue();
        //     window.requestAnimationFrame(presenceReact);
        // }
        // window.requestAnimationFrame(presenceReact);

        const synthIsPlaying = ref(true);

        // setInterval(() => {
        //     console.log('tschalp');
        // }, 500)


        function presenceSound() {
            // const randomValue = Math.random() / 20;
            // console.log('tschirp');
            const value = presenceSpeed.value;
            const nextTime = `+${value}`;
            const frequency = 3000 + Math.random() * 1000;
            // console.log(nextTime);
            
            Tone.Transport.scheduleOnce(() => {
                if(synthIsPlaying.value) {
                    const coinToss = Math.random();
                    if(coinToss < 0.7) {
                        synth.triggerAttackRelease(frequency, 0.05, Tone.now());
                    }
                }
                
                presenceSound();
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

        // const presenceLightnessJittered = computed(() => {
        //     let jitter = 0;
        //     if (presenceReactBrightness.value !== -Infinity) {
        //         jitter = clamp(mapRange(-250, 0, -10, 10, presenceReactBrightness.value), -10, 10);
        //     }
        //     console.log(jitter);
        //     return presenceLightness.value + jitter;
        // });

        watch(presenceLightness, (newValue) => {
            if (newValue <= 3) {
                synthVolume.mute = true;
                synthVolume.volume.value = -100;
            } else {
                synthVolume.mute = false;
                synthVolume.volume.value = 0 - (100 - newValue) / 2;
                presenceSpeed.value = mapRange(0, 100, 0.7, 0.01, newValue);
                // console.log(presenceSpeed.value);
                // synthFreqShift.frequency.value = newValue * 3;
            }
            // console.log(synthVolume.volume.value);
            // synthVolume.volume.value =
        });






        
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

        const audioIsActive = ref(false);

        function startAudio() {
            console.log('now');
            audioIsActive.value = true;
            Tone.start()
            .then(() => {
                console.log('tone started');
                Tone.Transport.start();
                presenceSound();
            });
        }

        const weatherLightness = computed(() => {
            const inputLightness = weather.value.lightness;
            
            // const randomValue = Math.random() * 10;
            return inputLightness
        }); 

        ////////////ADJUST PRESENCE PARAMETERS BASED ON LOCATION//////////////

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
            presenceSound,
            startAudio,
            presenceLightness,
            weather,
            audioIsActive,
            touchRequested,
            sendTouch
            // presenceLightnessJittered
        }
    },
    components: {
        ColorScreen
    }
}
</script>

<style lang="stylus" scoped>
    .welcome
        height 100vh
        width 100vw
        background #0f0
        color #000
        position fixed
        top 0
        left 0

    h3
        font-size 2rem
</style>
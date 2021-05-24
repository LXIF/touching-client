<template>
    <div>
        <!-- <div class='welcome' v-if='!audioIsActive'>
            <h3>Do you allow your phone to be in touch for the duration of this performance? No data will be collected.</h3>
            <base-button @click='startAudio'>YES</base-button>
        </div> -->
        <div class='welcome' v-if='!audioIsActive'>
            <h3>Do you allow your phone to be in touch for the duration of this performance? No data will be collected.</h3>
            <button @click='startAudio'>YES</button>
        </div>
        <color-screen v-if="rafalColors" :hue='touchingColor' saturation='100' lightness='50'></color-screen>
        <connection-frame></connection-frame>
    </div>
</template>

<script>
import ColorScreen from '../components/user/ColorScreen';

import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';

import * as Tone from 'tone';
//maybe add a nosleep to rafal
import NoSleep from 'nosleep.js';

export default {
    setup() {
        console.log('setup');
        const store = useStore();

        // const touchRequested = computed(() => store.getters.getTouchRequested);
        // function sendTouch() {
        //     store.dispatch('sendTouch');
        // }

        const position = computed(() => store.getters.getPosition);
        const presence = computed(() => store.getters.getPresence);
        const weather = computed(() => store.getters.getWeather);


        function mapRange(in1, in2, out1, out2, value) {
            return (value - in1) * (out2 - out1) / (in2 - in1) + out1;
        }

        // const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        let noSleep = new NoSleep();


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



        //////////WEATHER SYNTHS/////////


        
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
            noSleep.enable();
            document.querySelector('body').requestFullscreen();
            audioIsActive.value = true;
            Tone.start()
            .then(() => {
                console.log('tone started');
                Tone.Transport.start();
                presenceSound();
            });
            store.dispatch('startAudio');
        }

        const weatherLightness = computed(() => {
            const inputLightness = weather.value.lightness;
            
            // const randomValue = Math.random() * 10;
            return inputLightness
        }); 



        //////////////////POEM SAMPLES/////////////

       const poemBaseUrlMira = '/samples/poem/mira/';

        const poemSentencesMira = [
                '01-imagine_this_dance-bounce-2.wav',
                '02-happening_forever-bounce-2.wav',
                '03-since_always-bounce-2.wav',
                '04-forever-bounce-2.wav',
                '05-world_without_a_beginning-bounce-2.wav',
                '06-and_without_an_end-bounce-2.wav',
                '07-touching-bounce-2.wav',
                '08-trans-reality-bounce-2.wav',
                '09-entanglement-bounce-2.wav',
                '10-caring-bounce-2.wav',
                '11-mattering-bounce-2.wav',
                '12-in_an_endless_ecstasy_of_communication-bounce-2.wav',
                '13-no_void-bounce-2.wav',
                '14-no_self-bounce-2.wav',
                '15-these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '16-this_is_the_long_distance_call-bounce-2.wav',
                '17-the_way_the_camera_follows_us_in_slomo-bounce-2.wav',
                '18-the_way_we_look_to_us_all-bounce-2.wav',
                '19-the_way_we_look_to_a_distant_constellation-bounce-2.wav',
                '20-thats_dying_in_a_corner_in_the_sky-bounce-2.wav',
                '21-these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '22-and_dont_cry_baby-bounce-2.wav',
                '23-dont_cry-bounce-2.wav',
                '24-it_was_a_dry_wind-bounce-2.wav',
                '25-and_it_swept_across_the_desert-bounce-2.wav',
                '26-and_it_curled_into_the_circle_of_birth-bounce-2.wav',
                '27-and_the_dead_sand_falling_on_the_children-bounce-2.wav',
                '28-the_mothers_and_the_fathers-bounce-2.wav',
                '29-and_the_automatic_earth-bounce-2.wav',
                '30-and_i_believe-bounce-2.wav',
                '31-these_are_the_days_of_lasers_in_the_jungle-bounce-2.wav',
                '32-lasers_in_the_jungle_somewhere-bounce-2.wav',
                '33-staccato_signals_of_constant_information-bounce-2.wav',
                '34-a_loose_affiliation_of_millionaires_and_billionaires-bounce-2.wav',
                '35-and_baby-bounce-2.wav',
                '36-these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '37-this_is_the_long_distance_call-bounce-2.wav',
                '38-this_is_about_entanglements-bounce-2.wav',
                '39-matter-bounce-2.wav',
                '40-and_meaning-bounce-2.wav',
        ];

        const poemBaseUrlRafal = '/samples/poem/rafal/';

        const poemSentencesRafal = [
                '01_rafal_imagine_this_dance-bounce-2.wav',
                '02_rafal_happening_forever-bounce-2.wav',
                '03_rafal_since_always-bounce-2.wav',
                '04_rafal_forever-bounce-2.wav',
                '05_rafal_world_without_a_beginning-bounce-2.wav',
                '06_rafal_and_without_an_end-bounce-2.wav',
                '07_rafal_touching-bounce-2.wav',
                '08_rafal_trans_reality-bounce-2.wav',
                '09_rafal_entanglement-bounce-2.wav',
                '10_rafal_caring-bounce-2.wav',
                '11_rafal_mattering-bounce-2.wav',
                '12_rafal_in_an_endless_ecstasy_of_communication-bounce-2.wav',
                '13_rafal_no_void-bounce-2.wav',
                '14_rafal_no_self-bounce-2.wav',
                '15_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '16_rafal_this_is_the_long_distance_call-bounce-2.wav',
                '17_rafal_the_way_the_camera_follows_us_in_slomo-bounce-2.wav',
                '18_rafal_the_way_we_look_to_us_all-bounce-2.wav',
                '19_rafal_the_way_we_look_to_a_distant_constellation-bounce-2.wav',
                '20_rafal_thats_dying_in_a_corner_in_the_sky-bounce-2.wav',
                '21_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '22_rafal_and_dont_cry_baby-bounce-2.wav',
                '23_rafal_dont_cry-bounce-2.wav',
                '24_rafal_it_was_a_dry_wind-bounce-2.wav',
                '25_rafal_and_it_swept_across_the_desert-bounce-2.wav',
                '26_rafal_and_it_curled_into_the_circle_of_birth-bounce-2.wav',
                '27_rafal_and_the_dead_sand_falling_on_the_children-bounce-2.wav',
                '28_rafal_the_mothers_and_the_fathers-bounce-2.wav',
                '29_rafal_and_the_automatic_earth-bounce-2.wav',
                '30_rafal_and_i_believe-bounce-3.wav',
                '31_rafal_these_are_the_days_of_lasers_in_the_jungle-bounce-3.wav',
                '32_rafal_lasers_in_the_jungle_somewhere-bounce-2.wav',
                '33_rafal_staccato_signals_of_constant_information-bounce-2.wav',
                '34_rafal_a_loose_affiliation_of_millionaires_and_billionaires-bounce-2.wav',
                '35_rafal_and_baby-bounce-2.wav',
                '36_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav',
                '37_rafal_this_is_the_long_distance_call-bounce-2.wav',
                '38_rafal_this_is_about_entanglements-bounce-2.wav',
                '39_rafal_matter-bounce-2.wav',
                '40_rafal_meaning-bounce-2.wav',
        ];

        const poemSamplersMira = [];
        const poemSamplersRafal = [];

        const poemChorus = new Tone.Chorus(4, 2.5, 0.5);
        let poemFeedbackDelay = new Tone.FeedbackDelay(200, 0.1);
        const poemVolume = new Tone.Volume();

        poemChorus.connect(poemFeedbackDelay);
        poemFeedbackDelay.connect(poemVolume)
        poemVolume.toDestination();

        //load mira samplers

        for(const sentence in poemSentencesMira) {
            console.log(sentence);
            console.log(poemSentencesMira[sentence]);
            const sentenceSampler = new Tone.Sampler({
                'C3' : poemSentencesMira[sentence]
            },
            () => {
                
                console.log('loaded ' + poemSentencesMira[sentence]);
            },
                poemBaseUrlMira
            );
            sentenceSampler.connect(poemChorus);
            poemSamplersMira.push(sentenceSampler);
        }

        //load rafal samplers

        for(const sentence in poemSentencesRafal) {
            const sentenceSampler = new Tone.Sampler({
                'C3' : poemSentencesRafal[sentence]
            },
            () => {
                // console.log('loaded ' + poemSentences[sentence]);
            },
                poemBaseUrlRafal
            );
            sentenceSampler.connect(poemChorus);
            poemSamplersRafal.push(sentenceSampler);
            
        }


        /////get next sample and play

        const nextPoemSampleMira = computed(() => {
            return store.getters['nextPoemSampleMira'];
        });

        const maxPoemVolume = 20;

        watch(nextPoemSampleMira, (newValue) => {

            const index = newValue.index;
            const probability = newValue.probability;
            const volume = newValue.volume;
            const normalizedProbability = probability / 100;
            const randomPlayToss = Math.random();
            const normalPitch = 130;

            const randomPitchAmountNormalized = newValue.randomPitch / 100;
            const maxPitchUp = 300;
            const maxPitchDown = 60;

            const upOrDown = Math.random() > 0.5;
            // const maxPitchFactor = 2;
            let playPitch;

            if(upOrDown) {
                playPitch = normalPitch + randomPitchAmountNormalized * maxPitchUp;
            } else {
                playPitch = normalPitch - randomPitchAmountNormalized * maxPitchDown;
            }
            
            if(normalizedProbability > randomPlayToss) {
                poemVolume.volume.value = maxPoemVolume - (100 - volume);
                poemSamplersMira[index-1].triggerAttack(playPitch);
            }
        });

        const nextPoemSampleRafal = computed(() => {
            return store.getters['nextPoemSampleRafal'];
        });

        watch(nextPoemSampleRafal, (newValue) => {
            const index = newValue.index;
            const probability = newValue.probability;
            const volume = newValue.volume;
            const normalizedProbability = probability / 100;
            const randomPlayToss = Math.random();
            const normalPitch = 130;

            const randomPitchAmountNormalized = newValue.randomPitch / 100;
            const maxPitchUp = 300;
            const maxPitchDown = 60;

            const upOrDown = Math.random() > 0.5;
            // const maxPitchFactor = 2;
            let playPitch;

            if(upOrDown) {
                playPitch = normalPitch + randomPitchAmountNormalized * maxPitchUp;
            } else {
                playPitch = normalPitch - randomPitchAmountNormalized * maxPitchDown;
            }
            
            if(normalizedProbability > randomPlayToss) {
                try {
                    poemVolume.volume.value = maxPoemVolume - (100 - volume);
                    poemSamplersRafal[index-1].triggerAttack(playPitch);
                } catch (error) {
                    console.log(error);
                }
            }
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
            // touchRequested,
            // sendTouch
            // presenceLightnessJittered
        }
    },
    components: {
        ColorScreen
    },
    data() {
        return {
            rafalScreen: 0
        }
    },
    computed: {
        touching() {
            return this.$store.getters['isTouching']
        },
        touchingColor() {
            return this.$store.getters['touchingColor']
        },
        touchizationMuted() {
            return this.$store.getters['touchizationMuted']
        },
        rafalColors() {
            return this.$store.getters['rafalColors']
        }
    }
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

<style lang="stylus" scoped>
    .welcome
        height 100vh
        width 100vw
        background #0f0
        color #000
        position fixed
        top 0
        left 0
        padding 30px
        box-sizing border-box

    h3
        font-size 2rem
        text-align center

    button
        position fixed
        bottom 10vw
        left 10vw
        height 40vw
        width 40vw
        border none
        font-size 7rem
        border-radius 100%
        max-width 400px
        max-height 400px
    
</style>
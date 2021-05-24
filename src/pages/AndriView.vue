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
                <!-- <label>hue</label>
                <base-fader rainbow='true' scale='360' v-model='globalWeather.hue' /> -->
                <!-- <label>saturation</label>
                <base-fader v-model='globalWeather.saturation' /> -->
                <label>volume</label>
                <base-fader v-model='globalWeather.lightness' />
                <!-- <label>alpha</label>
                <base-fader scale='1' v-model='globalWeather.alpha' /> -->
                <label>SNARL</label>
                <base-fader scale='100' v-model='globalWeather.snarl' />
                <label>SCREECH</label>
                <base-fader scale='100' v-model='globalWeather.screech' />
                <label>AutoFilter frequency</label>
                <base-fader scale='30' v-model='globalWeather.frequency' />
                <label>AutoFilter frequency random</label>
                <base-fader scale='5' v-model='globalWeather.frequencyRandom' />
                <label>AutoFilter base frequency</label>
                <base-fader scale='30' v-model='globalWeather.baseFrequency' />
                <label>AutoFilter base frequency random</label>
                <base-fader scale='5' v-model='globalWeather.baseFrequencyRandom' />
                <label>AutoFilter octaves</label>
                <base-fader scale='30' v-model='globalWeather.octaves' />
                <label>AutoFilter octaves random</label>
                <base-fader scale='5' v-model='globalWeather.octavesRandom' />
                <label>Bitcrusher Wet</label>
                <base-fader scale='1' v-model='globalWeather.bitWet' />
                <label>Bitcrusher Bits</label>
                <base-fader scale='7' v-model='globalWeather.bitBits' />

                <div class='radio-area'>
                        <div class='form-entry-container-small'>
                            <label class='registration-label' for="square">SQUARE</label>
                            <div class='registration-customradio'>
                                <input class='registration-radio' type="radio" id='square' name='care-preference' value='square' v-model='globalWeather.type'>
                                <div class='registration-customradio-dot' v-if='globalWeather.type === "square"'></div>
                            </div>
                        </div>

                        <div class='form-entry-container-small'>
                            <label class='registration-label' for="sine">SINE</label>
                            <div class='registration-customradio'>
                                <input class='registration-radio' type="radio" id='sine' name='care-preference' value='sine' v-model='globalWeather.type'>
                                <div class='registration-customradio-dot' v-if='globalWeather.type === "sine"'></div>
                            </div>
                        </div>

                        <div class='form-entry-container-small'>
                            <label class='registration-label' for="sawtooth">SAWTOOTH</label>
                            <div class='registration-customradio'>
                                <input class='registration-radio' type="radio" id='sawtooth' name='care-preference' value='sawtooth' v-model='globalWeather.type'>
                                <div class='registration-customradio-dot' v-if='globalWeather.type === "sawtooth"'></div>
                            </div>
                        </div>

                        <div class='form-entry-container-small'>
                            <label class='registration-label' for="sanitary">TRIANGLE</label>
                            <div class='registration-customradio'>
                                <input class='registration-radio' type="radio" id='sanitary' name='care-preference' value='triangle' v-model='globalWeather.type'>
                                <div class='registration-customradio-dot' v-if='globalWeather.type === "triangle"'></div>
                            </div>
                        </div>
                    </div>

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
                <poem-trigger :midiProbability='poemProbability' :midiPitch='poemRandomPitch' :poemTriggerBuffer='poemTriggerBuffer' :poemVolume='poemVolume' />
            </div>
        </div>
    </div>
</template>

<script>
import XyPad from '../components/UI/XyPad'
import UsersList from '../components/layout/UsersList'
import PoemTrigger from '../components/UI/PoemTrigger'

import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
    components: {
        XyPad,
        UsersList,
        PoemTrigger
    },
    setup() {

        const poemProbability = ref(0);
        const poemRandomPitch = ref(0);
        const poemVolume = ref(0);

        const poemTriggerBuffer = ref(0);

        const globalWeather = ref({
                hue: 0,
                saturation: 0,
                lightness: 0,
                alpha: 0,
                frequency: 10,
                baseFrequency: 10,
                octaves: 10,
                frequencyRandom: 1,
                baseFrequencyRandom: 1,
                octavesRandom: 1,
                type: 'square',
                screech: 0,
                snarl: 0,
                bitWet: 0,
                bitBits: 7
            });

        //////////////MIDI///////////////
        //for midi
        function allowMIDIAccess() {
                navigator.requestMIDIAccess()
                .then(onMIDISuccess, onMIDIFailure);
        }

        try {
            allowMIDIAccess();
        } catch(err) {
            console.log(err);
        }

        function onMIDIFailure() {
            console.log('Could not access your MIDI devices.');
        }

        function onMIDISuccess(midiAccess) {
            console.log(midiAccess);
            for (var input of midiAccess.inputs.values()) {
                input.onmidimessage = getMIDIMessage;
            }
        }

        function midiToPercent(i) {
            return i / 127 * 100;
        }

        function getMIDIMessage(midiMessage) {
            const data = midiMessage.data;
            if(data[0] === 177) {//button push
                switch (data[1]) {
                    case 0: //first knob
                        poemTriggerBuffer.value = data[2];
                        break;
                    case 1: //second knob
                        
                        console.log(data[2]);
                        break;
                
                    default:
                        break;
                }
            } else if(data[0] === 176) { //knob turn
                switch (data[1]) {
                    case 0: //first knob
                        
                        poemProbability.value = midiToPercent(data[2]);
                        break;
                    case 1: //second knob
                        
                        poemRandomPitch.value = midiToPercent(data[2]);
                        break;
                    case 2: //second knob
                        poemVolume.value = midiToPercent(data[2]);
                        break;
                    case 4:
                        globalWeather.value.lightness = midiToPercent(data[2]);
                        break;
                    case 5:
                        globalWeather.value.frequency = midiToPercent(data[2])/100*30;
                        break;
                    case 6:
                        globalWeather.value.baseFrequency = midiToPercent(data[2])/100*30;
                        break;
                    case 7:
                        globalWeather.value.octaves = midiToPercent(data[2])/100*30;
                        break;
                    case 8:
                        if(midiToPercent(data[2]) < 25) {
                            globalWeather.value.type = 'square';
                        } else if ( midiToPercent(data[2]) > 25 && midiToPercent(data[2]) < 50) {
                            globalWeather.value.type = 'sine';
                        } else if ( midiToPercent(data[2]) > 50 && midiToPercent(data[2]) < 75) {
                            globalWeather.value.type = 'sawtooth';
                        } else {
                            globalWeather.value.type = 'triangle';
                        }
                        break;
                    case 9:
                        globalWeather.value.frequencyRandom = midiToPercent(data[2])/20;
                        break;
                    case 10:
                        globalWeather.value.baseFrequencyRandom = midiToPercent(data[2])/20;
                        break;
                    case 11:
                        globalWeather.value.octavesRandom = midiToPercent(data[2])/20;
                        break;
                    case 12:
                        globalWeather.value.snarl = midiToPercent(data[2]);
                        break;
                    case 13:
                        globalWeather.value.screech = midiToPercent(data[2]);
                        break;
                    case 14:
                        globalWeather.value.bitWet = midiToPercent(data[2])/100;
                        break;
                    case 15:
                        globalWeather.value.bitBits = midiToPercent(data[2])/100*7;
                        break;
                
                    default:
                        break;
                }
            } 
        }
        return {
            poemProbability,
            poemRandomPitch,
            poemTriggerBuffer,
            poemVolume,
            allowMIDIAccess,
            globalWeather
        }
    },
    data() {
        return {
            presenceRadius: 10,
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


    .registration-radio {
        background-color: transparent;
        width: 20px;
        height: 20px;
        opacity: 0;
        margin: 0;
        position: absolute;
        
    }

    .registration-customradio {
        border: 2px solid red;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        transform: scale(1);
        border-radius: 20px;
    }

    .registration-customradio-dot {
        background-color: red;
        width: 25px;
        height: 25px;
        border-radius: 100%;
        position: absolute;
        top: 2px;
        left: 2px;
    }

</style>
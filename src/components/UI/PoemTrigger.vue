<template>
    <div>
        <h1>POEM</h1>
        <label>SOURCE MIRA</label>
        <base-checkbox v-model='sourceMira' />
        <br>
        <label>SOURCE RAFAL</label>
        <base-checkbox v-model='sourceRafal' />
        <br>
        <label>OUTPUT RAFAL</label>
        <base-checkbox v-model='outputRafals' />
        <br>
        <label>OUTPUT USER</label>
        <base-checkbox v-model='outputUsers' />
        <br>
        <label>probability</label>
        <base-fader v-model='probability'></base-fader>
        <label>random pitch</label>
        <base-fader v-model='randomPitch'></base-fader>
        <label>volume</label>
        <base-fader v-model='volume'></base-fader>
        <button :class='{"active": sentence.index === currentIndex}' @click='triggerSentence(sentence.index); updateIndex(sentence.index);' class='poem-button' v-for='sentence in sentences' :key='sentence.index'>{{ sentence.text }}</button>
    </div>
</template>

<script>
export default {
    props: ['midi-probability','midi-pitch', 'poem-trigger-buffer', 'poem-volume'],
    methods: { 
        updateIndex(index) {
            this.currentIndex = index + 1;
        },
        triggerSentence(index) {
            if(this.sourceMira) {
                const triggerObject = {
                    index,
                    probability: this.probability,
                    randomPitch: this.randomPitch,
                    volume: this.volume,
                    outputRafals: this.outputRafals,
                    outputUsers: this.outputUsers,
                    source: 'mira'
                }
            this.$store.dispatch('triggerPoemSentenceMira', triggerObject);
            }
            if(this.sourceRafal) {
                const triggerObject = {
                index,
                probability: this.probability,
                randomPitch: this.randomPitch,
                volume: this.volume,
                outputRafals: this.outputRafals,
                outputUsers: this.outputUsers,
                source: 'rafal'
            }
            this.$store.dispatch('triggerPoemSentenceRafal', triggerObject);
            }
        }
    },
    watch: {
        midiProbability(newValue) {
            this.probability = newValue;
        },
        midiPitch(newValue) {
            this.randomPitch = newValue;
        },
        poemVolume(newValue) {
            this.volume = newValue;
        },
        poemTriggerBuffer(newValue) { //here we trigger new notes UwU
            if(newValue === 127) {
                this.triggerSentence(this.currentIndex);
                if(this.currentIndex < 40) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 1;
                }
            }
        }
    },
    data() {
        return {
            currentIndex: 1,
            maxIndex: 40,
            probability: 100,
            randomPitch: 0,
            volume: 100,
            outputRafals: true,
            outputUsers: true,
            sourceMira: true,
            sourceRafal: false,
            sentences: [
                {
                    index: 1,
                    text: 'imagine this dance',
                    miraPath: '01-imagine_this_dance-bounce-1.wav_16.wav',
                    rafalPath: '01_rafal_imagine_this_dance-bounce-2.wav'
                },
                {
                    index: 2,
                    text: 'happening forever',
                    miraPath: '02-happening_forever-bounce-1.wav_16.wav',
                    rafalPath: '02_rafal_happening_forever-bounce-2.wav'
                },
                {
                    index: 3,
                    text: 'since always',
                    miraPath: '03-since_always-bounce-1.wav_16.wav',
                    rafalPath: '03_rafal_since_always-bounce-2.wav'
                },
                {
                    index: 4,
                    text: 'forever',
                    miraPath: '04-forever-bounce-1.wav_16.wav',
                    rafalPath: '04_rafal_forever-bounce-2.wav'
                },
                {
                    index: 5,
                    text: 'world without a beginning',
                    miraPath: '05-world_without_a_beginning-bounce-1.wav_16.wav',
                    rafalPath: '05_rafal_world_without_a_beginning-bounce-2.wav'
                },
                {
                    index: 6,
                    text: 'and without an end',
                    miraPath: '06-and_without_an_end-bounce-1.wav_16.wav',
                    rafalPath: '06_rafal_and_without_an_end-bounce-2.wav'
                },
                {
                    index: 7,
                    text: 'touching',
                    miraPath: '07-touching-bounce-1.wav_16.wav',
                    rafalPath: '07_rafal_touching-bounce-2.wav'
                },
                {
                    index: 8,
                    text: 'trans reality',
                    miraPath: '08-trans-reality-bounce-1.wav_16.wav',
                    rafalPath: '08_rafal_trans_reality-bounce-2.wav'
                },
                {
                    index: 9,
                    text: 'entanglement',
                    miraPath: '09-entanglement-bounce-1.wav_16.wav',
                    rafalPath: '09_rafal_entanglement-bounce-2.wav'
                },
                {
                    index: 10,
                    text: 'caring',
                    miraPath: '10-caring-bounce-1.wav_16.wav',
                    rafalPath: '10_rafal_caring-bounce-2.wav'
                },
                {
                    index: 11,
                    text: 'mattering',
                    miraPath: '11-mattering-bounce-1.wav_16.wav',
                    rafalPath: '11_rafal_mattering-bounce-2.wav'
                },
                {
                    index: 12,
                    text: 'in an endless ecstasy of communication',
                    miraPath: '12-in_an_endless_ecstasy_of_communication-bounce-1.wav_16.wav',
                    rafalPath: '12_rafal_in_an_endless_ecstasy_of_communication-bounce-2.wav'
                },
                {
                    index: 13,
                    text: 'no void',
                    miraPath: '13-no_void-bounce-1.wav_16.wav',
                    rafalPath: '13_rafal_no_void-bounce-2.wav'
                },
                {
                    index: 14,
                    text: 'no self',
                    miraPath: '14-no_self-bounce-1.wav_16.wav',
                    rafalPath: '14_rafal_no_self-bounce-2.wav'
                },
                {
                    index: 15,
                    text: 'these are the days of miracle and wonder',
                    miraPath: '15-these_are_the_days_of_miracle_and_wonder-bounce-1.wav_16.wav',
                    rafalPath: '15_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav'
                },
                {
                    index: 16,
                    text: 'this is the long distance call',
                    miraPath: '16-this_is_the_long_distance_call-bounce-1.wav_16.wav',
                    rafalPath: '16_rafal_this_is_the_long_distance_call-bounce-2.wav'
                },
                {
                    index: 17,
                    text: 'the way the camera follows us in slomo-bounce',
                    miraPath: '17-the_way_the_camera_follows_us_in_slomo-bounce-1.wav_16.wav',
                    rafalPath: '17_rafal_the_way_the_camera_follows_us_in_slomo-bounce-2.wav'
                },
                {
                    index: 18,
                    text: 'the way we look to us all',
                    miraPath: '18-the_way_we_look_to_us_all-bounce-1.wav_16.wav',
                    rafalPath: '18_rafal_the_way_we_look_to_us_all-bounce-2.wav'
                },
                {
                    index: 19,
                    text: 'the way we look to a distant constellation',
                    miraPath: '19-the_way_we_look_to_a_distant_constellation-bounce-1.wav_16.wav',
                    rafalPath: '19_rafal_the_way_we_look_to_a_distant_constellation-bounce-2.wav'
                },
                {
                    index: 20,
                    text: 'thats dying in a corner in the sky',
                    miraPath: '20-thats_dying_in_a_corner_in_the_sky-bounce-1.wav_16.wav',
                    rafalPath: '20_rafal_thats_dying_in_a_corner_in_the_sky-bounce-2.wav'
                },
                {
                    index: 21,
                    text: 'these are the days of miracle and wonder',
                    miraPath: '21-these_are_the_days_of_miracle_and_wonder-bounce-2.wav_16.wav',
                    rafalPath: '21_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav'
                },
                {
                    index: 22,
                    text: "and don't cry, baby, baby",
                    miraPath: '22-and_dont_cry_baby-bounce-1.wav_16.wav',
                    rafalPath: '22_rafal_and_dont_cry_baby-bounce-2.wav'
                },
                {
                    index: 23,
                    text: "don't cry",
                    miraPath: '23-dont_cry-bounce-1.wav_16.wav',
                    rafalPath: '23_rafal_dont_cry-bounce-2.wav'
                },
                {
                    index: 24,
                    text: 'it was a dry wind',
                    miraPath: '24-it_was_a_dry_wind-bounce-1.wav_16.wav',
                    rafalPath: '24_rafal_it_was_a_dry_wind-bounce-2.wav'
                },
                {
                    index: 25,
                    text: 'and it swept across the desert',
                    miraPath: '25-and_it_swept_across_the_desert-bounce-1.wav_16.wav',
                    rafalPath: '25_rafal_and_it_swept_across_the_desert-bounce-2.wav'
                },
                {
                    index: 26,
                    text: 'and it curled into the circle of birth',
                    miraPath: '26-and_it_curled_into_the_circle_of_birth-bounce-1.wav_16.wav',
                    rafalPath: '26_rafal_and_it_curled_into_the_circle_of_birth-bounce-2.wav'
                },
                {
                    index: 27,
                    text: 'and the dead sand falling on the children',
                    miraPath: '27-and_the_dead_sand_falling_on_the_children-bounce-1.wav_16.wav',
                    rafalPath: '27_rafal_and_the_dead_sand_falling_on_the_children-bounce-2.wav'
                },
                {
                    index: 28,
                    text: 'the mothers and the fathers',
                    miraPath: '28-the_mothers_and_the_fathers-bounce-1.wav_16.wav',
                    rafalPath: '28_rafal_the_mothers_and_the_fathers-bounce-2.wav'
                },
                {
                    index: 29,
                    text: 'and the automatic earth',
                    miraPath: '29-and_the_automatic_earth-bounce-1.wav_16.wav',
                    rafalPath: '29_rafal_and_the_automatic_earth-bounce-2.wav'
                },
                {
                    index: 30,
                    text: 'and i believe',
                    miraPath: '30-and_i_believe-bounce-1.wav_16.wav',
                    rafalPath: '30_rafal_and_i_believe-bounce-3.wav'
                },
                {
                    index: 31,
                    text: 'these are the days of lasers in the jungle',
                    miraPath: '31-these_are_the_days_of_lasers_in_the_jungle-bounce-1.wav_16.wav',
                    rafalPath: '31_rafal_these_are_the_days_of_lasers_in_the_jungle-bounce-3.wav'
                },
                {
                    index: 32,
                    text: 'lasers in the jungle somewhere',
                    miraPath: '32-lasers_in_the_jungle_somewhere-bounce-1.wav_16.wav',
                    rafalPath: '32_rafal_lasers_in_the_jungle_somewhere-bounce-2.wav'
                },
                {
                    index: 33,
                    text: 'staccato signals of constant information',
                    miraPath: '33-staccato_signals_of_constant_information-bounce-1.wav_16.wav',
                    rafalPath: '33_rafal_staccato_signals_of_constant_information-bounce-2.wav'
                },
                {
                    index: 34,
                    text: 'a loose affiliation of millionaires and billionaires',
                    miraPath: '34-a_loose_affiliation_of_millionaires_and_billionaires-bounce-1.wav',
                    rafalPath: '34_rafal_a_loose_affiliation_of_millionaires_and_billionaires-bounce-2.wav'
                },
                {
                    index: 35,
                    text: 'and baby',
                    miraPath: '35-and_baby-bounce-2.wav',
                    rafalPath: '35_rafal_and_baby-bounce-2.wav'
                },
                {
                    index: 36,
                    text: 'these are the days of miracle and wonder',
                    miraPath: '36-these_are_the_days_of_miracle_and_wonder-bounce-3.wav_16.wav',
                    rafalPath: '36_rafal_these_are_the_days_of_miracle_and_wonder-bounce-2.wav'
                },
                {
                    index: 37,
                    text: 'this is the long distance call',
                    miraPath: '37-this_is_the_long_distance_call-bounce-2.wav_16.wav',
                    rafalPath: '37_rafal_this_is_the_long_distance_call-bounce-2.wav'
                },
                {
                    index: 38,
                    text: 'this is about entanglements',
                    miraPath: '38-this_is_about_entanglements-bounce-1.wav_16.wav',
                    rafalPath: '38_rafal_this_is_about_entanglements-bounce-2.wav'
                },
                {
                    index: 39,
                    text: 'matter',
                    miraPath: '39-matter-bounce-1.wav_16.wav',
                    rafalPath: '39_rafal_matter-bounce-2.wav'
                },
                {
                    index: 40,
                    text: 'and meaning',
                    miraPath: '40-and_meaning-bounce-1.wav_16.wav',
                    rafalPath: '40_rafal_meaning-bounce-2.wav'
                },
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>
    .poem-button
        background transparent 
        border 1px dashed white
        color white
        margin 3px 5px
        font-size 1.5rem
        text-align left
        padding 5px 20px
        border-radius 20px

        &:hover
            box-shadow inset 0 0 10px white
        &:active
            box-shadow  0 0 10px white,
                        inset 0 0 20px white

    .touching-checkbox
        width 50px
        height 50px
        border-radius 50px

    .active
        background red
</style>
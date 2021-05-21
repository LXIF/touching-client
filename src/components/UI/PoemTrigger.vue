<template>
    <div>
        <h1>POEM</h1>
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
        <label>time jitter</label>
        <base-fader v-model='timeJitter'></base-fader>
        <button @click='triggerSentence(sentence.index)' class='poem-button' v-for='sentence in sentences' :key='sentence.index'>{{ sentence.text }}</button>
    </div>
</template>

<script>
export default {
    methods: {  
        triggerSentence(index) {
            const triggerObject = {
                index,
                probability: this.probability,
                randomPitch: this.randomPitch,
                timeJitter: this.timeJitter,
                outputRafals: this.outputRafals,
                outputUsers: this.outputUsers
            }
            this.$store.dispatch('triggerPoemSentence', triggerObject);
        }
    },
    data() {
        return {
            probability: 0,
            randomPitch: 0,
            timeJitter: 0,
            outputRafals: false,
            outputUsers: false,
            sentences: [
                {
                    index: 1,
                    text: 'imagine this dance',
                    path: '01-imagine_this_dance-bounce-1.wav_16.wav'
                },
                {
                    index: 2,
                    text: 'happening forever',
                    path: '02-happening_forever-bounce-1.wav_16.wav'
                },
                {
                    index: 3,
                    text: 'since always',
                    path: '03-since_always-bounce-1.wav_16.wav'
                },
                {
                    index: 4,
                    text: 'forever',
                    path: '04-forever-bounce-1.wav_16.wav'
                },
                {
                    index: 5,
                    text: 'world without a beginning',
                    path: '05-world_without_a_beginning-bounce-1.wav_16.wav'
                },
                {
                    index: 6,
                    text: 'and without an end',
                    path: '06-and_without_an_end-bounce-1.wav_16.wav'
                },
                {
                    index: 7,
                    text: 'touching',
                    path: '07-touching-bounce-1.wav_16.wav'
                },
                {
                    index: 8,
                    text: 'trans reality',
                    path: '08-trans-reality-bounce-1.wav_16.wav'
                },
                {
                    index: 9,
                    text: 'entanglement',
                    path: '09-entanglement-bounce-1.wav_16.wav',
                },
                {
                    index: 10,
                    text: 'caring',
                    path: '10-caring-bounce-1.wav_16.wav',
                },
                {
                    index: 11,
                    text: 'mattering',
                    path: '11-mattering-bounce-1.wav_16.wav',
                },
                {
                    index: 12,
                    text: 'in an endless ecstasy of communication',
                    path: '12-in_an_endless_ecstasy_of_communication-bounce-1.wav_16.wav',
                },
                {
                    index: 13,
                    text: 'no void',
                    path: '13-no_void-bounce-1.wav_16.wav',
                },
                {
                    index: 14,
                    text: 'no self',
                    path: '14-no_self-bounce-1.wav_16.wav',
                },
                {
                    index: 15,
                    text: 'these are the days of miracle and wonder',
                    path: '15-these_are_the_days_of_miracle_and_wonder-bounce-1.wav_16.wav',
                },
                {
                    index: 16,
                    text: 'this is the long distance call',
                    path: '16-this_is_the_long_distance_call-bounce-1.wav_16.wav',
                },
                {
                    index: 17,
                    text: 'the way the camera follows us in slomo-bounce',
                    path: '17-the_way_the_camera_follows_us_in_slomo-bounce-1.wav_16.wav',
                },
                {
                    index: 18,
                    text: 'the way we look to us all',
                    path: '18-the_way_we_look_to_us_all-bounce-1.wav_16.wav',
                },
                {
                    index: 19,
                    text: 'the way we look to a distant constellation',
                    path: '19-the_way_we_look_to_a_distant_constellation-bounce-1.wav_16.wav',
                },
                {
                    index: 20,
                    text: 'thats dying in a corner in the sky',
                    path: '20-thats_dying_in_a_corner_in_the_sky-bounce-1.wav_16.wav',
                },
                {
                    index: 21,
                    text: 'these are the days of miracle and wonder',
                    path: '21-these_are_the_days_of_miracle_and_wonder-bounce-2.wav_16.wav',
                },
                {
                    index: 22,
                    text: "and don't cry, baby, baby",
                    path: '22-and_dont_cry_baby-bounce-1.wav_16.wav',
                },
                {
                    index: 23,
                    text: "don't cry",
                    path: '23-dont_cry-bounce-1.wav_16.wav',
                },
                {
                    index: 24,
                    text: 'it was a dry wind',
                    path: '24-it_was_a_dry_wind-bounce-1.wav_16.wav',
                },
                {
                    index: 25,
                    text: 'and it swept across the desert',
                    path: '25-and_it_swept_across_the_desert-bounce-1.wav_16.wav',
                },
                {
                    index: 26,
                    text: 'and it curled into the circle of birth',
                    path: '26-and_it_curled_into_the_circle_of_birth-bounce-1.wav_16.wav',
                },
                {
                    index: 27,
                    text: 'and the dead sand falling on the children',
                    path: '27-and_the_dead_sand_falling_on_the_children-bounce-1.wav_16.wav',
                },
                {
                    index: 28,
                    text: 'the mothers and the fathers',
                    path: '28-the_mothers_and_the_fathers-bounce-1.wav_16.wav',
                },
                {
                    index: 29,
                    text: 'and the automatic earth',
                    path: '29-and_the_automatic_earth-bounce-1.wav_16.wav',
                },
                {
                    index: 30,
                    text: 'and i believe',
                    path: '30-and_i_believe-bounce-1.wav_16.wav',
                },
                {
                    index: 31,
                    text: 'these are the days of lasers in the jungle',
                    path: '31-these_are_the_days_of_lasers_in_the_jungle-bounce-1.wav_16.wav',
                },
                {
                    index: 32,
                    text: 'lasers in the jungle somewhere',
                    path: '32-lasers_in_the_jungle_somewhere-bounce-1.wav_16.wav',
                },
                {
                    index: 33,
                    text: 'staccato signals of constant information',
                    path: '33-staccato_signals_of_constant_information-bounce-1.wav_16.wav',
                },
                {
                    index: 34,
                    text: 'and baby',
                    path: '34-and_baby-bounce-1.wav_16.wav',
                },
                {
                    index: 35,
                    text: 'these are the days of miracle and wonder',
                    path: '35-these_are_the_days_of_miracle_and_wonder-bounce-3.wav_16.wav',
                },
                {
                    index: 36,
                    text: 'this is the long distance call',
                    path: '36-this_is_the_long_distance_call-bounce-2.wav_16.wav',
                },
                {
                    index: 37,
                    text: 'this is about entanglements',
                    path: '37-this_is_about_entanglements-bounce-1.wav_16.wav',
                },
                {
                    index: 38,
                    text: 'matter',
                    path: '38-matter-bounce-1.wav_16.wav',
                },
                {
                    index: 39,
                    text: 'and meaning',
                    path: '39-and_meaning-bounce-1.wav_16.wav',
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


</style>
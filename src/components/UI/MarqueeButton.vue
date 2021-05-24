<template>
    <button @pointerdown='buttonClick' @pointerup='buttonRelease'>
        <div class='' :class='{"svg-container": !clicked, "svg-container-larger": clicked}'>
            <svg viewBox='0 0 100 100'>
            <!-- <path stroke='black' d='
                M 15, 50
                a 35,35 0 1,0 50,0
                a 35,35 0 1,10-50,0
                ' /> -->
                <circle-path class='text-circle' cx='50' cy='50' r='40' pathId='marqueebutton' />
                <!-- <circle cx='50' cy='50' r='35'></circle> -->
                
                <text class='gradient circle-text' :class='{"light": color === "light"}'>
                    <textPath href="#marqueebutton" :textLength='pathLength' lengthAdjust='spacingAndGlyphs'>
                        {{ marqueeText }}
                    </textPath>
                </text>
            </svg>
        </div>
        <h3 class='gradient'>{{ text }}</h3>
    </button>
</template>

<script>
import CirclePath from '../layout/CirclePath'

export default {
    emits: ['button-click'],
    props: ['text', 'color'],
    components: {
        CirclePath
    },
    data() {
        return {
            pathId: 'wargle',
            pathLength: null,
            clicked: false
        }  
    },
    computed: {
        marqueeText() {
            const marqueeText = this.text.slice(1) + this.text + this.text + this.text.slice(0, 1);
            return marqueeText
        }
    },
    methods: {
        buttonClick() {
            this.clicked = true;
            this.$emit('button-click');
        },
        buttonRelease() {
            this.clicked = false;
        },
        setPathLength() {
            this.pathLength = document.getElementById('marqueebutton').getTotalLength();
        },

    },
    mounted() {
        this.setPathLength();
    }
}
</script>

<style lang="stylus" scoped>
    button
        background transparent
        border-radius 100%
        font-size 5rem
        font-family Messapia-bold
        transform scale(1)
        border none
        height 50vw
        width 50vw
        margin 0 10%
        padding 0
        box-shadow 0 0 30px white

    svg
        position fixed
        left 0
        top 0
        animation: heartbeat 1.3s infinite ease-in-out;

    .text-circle
        stroke transparent
        fill transparent

    textPath 
        font-size 1rem

    .svg-container
        animation rotate 5s infinite linear
        transform-origin center
        width 100%
        height 100%
        transition all 0.2s ease

    .svg-container-larger
        animation rotate-larger 5s infinite linear
        transform-origin center
        width 100%
        height 100%
        transition all 0.2s ease

    h3
        position fixed
        font-size 3rem
        margin 0
        top calc(50% - 1.8rem)
        width 100%
        text-align center

    .light
        stroke white
        fill white

    .gradient
        background -webkit-linear-gradient(#Fc2828, #333)
        -webkit-background-clip text
        -webkit-text-fill-color transparent
        text-shadow 0 0 10px #fff
        border 3px solid yes

    .circle-text
        fill transparent
        stroke red
        stroke-width 0.1px



    @keyframes rotate {
        0% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @keyframes rotate-larger {
        0% {
            transform: rotate(360deg) scale(1.2);
        }
        100% {
            transform: rotate(0deg) scale(1.2);
        }
    }
    
</style>
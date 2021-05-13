<template>
    <div class='fader-container'>
        <svg id='fader' class='fader' :class="{red: !rainbow, rainbow: rainbow}" @pointerdown='startSetFaderPosition' @pointermove.prevent='setFaderPosition' viewBox='-5 0 110 10'>
            <circle class='fader-knob' :cx='valuePos' cy='5' r='5'></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props: ['orientation', 'modelValue', 'scale', 'rainbow'],

    emits: ['update:modelValue'],
    data() {
        return {
            value: 0,
            touching: false
        }
    },
    computed: {
        valuePos() {
            if(this.scale && this.scale !== 100) {
                return this.modelValue / (this.scale / 100);
            } else {
                return this.modelValue
            }
        }
    },
    methods: {
        startSetFaderPosition(e) {
            this.touching = true;
            this.setFaderPosition(e);
            const that = this;
            function handlePointerup() {
                that.endSetFaderPosition();
                document.querySelector('html').removeEventListener('pointerup', handlePointerup);
            }
            document.querySelector('html').addEventListener('pointerup', handlePointerup);
        },
        endSetFaderPosition() {
            this.touching = false;
        },
        setFaderPosition(e) {
            if(this.touching) {
                const fader = document.getElementById('fader');
                const padWidth = fader.clientWidth;
                // const faderHeight = xyPad.clientHeight;

                let newX = (e.offsetX / padWidth * 110) - 5;
                // let newY = e.offsetY / padHeight * 100;

                if (newX > 100) {
                    newX = 100;
                }
                if (newX < 0) {
                    newX = 0;
                }
                // if (newY > 100) {
                //     newY = 100;
                // }
                // if (newY < 0) {
                //     newY = 0;
                // }

                // this.value = newX;
                // this.touchY = newY;
                
                if(this.scale && this.scale !== 100) {
                        newX = newX * (this.scale / 100);
                }
                this.$emit('update:modelValue', newX);
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .fader
        stroke red
        // height 20px
        // width 100%
        border-radius 20px
        touch-action none

    .red
        background red
    
    .rainbow
        background linear-gradient(to right,
            hsl(0, 100, 50),
            hsl(20, 100, 50),
            hsl(40, 100, 50),    
            hsl(60, 100, 50),
            hsl(80, 100, 50),
            hsl(100, 100, 50),
            hsl(120, 100, 50),
            hsl(140, 100, 50),
            hsl(160, 100, 50),
            hsl(180, 100, 50),
            hsl(200, 100, 50),
            hsl(220, 100, 50),
            hsl(240, 100, 50),
            hsl(260, 100, 50),
            hsl(280, 100, 50),
            hsl(300, 100, 50),
            hsl(320, 100, 50),
            hsl(340, 100, 50),
            hsl(360, 100, 50)
            )
    
    .fader-knob
        height 20px
        width 20px
        stroke none
        fill green

    .fader-container
        width 100%

</style>
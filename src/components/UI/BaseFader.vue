<template>
    <div class='fader-container'>
        <svg id='fader' class='fader' @pointerdown='startSetFaderPosition' @pointermove.prevent='setFaderPosition' viewBox='0 0 100 10'>
            <circle class='fader-knob' :cx='modelValue' cy='5' r='5'></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props: ['orientation', 'modelValue'],

    emits: ['update:modelValue'],
    data() {
        return {
            value: 0,
            touching: false
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

                let newX = e.offsetX / padWidth * 100;
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
                this.$emit('update:modelValue', newX);
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .fader
        stroke red
        background red
        // height 20px
        // width 100%
        border-radius 20px
        touch-action none
    
    .fader-knob
        height 20px
        width 20px
        stroke none
        fill green

    .fader-container
        width 100%

</style>
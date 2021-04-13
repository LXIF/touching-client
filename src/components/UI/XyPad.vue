<template>
    <div class='xy-pad'>
        <svg id='xy-pad' @mousedown='startSetCirclePosition' @mouseup='endSetCirclePosition' @mousemove='setCirclePosition' viewBox='0 0 100 100'>
            <circle :cx='touchX' :cy='touchY' r='10' stroke='black'></circle>
        </svg>
    </div>
</template>

<script>
export default {
    emits: ['position'],
    data() {
        return {
            touchX: 50,
            touchY: 50,
            touching: false
        }
    },
    methods: {
        startSetCirclePosition() {
            this.touching = true;
        },
        endSetCirclePosition() {
            this.touching = false;
        },
        setCirclePosition(e) {
            if(this.touching) {
                const xyPad = document.getElementById('xy-pad');
                const padWidth = xyPad.clientWidth;
                const padHeight = xyPad.clientHeight;

                const newX = e.offsetX / padWidth * 100;
                const newY = e.offsetY / padHeight * 100;

                this.touchX = newX;
                this.touchY = newY;
                this.$emit('position', {
                        x: newX,
                        y: newY
                    });
            }
        },
        drag(e) {
            console.log(e);
        }
    }
}
</script>

<style lang="stylus" scoped>
    .xy-pad
        width 300px
        height 300px
        border 1px solid green
        border-radius 10px

    svg
        height inherit
        width inherit
        background-color transparent
        border-radius 10px
</style>
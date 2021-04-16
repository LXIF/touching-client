<template>
    <div class='xy-pad'>
        <svg id='xy-pad' @pointerdown='startSetCirclePosition' @pointermove.prevent='setCirclePosition' viewBox='0 0 100 100'>
            <circle class='xy-point' v-for='(user, index) in users' :key='index' :cx='user.position.x' :cy='user.position.y' r='1' />
            <circle class='xy-cursor' :cx='touchX' :cy='touchY' :r='presenceRadius'></circle>
        </svg>
    </div>
</template>

<script>
export default {
    emits: ['presence'],
    props: ['users', 'radius'],
    data() {
        return {
            touchX: 50,
            touchY: 50,
            touching: false,
            offsetX: 0,
            offsetY: 0
        }
    },
    computed: {
        presenceRadius() {
            const min = 3;
            const max = 50;
            return this.radius / 100 * max + min;
        }
    },
    watch: {
        radius() {
            this.setRadius();
        }
    },
    methods: {
        startSetCirclePosition(e) {
            this.touching = true;
            this.setCirclePosition(e);
            const that = this;
            function handlePointerup() {
                that.endSetCirclePosition();
                document.querySelector('html').removeEventListener('pointerup', handlePointerup);
            }
            document.querySelector('html').addEventListener('pointerup', handlePointerup);
        },
        endSetCirclePosition() {
            this.touching = false;
        },
        setCirclePosition(e) {
            if(this.touching) {
                const xyPad = document.getElementById('xy-pad');
                const padWidth = xyPad.clientWidth;
                const padHeight = xyPad.clientHeight;

                let newX = e.offsetX / padWidth * 100;
                let newY = e.offsetY / padHeight * 100;

                if (newX > 100) {
                    newX = 100;
                }
                if (newX < 0) {
                    newX = 0;
                }
                if (newY > 100) {
                    newY = 100;
                }
                if (newY < 0) {
                    newY = 0;
                }

                this.touchX = newX;
                this.touchY = newY;
                this.$emit('presence', {
                        x: this.touchX,
                        y: this.touchY,
                        radius: this.presenceRadius
                    });
            }
        },
        setRadius() {
            this.$emit('presence', {
                        x: this.touchX,
                        y: this.touchY,
                        radius: this.presenceRadius
                    });
        }
    }
}
</script>

<style lang="stylus" scoped>
    .xy-pad
        // width 300px
        // height 300px
        border 1px solid color-medium-light
        border-radius 10px
        touch-action none

    .xy-cursor
        stroke color-medium-light
        fill transparent

    .xy-point
        stroke red
        fill red
    svg
        height inherit
        width inherit
        background-color transparent
        border-radius 10px
</style>
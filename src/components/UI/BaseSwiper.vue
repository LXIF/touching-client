<template>
    <div>
        <svg id='swiper' class='swiper' :class='{ "hot": hot }' @pointerdown='startSetSwiperPosition' @pointermove.prevent='setSwiperPosition' viewBox='-10 0 120 10'>
            <rect class='swiper-handle' :class='{ "hot": hot }' :x='xPos - 10' y='0' width='20' height='10' rx='5' ry='5' ></rect>
        </svg>
    </div>
</template>

<script>
export default {
    emits: ['activate'],
    data() {
        return {
            xPos: 0,
            touching: false
        }
    },
    computed: {
        hot() {
            return this.xPos > 90
        }
    },
    methods: {
        startSetSwiperPosition(e) {
            this.touching = true;
            this.setSwiperPosition(e);
            const that = this;
            function handlePointerup() {
                that.endSetSwiperPosition();
                document.querySelector('html').removeEventListener('pointerup', handlePointerup);
            }
            document.querySelector('html').addEventListener('pointerup', handlePointerup);
        },
        endSetSwiperPosition() {
            if(this.hot) {
                this.$emit('activate');
            }
            this.touching = false;
            this.xPos = 0;
        },
        setSwiperPosition(e) {
            if(this.touching) {
                // console.log(e.pageX);
                const swiper = document.getElementById('swiper');
                const padWidth = swiper.clientWidth;
                // const swiperHeight = xyPad.clientHeight;

                let newX = (e.offsetX / padWidth * 120) - 10;
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
                
                this.xPos = newX;

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .swiper
        background gray
        border-radius 20px
        transition all 0.2s ease
        touch-action none

    .hot
        animation hot-blink 0.3s infinite

    .swiper-handle
        fill red

    @keyframes hot-blink {
        from {
            box-shadow: 0 0 2px #ff0;
        }
        to {
            box-shadow: 0 0 20px #ff0;
        }
    }
</style>
<template>
<transition name='swiper'>
    <div v-if='show' class='base-swipe'  @pointerdown='startSwiping' @pointerup='endSwiping' @pointermove='swipe' :style="`transform: translateX(${translateX}px)`">
        <h1 class='swipe-text'>{{ text }}</h1>
    </div>
</transition>
</template>

<script>
export default {
    props: ['text', 'show'],
    emits: ['swipe'],
    data() {
        return {
            isSwiping: false,
            startX: 0,
            translateX: 0,
        }
    },
    methods: {
        startSwiping(e) {
            this.isSwiping = true;
            this.startX = e.pageX;
        },
        swipe(e) {
            if(this.isSwiping) {
                this.translateX = e.pageX - this.startX;
            }
        },
        endSwiping() {
            const pageWidth = document.querySelector('html').getBoundingClientRect().width;
            if(this.translateX > pageWidth / 3) {
                this.$emit('swipe');
            }
            this.translateX = 0;
            this.isSwiping = false;
        }
    }
}
</script>

<style lang="stylus" scoped>
    .base-swipe
        position fixed
        top 0
        left 0
        height 100%
        width 100%
        margin 0
        padding 0
        background radial-gradient(circle, rgba(106,0,255,1) 0%, rgba(0,255,33,1) 52%, rgba(167,0,255,1) 100%)
        touch-action none
        display grid
        grid-template-rows 1fr 3rem 1fr
        color white

    .swipe-text
        text-align center
        grid-row 2/3
        margin 0
        animation 3s heartbeat infinite ease
        pointer-events none

    .swiper-enter-from
        opacity 0
    .swiper-enter-to
        opacity 1
    .swiper-enter-active
        transition all 0.1s ease-out
    .swiper-leave-from
        opacity 1
    .swiper-leave-to
        opacity 0
    .swiper-leave-active
        transition all 0.1s ease-in
</style>

<style lang="stylus" scoped>
    @keyframes heartbeat {
        0% {
            transform: scale(0.99);
        }
        40% {
            transform: scale(1)
        }
        48% {
            transform: scale(1.01);
        }
        55% {
            transform: scale(1);
        }
        63% {
            transform: scale(1.01);
        }
        70% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.99);
        }
    }
</style>
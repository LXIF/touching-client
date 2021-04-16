<template>
    <div :style='screenStyle' class='color-screen'>
        
    </div>
</template>

<script>
export default {
    props: {
        hue: {
            type: Number,
            default: 0
        },
        saturation: {
            type: Number,
            default: 0
        },
        lightness: {
            type: Number,
            default: 0
        },
        alpha: {
            type: Number,
            default: 1
        }
    },
    computed: {
        screenStyle() {
            return `
                background-color: hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha});
            `
        }
    }
}
</script>

<style lang="stylus" scoped>
    .color-screen
        // background red
        height 100vh
        width 100vw
        position fixed
        top 0
        left 0
        z-index -1
</style>
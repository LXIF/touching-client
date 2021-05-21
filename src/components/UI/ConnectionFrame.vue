<template>
    <div class='frame' :class="connected ? 'frame-connected' : 'frame-disconnected'">
        <h1 class='center-label' v-if='!connected'>connection lost...</h1>
    </div>
</template>

<script>
export default {
    computed: {
        connected() {
            return this.$store.getters['connected']
        }
    }
}
</script>

<style lang="stylus" scoped>
    .frame
        background transparent
        position fixed
        top 0
        left 0
        height 100vh
        width 100vw
        pointer-events none
        box-shadow 0 0 10px #fff
        display grid
        grid-template-rows 1fr 30px 1fr
        z-index -1

    .frame-connected
        box-shadow inset 0 0 30px rgba(255,255,255,0.5)

    .frame-disconnected
        box-shadow inset 0 0 30px #f00

    .center-label
        text-align center
        grid-row 2/3
        margin 0
        animation heartbeat 2s infinite
    
</style>
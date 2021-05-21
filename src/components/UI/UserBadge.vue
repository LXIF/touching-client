<template>
    <div class='user-badge'>
        <div :class='{"on": user.audioStarted}' class='audio indicator'></div>
        <div :class='{"on": user.touching}' class='touching indicator'></div>
        <!-- {{user}} -->
    </div>
</template>

<script>
export default {
    props: ['user'],
}
</script>

<style lang="stylus" scoped>
    .user-badge
        background: transparent 
        border 1px solid white
        border-radius 20px
        display flex
        height 30px
        width 55px
        align-items center
        justify-content space-evenly

    .indicator
        border 1px solid white
        height 20px
        width 20px
        border-radius 10px

    .on
        background-color green
</style>
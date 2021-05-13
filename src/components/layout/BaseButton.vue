<template>
    <button>
        <slot></slot>
    </button>
</template>

<style lang="stylus" scoped>
    button
        border-radius radius-buttons
        font-size 2rem
        padding 0 20px
        border none
        background transparent 
        box-shadow 0 0 5px #000
        transition all 0.3s
        color color-light
        &:hover
            box-shadow 0 0 20px #0f0
            outline none
</style>
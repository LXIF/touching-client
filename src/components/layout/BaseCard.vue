<template>
    <div class='base-card'>
        <slot></slot>
    </div>
</template>

<style lang="stylus" scoped>
    .base-card
        border 1px solid color-medium-light
        margin 5px
        padding 10px 20px 20px
        box-size border-box
        border-radius radius-containers
</style>
<template>
    <base-card>
    <h2>hi where are u</h2>
        <form @submit.prevent='submitInit'>
            <label for="x">X: </label>
            <input type="text" name='x' v-model.number='x' />
            <label for="x">Y: </label>
            <input type="text" name='y' v-model.number='y' />
            <base-button>SUBMIT</base-button>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            x: 0,
            y: 0
        }
    },
    methods: {
        submitInit() {
            this.$store.dispatch('setPosition', {
                x: this.x,
                y: this.y
            });
            this.$store.dispatch('setId', {
                id: 'user'
            });
            localStorage.setItem('x', this.x);
            localStorage.setItem('y', this.y);
            localStorage.setItem('id', 'user');
            this.$router.replace('/');
        }
    }
}
</script>

<style lang="stylus" scoped>
    input
        width 100%
        box-sizing border-box
        outline none
        border-radius radius-containers
        border 1px solid green
        font-size 2rem
        padding 0 20px
        margin 10px 0
        &:focus
            box-shadow 0 0 5px #0f0

    button
        margin-top 10px
</style>
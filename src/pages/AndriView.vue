<template>
    <div class='andri-card'>
        <div class='andri'>
            <h1>local presence</h1>
            <xy-pad :users='getUsers' id='presence-xy' @presence='sendPresence' :radius='presenceRadius' />
            <label>radius</label>
            <base-fader v-model='presenceRadius' />
            <label>saturation</label>
            <h3>global weather</h3>
            <label>hue</label>
            <base-fader />
            <label>saturation</label>
            <base-fader />
            <label>value</label>
            <base-fader />
        </div>
    </div>
</template>

<script>
import XyPad from '../components/UI/XyPad'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        XyPad
    },
    data() {
        return {
            presenceRadius: 10
        }
    },
    methods: {
        ...mapActions(['sendPresence'])
    },
    computed: {
        ...mapGetters(['getUsers'])
    }
}
</script>

<style lang="stylus" scoped>
.andri-card
    max-width 400px
</style>
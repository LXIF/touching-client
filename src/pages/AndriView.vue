<template>
    <div>
        ANDRIVIEW
        <xy-pad id='presence-xy' @position='setPresencePosition' />
    </div>
</template>

<script>
import XyPad from '../components/UI/XyPad'

export default {
    components: {
        XyPad
    },
    methods: {
        setPresencePosition(position) {
            console.log(position);
            
        }
    }
}
</script>
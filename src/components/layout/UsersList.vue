<template>
    <div>
        <user-badge v-for='(user, index) in users' :user='user' :key='index' />
    </div>
</template>

<script>
import UserBadge from '../UI/UserBadge'

export default {
    props: ['users'],
    components: {
        UserBadge
    },
}
</script>
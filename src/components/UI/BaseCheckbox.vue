<template>
    <div>
        <div class='custom-checkbox' @click='toggleCheckbox'>
            <span class='custom-checkmark' v-if='modelValue'>&#10004;&#xFE0E;</span>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],
    methods: {
        toggleCheckbox() {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }

}
</script>

<style scoped>
    .checkbox {
        width: 2rem;
        height: 2rem;
        opacity: 0;
        position: fixed;
        right: -5px;
        z-index: 1;

    }
    .custom-checkbox {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        background: transparent;
        outline: none;
        border: 2px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-2px);

    }
    .custom-checkmark {
        color: red;
        transform: translateY(-1px);
        font-size: 1.8rem;
        user-select: none;
    }
</style>
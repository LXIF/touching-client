<template>
    <path :d='circlePath' :id='pathId' />
</template>

<script>
export default {
    props: ['cx', 'cy', 'r', 'pathId'],
    computed: {
        circlePath() {
            const d = `
                M ${this.cx - this.r}, ${this.cy}
                a ${this.r}, ${this.r} 0 1,0 ${this.r * 2}, 0
                a ${this.r}, ${this.r} 0 1,0 ${-(this.r * 2)}, 0
            `;
            return d;
        }
    }
}
</script>
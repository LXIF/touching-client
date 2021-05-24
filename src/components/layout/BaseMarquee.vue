<template>
    <div class='marquee-container'>
        <svg :id='svgId'  height='100%' width='100%'>
            <path :id='pathId' d="
            M 60,30
            L 300, 30
            Q 330, 30, 330, 60
            L 330, 600
            Q 330, 630, 300, 630

            L 60, 630
            Q 30, 630, 30, 600

            L 30, 60
            Q 30, 30, 60, 30
            z"
            stroke='none'
            fill='none'
            />
            <text font-family='var(--main-font)' fill='white' font-size='1800'>
                <textPath :id='pathId + "-text-1"' :href="'#' + pathId" startOffset='0%' :textLength='pathLength' lengthAdjust='spacingAndGlyphs'>
                {{ marqueeText }}
                </textPath>
            </text>
            <text font-family='var(--main-font)' fill='white' font-size='1800'>
                <textPath :id='pathId + "-text-2"' :href="'#' + pathId" startOffset='0%' :textLength='pathLength' lengthAdjust='spacingAndGlyphs'>
                {{ marqueeText }}
                </textPath>
            </text>
        </svg>
    </div>
</template>

<script>
export default {
    props: ['svgId', 'text'],
    data() {
        return {
            margin: 20,
            borderRadius: 40,
            speed: 0.05,

            offset: 0,
            textPath: null,
            pathLength: 2000,
            animationFrame: null,
            animating: false
        }
    },
    computed: {
        pathId() {
            return this.svgId + '-path'
        },
        marqueeText() {
            const marqueeText = this.text.slice(1) +
            this.text +
            this.text +
            this.text +
            this.text +
            this.text.slice(0, 1);
            return marqueeText
        }
    },
    methods: {
        setPath() {
            const boundingRect = document.getElementById(this.svgId).getBoundingClientRect();
            const height = boundingRect.height * 100;
            const width = boundingRect.width * 100;
            const margin = this.margin * 100;
            const borderRadius = this.borderRadius * 100;

            document.getElementById(this.svgId).setAttribute('viewBox', `0 0 ${width} ${height}`);
            
            const path = `
                M ${borderRadius * 2}, ${margin}
                L ${width - borderRadius * 2}, ${margin}
                Q ${width - margin}, ${margin}, ${width - margin}, ${borderRadius * 2}
                L ${width - margin}, ${height - borderRadius * 2}
                Q ${width - margin}, ${height - margin}, ${width - borderRadius * 2}, ${height - margin}
                L ${borderRadius * 2}, ${height - margin}
                Q ${margin}, ${height - margin}, ${margin}, ${height - borderRadius * 2}
                L ${margin}, ${2 * borderRadius}
                Q ${margin}, ${margin}, ${2 * borderRadius}, ${margin}
            `

            document.getElementById(this.pathId).setAttribute('d', path);
        },
        animate() {
            this.offset += this.speed;
            if(this.offset > 100) {
                this.offset = 0;
            }
            if(this.animating) {
                document.getElementById(this.pathId + '-text-1').setAttribute('startOffset', `${this.offset}%`);
                document.getElementById(this.pathId + '-text-2').setAttribute('startOffset', `${this.offset - 100}%`);
                window.requestAnimationFrame(this.animate);
            }
        },
        onWindowResize() {
            this.setPath();
            this.setPathLength();
        },
        setPathLength() {
            this.pathLength = this.textPath.getTotalLength();
            // console.log(this.pathLength);
        }
    },
    mounted() {
        setTimeout(() => {
            this.setPath();
            this.textPath = document.getElementById(this.pathId);
            this.setPathLength();
        },100);
        this.animating = true;
        this.animationFrame = window.requestAnimationFrame(this.animate);
        window.addEventListener( 'resize', this.onWindowResize );
    },
    beforeUnmount() {
        window.removeEventListener( 'resize', this.onWindowResize );
        window.cancelAnimationFrame(this.animationFrame);
        this.animating = false;
    }
}
</script>

<style scoped>
    .marquee-container {
        height: 100%;
        width: 100%;
        border-radius: 40px;
        animation: heartbeat 1.3s infinite ease-in-out;
        position: absolute;
        pointer-events: none;
        z-index: 1;
    }
    svg {
        /* background-color: tomato; */
        height: 100%;
        width: 100%;
        border-radius: 40px;
        pointer-events: none;
    }
    .marquee-text {
        color: black;
        pointer-events: none;
    }

    @keyframes heartbeat {
        0% {
            transform: scale(0.99);
        }
        40% {
            transform: scale(1)
        }
        48% {
            transform: scale(1.01);
        }
        55% {
            transform: scale(1);
        }
        63% {
            transform: scale(1.01);
        }
        70% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.99);
        }
    }
</style>
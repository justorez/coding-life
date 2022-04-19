const intro = {
    template: `
        <teleport to="body">
            <div 
                class="intro-overlay" 
                :style="overlayStyle"
                @click="close"
            ></div>
            <div 
                class="intro-helper-layer" 
                :style="helperLayerStyle"
                @click="handleClickItem"
            >
                <div class="intro-tooltip" :style="tooltipStyle"></div>
            </div>
        </teleport>
    `,
    props: {
        message: String,
        selector: String
    },
    emits: ['click-item'],
    data() {
        return {
            show: true,
            react: {}
        }
    },
    computed: {
        overlayStyle() {
            return {
                display: this.show ? 'block' : 'none',
                position: 'fixed',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                zIndex: 9999998
            }
        },
        helperLayerStyle() {
            return {
                display: this.show ? 'block' : 'none',
                position: 'fixed',
                boxShadow: '0px 0px 0px 5000px rgba(33,33,33,.5)',
                borderRadius: '50%',
                zIndex: 9999999,
                transition: 'all .3s ease-out',
                width: `${this.react.width}px`,
                height: `${this.react.height}px`,
                top: `${this.react.top}px`,
                left: `${this.react.left}px`,
            }
        },
        tooltipStyle() {
            return {

            }
        }
    },
    watch: {
        selector(val) {
            if (val) this.getTarget()
        }
    },
    mounted() {
        this.getTarget()
    },
    methods: {
        async getTarget() {
            await this.$nextTick()
            const el = document.querySelector(this.selector)
            if (el) {
                this.react = el.getBoundingClientRect()
            }
        },
        close() {
            this.show = false
        },
        handleClickItem() {
            this.$emit('click-item')
        }
    }
}

export default {
    install(app) {
        app.component('intro', intro)
    }
}

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import BaseCard from './components/layout/BaseCard'
import BaseButton from './components/layout/BaseButton'
import BaseFader from './components/UI/BaseFader'
import BaseSwipe from './components/UI/BaseSwipe'
import ConnectionFrame from './components/UI/ConnectionFrame'
import BaseSwiper from './components/UI/BaseSwiper'

createApp(App)

.component('base-card', BaseCard)
.component('base-button', BaseButton)
.component('base-fader', BaseFader)
.component('base-swipe', BaseSwipe)
.component('connection-frame', ConnectionFrame)
.component('base-swiper', BaseSwiper)

.use(router)
.use(store)
.mount('#app')

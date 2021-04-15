import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import BaseCard from './components/layout/BaseCard'
import BaseButton from './components/layout/BaseButton'
import BaseFader from './components/UI/BaseFader'

createApp(App)

.component('base-card', BaseCard)
.component('base-button', BaseButton)
.component('base-fader', BaseFader)

.use(router)
.use(store)
.mount('#app')

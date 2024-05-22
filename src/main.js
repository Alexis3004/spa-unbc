import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.css'
import '@/assets/scss/errors.scss'

// sweetalert2
import '@/assets/scss/SweetAlert/sweetalert2.scss'
import '@/assets/scss/SweetAlert/variables.scss'
import Swal from 'sweetalert2/dist/sweetalert2'

// icons
import 'material-icons/iconfont/material-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

window.Swal = Swal

// floating-vue
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(FloatingVue, {
    themes: {
        'info-tooltip': {
            $extend: 'tooltip',
            triggers: ['hover'],
            autoHide: true
        }
    }
})

app.use(router)
app.use(pinia)

app.mount('#app')

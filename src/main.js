import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

// import '@/assets/styles.scss'
// import '@/assets/tailwind.css'

const app = createApp(App)


app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
})

// Add PrimeVue services
app.use(ToastService)
app.use(ConfirmationService)

// Mount the app
app.mount('#app')
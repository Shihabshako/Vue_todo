import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css';
import 'vue2-animate/dist/vue2-animate.min.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

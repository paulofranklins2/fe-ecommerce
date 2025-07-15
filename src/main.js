import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

window.axios = require('axios')

window.axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
});

createApp(App).use(router).mount('#app')

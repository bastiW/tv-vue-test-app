import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'boxicons/css/boxicons.min.css'
import dayjs from "dayjs";
import 'element-scroll-polyfill';
import {keyboardScroll} from "@/directives/keyboardScroll";


let app = createApp(App)
app.use(router)
app.directive('keyboardScroll', keyboardScroll)
app.mount('#app')



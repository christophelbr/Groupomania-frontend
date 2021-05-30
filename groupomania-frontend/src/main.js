import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import {VeeValidate} from '../node_modules/vee-validate/dist/vee-validate';
//import Vue from '../node_modules/vue/dist/vue.cjs.js'



import 'bootstrap/dist/css/bootstrap.min.css'

//Vue.use(VeeValidate);
createApp(App).use(store).use(router).mount('#app');


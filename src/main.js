import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'babel-polyfill'

import '@/utils/element.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import '@/assets/css/reset.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

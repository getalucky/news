import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
import {
  Toast
} from 'vant';


// 配置axios
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$axios = axios;
// 配置vant
Vue.use(Vant);
// 提示框
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
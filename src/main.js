import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
import {
  Toast,
  Uploader,
  Dialog,
  Field,
  ActionSheet
} from 'vant';


// 配置axios
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$axios = axios;
// 配置vant
Vue.use(Vant);
// 提示框
Vue.use(Toast);
// 上传图片组件
Vue.use(Uploader);
// 注册模态框
Vue.use(Dialog);
// 注册输入框
Vue.use(Field);
// 注册上拉菜单
Vue.use(ActionSheet);
// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/personal") {
    const local = JSON.parse(localStorage.getItem('userInfo')) || [];
    if (local.length != 0) {
      next();
    } else {
      next('/login');
    }

  } else {
    next();

  }

})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
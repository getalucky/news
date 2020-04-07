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

// 申明实例对象
let app;

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
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // console.log(error.response);
  const {
    data
  } = error.response;
  // 对响应错误做点什么
  if (data.statusCode === 400) {
    Toast.fail(data.message);
  } else if (data.statusCode === 403) {
    Toast.fail(data.message);
    app.$router.push({
      path: '/login',
      query: {
        return_url: app.$route.path
      }
    });
  }
  return Promise.reject(error);
});
// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.intercept) {
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

app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
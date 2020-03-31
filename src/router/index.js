import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入首页面的组件
import index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    component: index
  },
  // 登录页
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  // 注册页
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  // 个人中心页
  {
    path: '/personal',
    component: () => import('@/views/Personal')
  },
  // 编辑资料页
  {
    path: '/editprofile',
    component: () => import('@/views/EditProfile')
  },
  // 我的关注页
  {
    path: '/follow',
    component: () => import('@/views/Follow')
  },
  // 我的跟帖
  {
    path: '/comments',
    component: () => import('@/views/Comments')
  },
  // 我的收藏
  {
    path: '/collect',
    component: () => import('@/views/Collect')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
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
    component: () => import('@/views/Personal'),
    meta: {
      intercept: true
    }
  },
  // 编辑资料页
  {
    path: '/editprofile',
    component: () => import('@/views/EditProfile'),
    meta: {
      intercept: true
    }
  },
  // 我的关注页
  {
    path: '/follow',
    component: () => import('@/views/Follow'),
    meta: {
      intercept: true
    }
  },
  // 我的跟帖
  {
    path: '/comments',
    component: () => import('@/views/Comments'),
    meta: {
      intercept: true
    }
  },
  // 我的收藏
  {
    path: '/collect',
    component: () => import('@/views/Collect'),
    meta: {
      intercept: true
    }
  },
  // 栏目管理
  {
    path: '/columnsorting',
    component: () => import('@/views/ColumnSorting'),
  },
  // 搜索页
  {
    path: '/search',
    component: () => import('@/views/Search'),
  },
  // 文字类新闻
  {
    path: '/news/:id',
    component: () => import('@/views/News'),
  },
  // 视频新闻内容页
  {
    path: '/videoNews/:id',
    component: () => import('@/views/VideoNews'),
  },
  // 新闻回帖
  {
    path: '/returncard/:id',
    component: () => import('@/views/ReturnCard'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
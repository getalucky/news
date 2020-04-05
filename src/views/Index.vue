<template>
  <div class="w">
    <!-- 头部 -->
    <header class="header">
      <i class="iconfont iconnew"></i>
      <span @click="$router.push('/search')">
        <i class="iconfont icon-right serach">搜索新闻</i>
      </span>
      <router-link to="/personal">
        <i class="iconfont icon-yonghu"></i>
      </router-link>
    </header>
    <!-- 标签栏 -->
    <van-tabs v-model="active" sticky>
      <!-- 显示内容标签 -->
      <van-tab v-for="(item,index) in tabs" :title="item.name" :key="index"></van-tab>
      <!-- 最后一个显示箭头 -->
      <!-- <van-tab title=">" @click="touch"></van-tab> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <newslist :userCollect="list" />
      </van-list>
    </van-tabs>
  </div>
</template>

<script>
import newslist from "@/components/NewsList";

export default {
  data: function() {
    return {
      // tab栏信息
      tabList: [],
      tabs: [],
      // 显示点击的tab下标
      active: 0,
      // 加载需要的变量
      loading: false,
      finished: false,
      list: []
    };
  },
  watch: {
    active: function() {
      // console.log(this.active);
      if (this.active == this.tabs.length - 1) {
        this.$router.push("/columnsorting");
        return;
      }
      // 重置页面的加载数据
      this.loading = this.tabList[this.active].loading;
      this.finished = this.tabList[this.active].finished;
      if (this.tabList[this.active].postList.length == 0) {
        const postData = {
          url: "/post",
          params: {
            pageIndex: this.tabList[this.active].pageIndex,
            pageSize: 5,
            category: this.tabList[this.active].id
          }
        };
        // 请求文章列表
        this.getPosts(postData);
      } else {
        this.list = this.tabList[this.active].postList;
      }
    }
    // tabs() {
    //   console.log(this.tabs);
    // }
  },
  components: {
    newslist
  },
  methods: {
    // 加载设置
    onLoad() {
      if (this.finished) return;
      // console.log(this.tabList);
      this.tabList[this.active].pageIndex++;
      const postData = {
        url: "/post",
        params: {
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: 5,
          category: this.tabList[this.active].id
        }
      };
      // 是关注栏请求需要添加请求头
      if (this.tabList[this.active].id == 0) {
        // 获取本地用户信息
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        postData.headers = { Authorization: userInfo.token };
      }
      this.$axios(postData).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.tabList[this.active].postList = [
          ...this.tabList[this.active].postList,
          ...data
        ];
        // 将数据渲染上页面
        this.list = this.tabList[this.active].postList;
        // 加载设置为false
        this.tabList[this.active].loading = false;
        // 将页面的loading赋值
        this.loading = this.tabList[this.active].loading;
        // 如果收到的数据等于总数据的长度，显示没有了
        if (this.tabList[this.active].postList.length == total)
          this.tabList[this.active].finished = true;
        this.finished = this.tabList[this.active].finished;
      });
    },
    // 请求列表信息并保存到本地
    getCategory(data) {
      this.$axios(data).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.tabList = data;
        this.setAtt();
        this.tabList.push({ name: ">" });
        localStorage.setItem("category", JSON.stringify(this.tabList));
        // 显示筛选后的tab列表
        this.getTab();
      });
    },
    // 请求文章列表并渲染到页面
    getPosts(data) {
      this.$axios(data).then(res => {
        // console.log(res);
        this.tabList[this.active].postList = res.data.data;
        // 拿出数据给list渲染页面
        this.list = this.tabList[this.active].postList;
      });
    },
    //给每个tab对象里添加：存储列表新闻的属性
    setAtt() {
      this.tabList = this.tabList.map(item => {
        item.postList = [];
        item.loading = false;
        item.finished = false;
        item.pageIndex = 1;
        item.scrollTop = 0;
        return item;
      });
    },
    //提出显示的列表数组
    getTab() {
      this.tabs = this.tabList.filter(item => {
        if (item.is_top == 1 || item.name == ">") return item;
      });
    }
  },
  mounted: function() {
    // 获取本地的tab栏数据
    const category = JSON.parse(localStorage.getItem("category"));
    // 获取本地用户信息
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //申请tab数据的对象
    const tabData = { url: "/category" };
    // 判断本地有没有列表数据
    if (category) {
      // 先判断tab栏数据对不对
      // 登录，却第一个不显示关注重新请求
      if (
        (category[0].id == "999" && userInfo) ||
        (category[0].id == "0" && !userInfo)
      ) {
        // 在登录状态传给axios的对象添加请求头
        if (userInfo) tabData.headers = { Authorization: userInfo.token };

        // 重新申请tab栏
        this.getCategory(tabData);
        // 申请新闻列表对象
        // 因为上面重新请求tab数据需要时间，所以要定时器缓冲一下
        setTimeout(() => {
          const postData = {
            url: "/post",
            params: { pageSize: 5, category: this.tabList[this.active].id }
          };
          if (userInfo) postData.headers = { Authorization: userInfo.token };
          // 申请数据
          this.getPosts(postData);
          return;
        }, 20);
      }
      //  有 直接拿本地的渲染
      this.tabList = category;
      this.getTab();
      // 申请页面数据
      const postData = {
        url: "/post",
        params: { pageSize: 5, category: this.tabList[this.active].id }
      };
      if (userInfo) postData.headers = { Authorization: userInfo.token };
      this.getPosts(postData);
    } else {
      // 申请文章列表的对象
      const postData = { url: "/post", params: { pageSize: 5, category: 999 } };
      //没有 向后台申请
      this.getCategory(tabData);
      this.getPosts(postData);
    }
  }
};
</script>

<style scoped lang='less'>
@import url("//at.alicdn.com/t/font_1726666_yyd4m3ikifd.css");
.w {
  width: 25rem;
  margin: auto;
  .header {
    position: relative;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding-left: 0.902778rem;
    height: 3.472222rem;
    background: #ff0000;
    color: #fff;
    .iconnew {
      font-size: 3.333333rem;
      line-height: 0;
    }
    .serach {
      display: block;
      margin-left: 1.041667rem;
      width: 14.583333rem;
      height: 2.430556rem;
      line-height: 2.430556rem;
      text-align: center;
      font-size: 0.972222rem;
      border-radius: 2.430556 / 2rem;
      background: rgba(255, 255, 255, 0.5);
    }
    .icon-yonghu {
      margin-left: 2.152778rem;
      font-size: 1.666667rem;
    }
  }
  /deep/ .van-tabs__wrap {
    padding-right: 3.819444rem;
    .van-tabs__nav {
      background: #e4e4e4;
      position: static;
    }
    // 隐藏下划线
    .van-tabs__line {
      display: none;
    }
    // 改变tab栏的字体大小
    .van-tab__text {
      font-size: 1.111111rem;
    }

    // 设置选中的元素加下划线
    .van-tab--active {
      border-bottom: 2px solid #ff0000;
    }
    .van-tab:nth-last-child(2) {
      position: absolute;
      right: 0;
      top: 0;
      width: 3.819444rem;
      background: inherit;
      span {
        display: block;
        transform: rotate(90deg);
        font-family: "宋体";
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
}
</style>
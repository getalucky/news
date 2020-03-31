<template>
  <div class="w">
    <!-- 头部 -->
    <header class="header">
      <i class="iconfont iconnew"></i>
      <span>
        <i class="iconfont icon-right serach">搜索新闻</i>
      </span>
      <router-link to="/personal">
        <i class="iconfont icon-yonghu"></i>
      </router-link>
    </header>
    <!-- 标签栏 -->
    <van-tabs v-model="active" sticky>
      <van-tab v-for="(item,index) in tabList" :title="item" :key="index">
        <newslist />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import newslist from "@/components/NewsList";

export default {
  data: function() {
    return {
      // tab栏信息
      // tabList:[]
      // 测试用
      tabList: [
        "军事",
        "游戏",
        "娱乐",
        "新闻",
        "国内",
        "国外",
        "本地",
        "关注",
        ">"
      ],
      active: 0
    };
  },
  components: {
    newslist
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
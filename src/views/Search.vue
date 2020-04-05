<template>
  <div class="w">
    <div class="search">
      <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      <!-- vant 搜索框开始 -->
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- vant 搜索框结束 -->
    </div>
    <div class="history">
      <h3>历史记录</h3>
      <ul>
        <li>
          <routet-link to="#">美女</routet-link>
        </li>
        <li>美女</li>
        <li>美女</li>
        <li>美女</li>
        <li>美女</li>
        <li>美女</li>
        <li>美女</li>
        <li>美女</li>
      </ul>
    </div>
    <!-- onsearch -->
    <div class="record onsearch">
      <ul>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
        <li>
          <span>花露水的妙用</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style scoped lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
.w {
  width: 25rem;
  margin: auto;
  .search {
    display: flex;
    justify-content: space-between;
    line-height: 3.472222rem;
    padding: 0 1.388889rem;
    /deep/ .van-search__content {
      border-radius: 1.388889rem;
      .van-field__control {
        width: 14.236111rem;
      }
    }
  }
  .history {
    position: relative;
    margin: 0.694444rem 1.388889rem;
    padding-bottom: 0.694444rem;
    border-bottom: 1px solid #ccc;
    h3 {
      margin-bottom: 0.694444rem;
      font-size: 0.972222rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0.694444rem 2.083333rem 0.694444rem 0;
      }
    }
  }
  .record {
    position: absolute;
    top: 68px;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    ul {
      height: 100%;
      overflow-y: auto;
      li {
        display: flex;
        justify-content: space-between;
        margin: 0 1.388889rem;
        border-bottom: 1px solid #ccc;
        line-height: 2.777778rem;
      }
    }
  }
  .onsearch {
    display: none;
  }
}
</style>
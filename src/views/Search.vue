<template>
  <div class="w">
    <div class="search">
      <i class="iconfont iconjiantou2" @click="$router.back()"></i>
      <!-- vant 搜索框开始 -->
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        :clearable="false"
        maxlength="15"
        autofocus="true"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- vant 搜索框结束 -->
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <h3>
        <span>历史记录</span>
        <i @click="clearHistory">×</i>
      </h3>
      <ul>
        <li v-for="(item,index) in searchHistory" :key="index" @click="enterSearch(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 显示搜索内容 -->
    <div class="record" :class="showSearch ? '': 'onsearch'">
      <ul>
        <li v-for="(item,index) in searchList" :key="index" @click="enterPost(item)">
          <span>{{item.title}}</span>
          <i class="iconfont iconjiantou1"></i>
        </li>
      </ul>
    </div>
    <!-- 显示搜索完的内容 -->
    <div class="record" :class="showSearched ? '': 'onsearch'">
      <newslist :userCollect="searchedList" />
    </div>
  </div>
</template>

<script>
import newslist from "@/components/NewsList";
export default {
  name: "search",
  data() {
    return {
      // 搜索的内容
      searchValue: "",
      // 是否展现搜索后的盒子
      showSearch: false,
      showSearched: false,
      // 搜索后的盒子的内容
      searchList: [],
      searchedList: [],
      // 搜索的历史
      searchHistory: []
    };
  },
  watch: {
    searchValue() {
      if (this.searchValue === "") {
        this.showSearch = false;
        this.showSearched = false;
        return;
      }
      this.$axios({
        url: "/post_search_recommend",
        params: {
          keyword: this.searchValue
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.searchList = data;
        this.showSearch = true;
      });
    }
  },
  methods: {
    onSearch() {
      // console.log(this.searchValue);
      if (this.searchValue === "") return;
      // 获取本地的历史搜索记录
      this.searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      this.searchHistory.unshift(this.searchValue);
      // 去重
      this.searchHistory = Array.from(new Set(this.searchHistory));
      // 讲历史记录添加到本地
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
      // 搜索文章
      this.getNews(this.searchValue);
      this.showSearch = false;
      this.showSearched = true;
      // this.showSearch = true;
    },
    // 搜索文章的方法
    getNews(searchValue) {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: searchValue
        }
      }).then(res => {
        const { data } = res.data;
        this.searchedList = data;
        // console.log(this.searchedList);
      });
    },
    // 清除历史搜索
    clearHistory() {
      this.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
    // 点击历史记录
    enterSearch(item) {
      this.searchValue = item;
      this.onSearch();
    },
    // 点击提示的列表
    enterPost(item) {
      console.log(item);
      if (item.type == 1) {
        this.$router.push({
          path: "/news/" + item.id,
          params: {
            id: item.id
          }
        });
      } else if (item.type == 2) {
        this.$router.push({
          path: "/videoNews/" + item.id,
          params: {
            id: item.id
          }
        });
      }
    }
  },
  mounted() {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    this.searchHistory = searchHistory;
  },
  components: {
    newslist
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/") {
        vm.searchValue = "";
        vm.showSearch = false;
        vm.showSearched = false;
      }
    });
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
    height: 3.472222rem;
    line-height: 3.472222rem;
    padding: 0 1.388889rem;
    i {
      line-height: 3.472222rem;
      font-size: 1.388889rem;
    }
    /deep/ .van-search__content {
      border-radius: 1.388889rem;
      .van-field__control {
        width: 13.888889rem;
      }
    }
  }
  .history {
    position: relative;
    margin: 0.694444rem 1.388889rem;
    padding-bottom: 0.694444rem;
    border-bottom: 1px solid #ccc;
    h3 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.694444rem;
      font-size: 0.972222rem;
      i {
        font-family: "黑体";
      }
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
    top: 4.166667rem;
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

        span {
          width: 90%;
          overflow: hidden;
          /*1. 先强制一行内显示文本*/

          white-space: nowrap;
          /*2. 超出的部分隐藏*/

          overflow: hidden;

          /*3. 文字用省略号替代超出的部分*/

          text-overflow: ellipsis;
        }
      }
    }
  }
  .onsearch {
    display: none;
  }
}
</style>
<template>
  <div class="w">
    <titleBar titleName="我的跟帖"></titleBar>
    <!-- 跟帖内容 -->
    <ul>
      <li class="commentsList" v-for="(item,index) in userComments" :key="index">
        <p class="time">{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</p>
        <!-- 前一级回复 -->
        <div class="parent" v-if="item.parent">
          <p>
            回复：
            <span>{{item.parent.user.nickname}}</span>
          </p>
          <p>{{item.parent.content}}</p>
        </div>
        <!-- 最新回复 -->
        <div class="content">{{item.content}}</div>
        <router-link to="#">
          <span>原文:{{item.post.title}}</span>
          <i class="iconfont iconjiantou1"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import titleBar from "@/components/Title";
import moment from "moment";
export default {
  data: function() {
    return {
      userComments: [],
      moment
    };
  },
  components: {
    titleBar
  },
  mounted: function() {
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_comments",
      headers: { Authorization: localStr.token }
    }).then(res => {
      this.userComments = res.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
.w {
  width: 25rem;
  margin: auto;
  .commentsList {
    padding: 1.388889rem;
    border-bottom: 1px solid #d7d7d7;
    font-size: 0.833333rem;
    .time {
      color: #b6a1a1;
    }
    .parent {
      margin: 1.041667rem 0;
      padding: 0.694444rem 0.347222rem;
      background: #e4e4e4;
      color: #b6a1a1;
      line-height: 2;
    }
    .content {
      margin: 1.041667rem 0;
    }
    > a {
      display: flex;
      justify-content: space-between;
      color: #b6a1a1;
      i {
        font-size: inherit;
      }
    }
  }
}
</style>
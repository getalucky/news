<template>
  <div class="reply">
    <!-- <input type="text" placeholder="写跟帖" /> -->
    <div class="input">写跟帖</div>
    <div>
      <!-- <van-icon name="chat-o" />
      <van-icon name="star-o" />-->
      <i class="iconfont icon-xinxi">
        <span>{{news.comment_length}}</span>
      </i>
      <i class="iconfont icon-shoucang" :class="star ? 'isstar' : ''" @click="starOperation"></i>
      <i class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
export default {
  // 需要文章id，新闻内容对象，收藏的状态
  data: function() {
    return {
      star: ""
    };
  },
  props: ["newsId", "news", "isstar"],
  methods: {
    // 收藏
    starOperation() {
      // 获取本地token
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || "";
      this.$axios({
        url: "/post_star/" + this.newsId,
        headers: { Authorization: token }
      }).then(res => {
        this.$toast(res.data.message);
        this.star = !this.star;
      });
    }
  },
  watch: {
    isstar: function() {
      this.star = this.isstar;
    }
  }
};
</script>

<style scoped lang="less">
@import url("//at.alicdn.com/t/font_1726666_atbd4bfyniq.css");

.reply {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0.694444rem 1.041667rem;
  background: #fff;
  .input {
    height: 2.083333rem;
    width: 11.805556rem;
    background: #d7d7d7;
    border-radius: 1.041667rem;
    margin-top: 0;
    padding-left: 0.694444rem;
    line-height: 2.083333rem;
  }
  div {
    margin-top: 0.902778rem;
    line-height: 0;
    i {
      font-size: 1.805556rem;
      margin-left: 1.388889rem;
      &:first-child {
        position: relative;
        font-size: 1.944444rem;
        span {
          position: absolute;
          right: -8px;
          top: -4px;
          width: 28px;
          height: 15px;
          text-align: center;
          line-height: 15px;
          color: #fff;
          border-radius: 7px;
          background: red;
          font-size: 12px;
        }
      }
    }
    .isstar {
      color: red;
    }
  }
}
</style>
<template>
  <div class="w">
    <div class="video">
      <video controls preload :src="this.$axios.defaults.baseURL + news.content"></video>
    </div>
    <div class="header">
      <div class="user">
        <span>
          <img :src="this.$axios.defaults.baseURL + news.user.head_img" alt />
        </span>
        <span>{{news.user.nickname}}</span>
      </div>
      <span
        class="follow"
        :class="isfollow? 'isfollow' : 'nofollow'"
        @click="follow"
      >{{isfollow ? '已关注' : '关注'}}</span>
    </div>
    <div class="content">{{news.title}}</div>
    <!-- 点赞，微信 -->
    <div class="icon">
      <span @click="like">
        <van-icon name="good-job-o" :class="islike ? 'islike' : ''" />
        {{news.like_length}}
      </span>
      <span>
        <i class="iconfont icon-weixin"></i>微信
      </span>
    </div>
    <!-- 精彩跟帖 -->
    <div class="comments">
      <h2>精彩跟帖</h2>
      <div class="acomments">
        <div>
          <div class="information">
            <span class="usericon">
              <img src alt />
            </span>
            <span class="username">
              <p>火星网友1</p>
              <p>2小时前</p>
            </span>
          </div>
          <span>回复</span>
        </div>
        <p>文章说的很有道理！</p>
      </div>
    </div>
    <reply :newsId="newsId" :news="news" :isstar="news.has_star"></reply>
  </div>
</template>

<script>
// 导入回复栏
import reply from "@/components/Reply";
export default {
  data: function() {
    return {
      // 文章id
      newsId: "",
      // 新闻信息
      news: { user: "" },
      // 判断是否收藏
      // isstar: true,
      // 判断是否关注
      isfollow: false,
      // 判断是否点赞
      islike: false
    };
  },
  mounted: function() {
    this.newsId = this.$route.params.id;
    // 获取本地token
    // 获取本地token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || "";
    let postData = {
      url: "/post/" + this.newsId
    };
    if (token) postData.headers = { Authorization: token };
    this.$axios(postData).then(res => {
      // console.log(res);
      this.news = res.data.data;
      // 获取关注的状态
      this.isfollow = res.data.data.has_follow;
      // 获取点赞状态
      this.islike = res.data.data.has_like;
      // 获取收藏状态
      this.isstar = res.data.data.has_star;
    });
  },
  methods: {
    // 关注
    follow() {
      // 获取本地token
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || "";
      if (!this.isfollow) {
        this.$axios({
          url: "/user_follows/" + this.news.user.id,
          headers: { Authorization: token }
        }).then(res => {
          console.log(res);
          this.$toast(res.data.message);
          // 改变样式
          this.isfollow = !this.isfollow;
        });
      } else {
        // 取消关注
        this.$axios({
          url: "/user_unfollow/" + this.news.user.id,
          headers: { Authorization: token }
        }).then(res => {
          this.$toast(res.data.message);
          // 改变样式
          this.isfollow = !this.isfollow;
        });
      }
    },
    // 点赞
    like() {
      // 获取本地token
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || "";
      this.$axios({
        url: "/post_like/" + this.newsId,
        headers: { Authorization: token }
      }).then(res => {
        // console.log(res);
        this.islike = !this.islike;
        if (this.islike) {
          this.news.like_length++;
        } else {
          this.news.like_length--;
        }
      });
    }
  },
  components: {
    reply
  }
};
</script>

<style lang='less' scoped>
@import url("//at.alicdn.com/t/font_1726666_atbd4bfyniq.css");
.w {
  width: 25rem;
  margin: auto;
  .video {
    video {
      width: 100%;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-top: 0.694444rem;
    padding: 0 1.041667rem;
    .user {
      display: flex;
      margin-top: 1px;
      span {
        height: 1.805556rem;
        line-height: 1.805556rem;
        &:first-child {
          overflow: hidden;
          width: 1.805556rem;
          height: 1.805556rem;
          border-radius: 0.902778rem;
          background: chartreuse;
          img {
            width: 100%;
          }
        }
        &:last-child {
          font-size: 0.833333rem;
          color: #a286a2;
          margin-left: 0.347222rem;
        }
      }
    }
    .follow {
      width: 4.444444rem;
      height: 1.736111rem;
      line-height: 1.736111rem;
      border-radius: 0.902778rem;
      text-align: center;
      font-size: 0.972222rem;
    }
    .isfollow {
      background: #fff;
      border: 1px solid #ccc;
      color: #000;
    }
    .nofollow {
      background: #ff0000;
      color: #fff;
    }
  }
  .content {
    padding: 24px 1.041667rem;
  }
  .icon {
    display: flex;
    justify-content: space-around;
    margin-top: 2.5rem;
    padding-bottom: 1.319444rem;
    border-bottom: 5px solid #e4e4e4;
    span {
      width: 5.555556rem;
      height: 2.083333rem;
      border: 1px solid #ccc;
      border-radius: 1.041667rem;
      text-align: center;
      line-height: 2.083333rem;
      i {
        margin: 0 3px;
      }
      .icon-weixin {
        color: #00c800;
      }
    }
    .islike {
      color: red;
    }
  }
  .comments {
    padding: 0 1.25rem;
    margin-top: 1.805556rem;
    h2 {
      margin-bottom: 1.527778rem;
      text-align: center;
      font-size: 1.180556rem;
      font-weight: 400;
    }
    .acomments {
      > div {
        display: flex;
        justify-content: space-between;
        .information {
          display: flex;
          .usericon {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            overflow: hidden;
            background: skyblue;
          }
          .username {
            margin-left: 8px;
            p:nth-child(2) {
              font-size: 12px;
              color: #707070;
            }
          }
        }
      }
      > p {
        padding: 22px 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
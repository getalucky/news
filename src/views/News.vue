<template>
  <div class="w">
    <div class="header">
      <span>
        <i class="iconfont iconjiantou2" @click="$router.back()"></i>
        <i class="iconfont iconnew"></i>
      </span>
      <span
        class="follow"
        :class="isfollow ? 'isfollow' : 'nofollow'"
        @click="follow"
      >{{isfollow ? '已关注' : '关注'}}</span>
    </div>
    <div class="news">
      <div class="title">
        <h3>{{news.title}}</h3>
        <div>
          <span class="author">{{news.user.nickname}}</span>
          <span class="time">{{moment(news.create_date).format('YYYY-MM-DD')}}</span>
        </div>
      </div>
      <div class="content" v-html="news.content"></div>
    </div>
    <div class="icon">
      <span @click="like">
        <van-icon name="good-job-o" :class="islike ? 'islike' : ''" />
        {{news.like_length}}
      </span>
      <span>
        <i class="iconfont icon-weixin"></i>微信
      </span>
    </div>
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
    <reply :newsId="newsId" :news="news" :isstar="isstar"></reply>
  </div>
</template>

<script>
import moment from "moment";
// 导入回复栏
import reply from "@/components/Reply";
export default {
  data: function() {
    return {
      // 判断是否关注
      isfollow: false,
      // 判断是否点赞
      islike: false,
      // 判断是否收藏
      isstar: false,
      // 新闻信息
      news: { user: "" },
      // 时间插件
      moment,
      // 作者的id
      authorId: "",
      // 文章id
      newsId: ""
    };
  },
  mounted: function() {
    // 获取新闻的id
    const { id } = this.$route.params;
    // 获取本地token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || "";
    let postData = {
      url: "/post/" + id
    };
    if (token) postData.headers = { Authorization: token };
    this.$axios(postData).then(res => {
      // console.log(res);
      // 渲染新闻
      this.news = res.data.data;
      // 获取作者id
      this.authorId = res.data.data.user.id;
      // 获取文章id
      this.newsId = res.data.data.id;
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
          url: "/user_follows/" + this.authorId,
          headers: { Authorization: token }
        }).then(res => {
          // console.log(res);
          this.$toast(res.data.message);
          // 改变样式
          this.isfollow = !this.isfollow;
        });
      } else {
        // 取消关注
        this.$axios({
          url: "/user_unfollow/" + this.authorId,
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

@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");

.w {
  width: 25rem;
  margin: auto;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
    height: 3.333333rem;

    span:first-child {
      display: flex;
      line-height: 3.333333rem;
      &:first-child {
        i:nth-child(2) {
          margin-left: 1.041667rem;
          font-size: 3.333333rem;
        }
      }
    }
    .follow {
      margin-top: 0.625rem;
      width: 4.444444rem;
      height: 1.736111rem;
      border-radius: 0.902778rem;
      text-align: center;
      line-height: 1.736111rem;
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
  .news {
    padding: 0.347222rem 1.25rem 0;
    .title {
      line-height: 1.5;
      div {
        color: #868686;
        .time {
          margin-left: 1.041667rem;
        }
      }
    }
    .content {
      margin-top: 28px;
      line-height: 2;
      /deep/ img {
        width: 100%;
      }
    }
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
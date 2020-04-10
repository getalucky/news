<template>
  <div class="w">
    <newstitle titleName="精彩回帖"></newstitle>
    <div class="comments" v-for="(item,index) in commentsList" :key="index">
      <div>
        <div class="user">
          <span>
            <img :src="$axios.defaults.baseURL + item.user.head_img" alt />
          </span>
          <span>
            <p>{{item.user.nickname}}</p>
            <p class="time">{{moment(item.create_date).startOf('day').fromNow()}}</p>
          </span>
        </div>
        <span class="returns" @click="reply(item)">回复</span>
      </div>
      <conmmentsparent v-if="item.parent" :data="item.parent" @reply="replyparent"></conmmentsparent>
      <div class="content">{{item.content}}</div>
    </div>
    <div class="reply" :class="isfocus ? 'isfocus' : ''">
      <van-field
        v-model="message"
        rows="1"
        type="textarea"
        :placeholder="replymessage"
        @focus="setfocus"
        @blur="setblur"
        ref="textarea"
      />
      <span @click="sendReply">发送</span>
    </div>
    <div :class="isfocus ? 'isfixedset' :'fixedset' "></div>
  </div>
</template>

<script>
import newstitle from "@/components/Title";
import conmmentsparent from "@/components/CommentsParent";
import moment from "moment";
export default {
  data: function() {
    return {
      // 品论列表
      commentsList: [],
      // 回复的当前页数
      newsIndex: 1,
      // 时间插件
      moment,
      // 回复的信息
      message: "",
      // 输入框是否获取焦点
      isfocus: false,
      // 文章id
      newsId: "",
      // 回复的提示
      replymessage: "请输入留言",
      // 回复的id
      replyId: ""
    };
  },
  methods: {
    // 输入框聚焦
    setfocus() {
      this.isfocus = true;
    },
    // 输入框失焦
    setblur() {
      this.isfocus = false;
    },
    // 点击发送
    sendReply() {
      if (this.message == "") return;
      // 因为失焦方法的缘故，需要定时器缓冲一下
      setTimeout(() => {
        // 获取本地token
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const data = {
          content: this.message
        };
        if (this.replyId) data.parent_id = this.replyId;
        this.$axios({
          method: "post",
          url: "/post_comment/" + this.newsId,
          headers: { Authorization: token },
          data: data
        }).then(res => {
          this.$toast(res.data.message);
          // 初始化页面信息
          this.message = "";
          this.replymessage = "请输入留言";
          this.replyId = "";
          // 重新请求页面评论
          this.$axios({
            url: "/post_comment/" + this.newsId
          }).then(res => {
            const { data } = res.data;
            this.commentsList = data;
          });
        });
      }, 50);
    },
    // 点击回复
    reply(item) {
      this.$refs.textarea.focus();
      this.replymessage = `回复${item.user.nickname}:`;
      this.replyId = item.id;
    },
    // 回复前几级
    replyparent(data) {
      this.replyId = data.id;
      this.$refs.textarea.focus();
      this.replymessage = `回复${data.user.nickname}:`;
    }
  },
  mounted: function() {
    //   设置时间的插件的格式化
    moment.locale("zh-cn");
    // 获取文章id
    const { id } = this.$route.params;
    this.newsId = id;
    this.$axios({
      url: "/post_comment/" + this.newsId
    }).then(res => {
      const { data } = res.data;
      this.commentsList = data;
    });
  },
  components: {
    newstitle,
    conmmentsparent
  }
};
</script>

<style scoped lang="less">
.w {
  width: 25rem;
  margin: auto;
  .comments {
    padding: 1.041667rem 1.041667rem;
    border-bottom: 1px solid #e4e4e4;
    > div:first-child {
      display: flex;
      justify-content: space-between;
      .user {
        display: flex;
        span {
          &:nth-child(1) {
            width: 2.5rem;
            height: 2.5rem;
            background: skyblue;
            border-radius: 1.25rem;
            overflow: hidden;
            margin-right: 0.347222rem;
            img {
              width: 100%;
            }
          }
          .time {
            color: #707070;
            font-size: 0.833333rem;
          }
        }
      }
      .returns {
        color: #707070;
      }
    }
    .content {
      margin-top: 1.041667rem;
    }
  }
  .reply {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    // height: 3.472222rem;
    line-height: 3.472222rem;
    border-top: 1px solid #ddd;
    background: #fff;
    /deep/ .van-cell {
      flex: 5;
      textarea {
        line-height: 2.083333rem;
        background: #d7d7d7;
        border-radius: 1.041667rem;
        padding-left: 0.555556rem;
      }
      element.style {
        height: 2.083333rem;
      }
    }
    span {
      flex: 1;
      width: 4.166667rem;
      height: 1.944444rem;
      line-height: 1.944444rem;
      text-align: center;
      color: #fff;
      border-radius: 0.972222rem;
      margin: 0.694444rem 0.694444rem 0 0;
      background: #ff0000;
    }
  }
  // 输入框聚焦
  .isfocus {
    /deep/ .van-cell {
      height: 140px;
      textarea {
        height: 120px !important;
      }
    }
    span {
      margin-top: 100px;
    }
  }
  // 输入框不聚焦
  .fixedset {
    width: 100%;
    height: 50px;
  }
  // 输入框聚焦
  .isfixedset {
    width: 100%;
    height: 140px;
  }

  /deep/.van-field--min-height .van-field__control {
    min-height: 0px !important;
  }
}
</style>
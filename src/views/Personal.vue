<template>
  <div class="w">
    <!-- 个人中心标题 -->
    <titleBar titleName="个人中心" show="1"></titleBar>
    <!-- 个人信息部分 -->
    <div class="header">
      <!-- 头像 -->
      <span>
        <img :src="this.$axios.defaults.baseURL + this.userInfo.head_img" alt="头像" />
      </span>
      <div>
        <!-- 用户信息 -->
        <div class="userContent">
          <span class="iconfont iconxingbienan blueIcon" v-if="this.userInfo.gender == 1"></span>
          <span class="iconfont iconxingbienv pinkIcon" v-if="this.userInfo.gender == 0"></span>
          <span>{{this.userInfo.nickname}}</span>
          <div class="time">{{moment(this.userInfo.create_date).format('YYYY-MM-DD')}}</div>
        </div>
        <!-- 右箭头 -->
        <router-link to="editprofile">
          <i class="iconfont iconjiantou1"></i>
        </router-link>
      </div>
    </div>
    <!-- 选项部分 -->
    <div class="sectedCard">
      <userlist
        v-for="(item,index) in selectCard"
        :key="index"
        :label="item.label"
        :note="item.note"
      ></userlist>
      <userlist label="退出" @click.native="exit" />
    </div>
  </div>
</template>

<script>
import userlist from "@/components/UserList";
import titleBar from "@/components/Title";
// 引入第三方的日期格式处理的工具库
import moment from "moment";
// vant
import { Dialog } from "vant";
export default {
  data: function() {
    return {
      selectCard: [
        { label: "我的关注", note: "关注的用户" },
        { label: "我的跟帖", note: "跟帖/回复" },
        { label: "我的收藏", note: "文章/视频" }
        // { label: "设置", note: "" }
      ],
      userInfo: {},
      moment
    };
  },
  components: {
    userlist,
    titleBar
  },
  mounted: function() {
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    let myUrl = "/user/" + localStr.user.id;
    this.$axios({
      headers: { Authorization: localStr.token },
      url: myUrl
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    exit: function() {
      Dialog.confirm({
        title: "提示",
        message: "确定要退出吗？"
      })
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang='less' scoped>
.w {
  width: 25rem;
  margin: auto;

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 9.027778rem;
    border-bottom: 5px solid #e4e4e4;
    > span {
      display: block;
      margin: 2.083333rem 0 0 1.666667rem;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      overflow: hidden;
      // background: blue;
      img {
        object-fit: contain;
        width: 100%;
      }
    }
    > div {
      position: relative;
      margin-top: 40px;
      width: 16.666667rem;
      font-size: 0.972222rem;
      .userContent {
        span:nth-child(1) {
          margin-right: 0.694444rem;
        }
        .blueIcon {
          color: blue;
        }
        .pinkIcon {
          color: palevioletred;
        }
        .time {
          margin-top: 0.694444rem;
          color: #b6a1a1;
          font-size: 0.833333rem;
        }
      }
      i {
        position: absolute;
        top: 1.041667rem;
        right: 0.694444rem;
      }
    }
  }
}
</style>
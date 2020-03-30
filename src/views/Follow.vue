<template>
  <div class="w">
    <titleBar titleName="我的关注"></titleBar>
    <!-- 关注的用户列表 -->
    <ul>
      <li class="myfollow" v-for="(item,index) in followUser" :key="index">
        <!-- 信息 -->
        <div>
          <!-- 头像 -->
          <span>
            <img :src="$axios.defaults.baseURL + item.head_img" alt />
          </span>
          <div>
            <p>{{item.nickname}}</p>
            <p>{{moment(item.create_date).format('YYYY-MM-DD')}}</p>
          </div>
        </div>
        <!-- 取消关注 -->
        <span @click="unfollow(item.id,index)">取消关注</span>
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
      followUser: [],
      moment
    };
  },
  mounted: function() {
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_follows",
      headers: { Authorization: localStr.token }
    }).then(res => {
      this.followUser = res.data.data;
    });
  },
  components: {
    titleBar
  },
  methods: {
    unfollow: function(id, index) {
      const localStr = JSON.parse(localStorage.getItem("userInfo"));
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: { Authorization: localStr.token }
      }).then(res => {
        this.followUser.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.w {
  width: 25rem;
  margin: auto;
  .myfollow {
    display: flex;
    justify-content: space-between;
    padding: 1.527778rem 1.388889rem;
    border-bottom: 1px solid #f2f2f2;

    > div {
      span {
        float: left;
        display: block;
        width: 2.777778rem;
        height: 2.777778rem;
        border-radius: 2.777778 / 2rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      div {
        float: left;
        margin-left: 1.041667rem;
      }
    }

    span {
      height: 2.083333rem;
      line-height: 2.083333rem;
      width: 5.069444rem;
      background: #e1e1e1;
      text-align: center;
      border-radius: 2.083333/2rem;
      color: #363636;
    }
  }
}
</style>
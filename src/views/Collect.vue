<template>
  <div class="w">
    <titleBar titleName="我的收藏"></titleBar>
    <!-- 收藏列表 -->
    <ul>
      <li>
        <router-link to="#">
          <!-- 只有一张图片的类型 -->
          <div
            class="colectList1"
            v-for="(item,index) in userCollect"
            :key="index"
            v-if="item.cover.length == 1"
          >
            <div>
              <h3>{{item.title}}</h3>
              <p>
                <span>{{item.user.nickname}}</span>
                <span>{{item.comments.length}}</span>
              </p>
            </div>
            <img :src="$axios.defaults.baseURL + item.cover[0].url" alt />
          </div>
          <!-- 有三张图片的类型 -->
          <div class="colectList2" v-else>
            <h3>标题</h3>
            <div>
              <img src="../assets/logo.png" alt />
              <img src="../assets/logo.png" alt />
              <img src="../assets/logo.png" alt />
            </div>
            <p>
              <span>火星时报</span>
              <span>50跟帖</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import titleBar from "@/components/Title";

export default {
  data: function() {
    return {
      userCollect: []
    };
  },
  components: {
    titleBar
  },
  mounted: function() {
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_star",
      headers: { Authorization: localStr.token }
    }).then(res => {
      this.userCollect = res.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
.w {
  width: 25rem;
  margin: auto;
  // 只有一张图片的布局
  .colectList1 {
    display: flex;
    justify-content: space-between;
    padding: 1.041667rem 0.694444rem;
    border-bottom: 1px solid #f2f2f2;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 1.111111rem;
        font-weight: 400;
      }
      p {
        font-size: 0.972222rem;
        color: #909090;
        span {
          margin-right: 1.111111rem;
        }
      }
    }
    img {
      flex-shrink: 0;
      width: 8.402778rem;
      height: 5.208333rem;
      object-fit: cover;
    }
  }
  .colectList2 {
    padding: 1.041667rem 0.694444rem;
    border-bottom: 1px solid #f2f2f2;
    h3 {
      font-size: 1.111111rem;
      font-weight: 400;
    }
    div {
      display: flex;
      padding: 0.347222rem 0;
      img {
        flex: 0 0 33%;
        height: 5.208333rem;
        object-fit: cover;
      }
    }
    p {
      font-size: 0.972222rem;
      color: #909090;
      span {
        margin-right: 1.111111rem;
      }
    }
  }
}
</style>
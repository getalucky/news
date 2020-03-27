<template>
  <div class="w">
    <!-- 标题初 -->
    <div class="title">
      <router-link to="/personal" class="iconfont iconjiantou2"></router-link>
      <h1>编辑资料</h1>
    </div>
    <!-- 头像 -->
    <div class="icon">
      <span>
        <img :src="$axios.defaults.baseURL + userInfo.head_img " alt="头像" />
      </span>
    </div>
    <div class="list">
      <userlist v-for="(item,index) in listtext" :key="index" :label="item.label" :note="item.note"></userlist>
    </div>
  </div>
</template>

<script>
import userlist from "@/components/UserList";
export default {
  data: function() {
    return {
      listtext: [
        { label: "昵称", note: "火星网友" },
        { label: "密码", note: "******" },
        { label: "性别", note: "男" }
      ],
      userInfo: {}
    };
  },
  components: {
    userlist
  },
  mounted: function() {
    //   获取本地的token
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    let myUrl = "/user/" + localStr.user.id;
    // 请求数据
    this.$axios({
      headers: { Authorization: localStr.token },
      url: this.$axios.defaults.baseURL + myUrl
    }).then(res => {
      // 拿出数据渲染页面
      const { data } = res.data;
      this.userInfo = data;
      this.listtext[0].note = data.nickname;
      this.listtext[1].note = data.password;
      this.listtext[2].note = data.gender == 1 ? "男" : "女";
    });
  }
};
</script>

<style scoped lang="less">
.w {
  width: 25rem;
  margin: auto;
  .title {
    display: flex;
    padding: 1.388889rem 0.833333rem 0;
    i {
      font-size: 1.25rem;
    }
    h1 {
      margin-left: 8.333333rem;
      font-size: 0.972222rem;
    }
  }
  .icon {
    height: 7.361111rem;
    display: flex;
    justify-content: center;
    margin-bottom: 2.430556rem;
    span {
      margin-top: 2.569444rem;
      width: 5rem;
      border-radius: 2.5rem;
      height: 5rem;
      overflow: hidden;
      background: #ccc;
      img {
        width: 100%;
      }
    }
  }
}
</style>
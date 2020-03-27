<template>
  <div class="w">
    <i class="logo iconfont iconnew"></i>
    <div class="login">
      <!-- <input type="text" placeholder="用户名 / 手机号码" />
      <input type="password" placeholder="密码" />
      <button>登录</button>-->
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.username"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.nickname"
          type="text"
          name="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
          <van-button round block type="info" native-type="submit">注册</van-button>
          <router-link to="/login" class="btnt">登录</router-link>
        </div>
      </van-form>
    </div>
    <i class="iconfont iconicon-test frok"></i>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/register",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$toast(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.w {
  width: 25rem;
  margin: auto;
  // background: blue;
}
div.w {
  position: relative;
}
.logo {
  display: flex;
  justify-content: center;
  padding-top: 4.0625rem;
  font-size: 7.875rem;
  line-height: 1;
  color: #d81e06;
}

.login {
  display: flex;
  // margin-top: 5.866667rem;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 2.8125rem;
    width: 19.6875rem;
    height: 3.125rem;
    border-radius: 1.5625rem;
    background: #cc3300;
    font-size: 1.125rem;
    color: #fff;
  }
  input {
    margin-bottom: 0.625rem;
    width: 19.6875rem;
    height: 3.125rem;
    font-size: 1.125rem;
    border-bottom: 0.0625rem solid #333;
  }
  .van-cell {
    padding: 0;
  }
  .btnt {
    display: block;
    margin-top: 0.347222rem;
    text-align: center;
    line-height: 3.125rem;
    height: 3.125rem;
  }
}
.frok {
  position: absolute;
  top: 1.5625rem;
  left: 1.5625rem;
  font-size: 1.5625rem;
}
</style>
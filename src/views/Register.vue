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
</style>
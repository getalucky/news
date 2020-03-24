<template>
  <div class="w">
    <i class="logo iconfont iconnew"></i>
    <div class="login">
      <input type="text" placeholder="用户名 / 手机号码" />
      <input type="password" placeholder="密码" />
      <button>登录</button>
    </div>
    <i class="iconfont iconicon-test frok"></i>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
.w {
  width: 22.5rem;
  margin: auto;
  // background: blue;
}
body {
  background: #f2f2f2;
}
.logo {
  display: flex;
  justify-content: center;
  margin-top: 3.75rem;
  font-size: 6rem;
  color: #d81e06;
}

.login {
  display: flex;
  // margin-top: 5.866667rem;
  flex-direction: column;
  margin-top: 3.125rem;
  align-items: center;
  button {
    margin-top: 2.1875rem;
    width: 20rem;
    height: 3rem;
    border-radius: 1.5rem;
    background: #cc3300;
    font-size: 0.533333rem;
    color: #fff;
  }
  input {
    background: inherit;
    width: 20rem;
    height: 3rem;
    font-size: 1.25rem;
    border-bottom: 1px solid #333;
  }
}
.frok {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 0.9375rem;
}
</style>
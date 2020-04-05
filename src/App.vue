<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
i {
  text-decoration: none;
}
img {
  vertical-align: bottom;
}
input,
button {
  border: 0;
}
input:focus,
button:focus {
  outline: none;
}

// 适配屏幕大小：320 ———— 799
@media screen and(min-width: 320px) and(max-width: 359px) {
  html {
    font-size: 12.8px;
  }
}
@media screen and(min-width: 360px) and(max-width: 374px) {
  html {
    font-size: 14.4px;
  }
}
@media screen and(min-width: 375px) and(max-width: 385px) {
  html {
    font-size: 15px;
  }
}
@media screen and(min-width: 386px) and(max-width: 392px) {
  html {
    font-size: 15.44px;
  }
}
@media screen and(min-width: 393px) and(max-width: 400px) {
  html {
    font-size: 16px;
  }
}
@media screen and(min-width: 401px) and(max-width: 414px) {
  html {
    font-size: 16.48px;
  }
}
@media screen and(min-width: 750px) and(max-width: 799px) {
  html {
    font-size: 30.72px;
  }
}
</style>

<template>
  <div class="personal">
    <i class="iconfont iconjiantou2" @click="$router.back()"></i>
    <h1>{{titleName}}</h1>
    <!-- 判断是否显示返回主页 -->
    <i class="iconfont iconshouye" v-if="show"></i>
    <i v-else class="iconfont iconshouye notShow"></i>
  </div>
</template>

<script>
export default {
  props: ["titleName", "show"]
};
</script>

<style lang='less' scoped>
.personal {
  display: flex;
  justify-content: space-around;
  line-height: 3.472222rem;
  border-bottom: 1px solid #e4e4e4;

  h1 {
    font-weight: normal;
    font-size: 1.25rem;
    margin: 0 2.083333rem;
  }
  i {
    font-size: 1.527778rem;
  }
}
.notShow {
  visibility: hidden;
}
</style>
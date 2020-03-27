<template>
  <router-link to="#">
    <span>{{label}}</span>
    <span>
      {{note}}
      <i class="iconfont iconjiantou1"></i>
    </span>
  </router-link>
</template>

<script>
export default {
  props: ["label", "note"],
  mounted: function() {}
};
</script>

<style lang="less" scoped>
a {
  display: flex;
  justify-content: space-between;
  padding: 0 1.736111rem;
  height: 3.472222rem;
  border-bottom: 1px solid #f2f2f2;
  line-height: 3.472222rem;
  font-size: 0.972222rem;
  span:nth-child(2) {
    color: #b6a1a1;
  }
}
</style>
<template>
  <div class="parent">
    <div class="parent_user">
      <div>
        <span>{{data.id}}</span>
        <span>{{data.user.nickname}}</span>
        <span>{{moment(data.create_date).startOf('day').fromNow()}}</span>
      </div>
      <div @click="onReply(data)">回复</div>
    </div>
    <div class="parent_content">{{data.content}}</div>
    <commentparent v-if="data.parent" :data="data.parent" @reply="onReply"></commentparent>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "commentparent",
  props: ["data"],
  data: function() {
    return { moment };
  },
  watch: {
    data() {}
  },
  methods: {
    onReply(data) {
      this.$emit("reply", data);
    }
  },
  mounted: function() {}
};
</script>

<style scoped lang="less">
.parent {
  margin: 1.041667rem 0 0;
  border: 1px solid #d7d7d7;
  padding: 1.388889rem 0 0;
  font-size: 0.833333rem;
  .parent_user {
    display: flex;
    justify-content: space-between;
    margin: 0 1.041667rem;
    div:first-child {
      span {
        margin-right: 0.347222rem;
        &:last-child {
          color: #707070;
        }
      }
    }
  }
  .parent_content {
    margin: 1.041667rem 1.041667rem;
  }
}
</style>
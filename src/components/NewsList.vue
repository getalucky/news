<template>
  <router-link to="#">
    <!-- 只有一张图片的类型 -->
    <div
      class="colectList1"
      v-for="(item,index) in userCollect"
      :key="index"
      v-if="item.cover.length == 1 && item.type == 1"
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
    <div class="colectList2" v-else-if="item.cover.length == 3 && item.type == 1">
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
    <!-- 有视频的类型 -->
    <div class="colectList3" v-else-if="item.type == 2">
      <h3>标题</h3>
      <div class="voide">
        <img src="../assets/logo.png" alt />
        <span class="iconfont icon-icon_play"></span>
      </div>
      <p>
        <span>火星时报</span>
        <span>50跟帖</span>
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["userCollect"],
  mounted: function() {
    console.log(this.userCollect);
  }
};
</script>

<style scoped lang='less'>
// 导入字体图标
@import url("//at.alicdn.com/t/font_1726666_1jvlndkmw1qh.css");
// 一张图片的额样式
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
// 有三张图片的样式
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
// 有视频的样式
.colectList3 {
  padding: 1.041667rem 0.694444rem;
  border-bottom: 1px solid #f2f2f2;
  h3 {
    font-size: 1.111111rem;
    font-weight: 400;
  }
  div {
    position: relative;
    width: 23.611111rem;
    height: 11.805556rem;
    margin: 0.833333rem auto;
    overflow: hidden;
    background: skyblue;
    img {
      width: 23.611111rem;
      height: 11.805556rem;
      object-fit: cover;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-3.819444/2rem, -3.819444/2rem);
      display: block;
      width: 3.819444rem;
      height: 3.819444rem;
      text-align: center;
      line-height: 3.819444rem;
      border-radius: 3.819444/2rem;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
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
</style>
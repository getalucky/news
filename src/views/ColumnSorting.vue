<template>
  <div class="w">
    <titleBar titleName="栏目管理"></titleBar>
    <div class="column_up">
      <h4>点击删除以下频道</h4>
      <div>
        <ul>
          <li
            v-for="(item,index) in upData"
            :class="[0,999].includes(item.id) ? 'notactive' : ''"
            :key="index"
            @click="delCloumn(item,index)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="column_down">
      <h4>点击添加以下频道</h4>
      <div>
        <ul>
          <li
            v-for="(item,index) in downData"
            :key="index"
            @click="addCloumn(item,index)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import titleBar from "@/components/Title";
export default {
  data() {
    return {
      upData: [],
      downData: []
    };
  },
  mounted: function() {
    //   获取本地数据
    const category = JSON.parse(localStorage.getItem("category"));
    // 分别取得is_top是0 或 1 的数组
    this.getIs_top1(category);
    this.getIs_top0(category);
  },
  //   组件摧毁后触发
  destroyed() {
    const category = [...this.upData, ...this.downData];
    // console.log(category);
    category.push({ name: ">" });
    localStorage.setItem("category", JSON.stringify(category));
  },
  methods: {
    //   获取is_top=1的数据
    getIs_top1(category) {
      this.upData = category.filter(item => {
        if (item.is_top == 1) return item;
      });
    },
    //   获取is_top=0的数据
    getIs_top0(category) {
      this.downData = category.filter(item => {
        if (item.is_top == 0) return item;
      });
    },
    // 添加标签
    addCloumn(item, index) {
      let changeData = this.downData.splice(index, 1);
      changeData[0].is_top = 1;
      this.upData.push(changeData[0]);
    },
    // 删除标签
    delCloumn(item, index) {
      if (item.id == 0 || item.id == 999) return;
      let changeData = this.upData.splice(index, 1);
      changeData[0].is_top = 0;
      this.downData.push(changeData[0]);
    }
  },
  components: {
    titleBar
  }
};
</script>

<style scoped lang='less'>
.w {
  width: 25rem;
  margin: auto;
  .column_up,
  .column_down {
    padding: 0.347222rem 0 0 1.041667rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      //   justify-content: ;
      margin: 1.388889rem 0;
      li {
        flex: 0 0 20%;
        text-align: center;
        font-size: 1.111111rem;
        padding: 0.694444rem 0;
        border: 1px solid #ccc;
        margin-bottom: 1.041667rem;
        margin-right: 1.041667rem;
      }
    }
  }
  h4 {
    font-size: 0.833333rem;
    font-weight: 400;
    color: #7b7a7a;
  }
  .notactive {
    background: #eee;
    color: #888;
  }
}
</style>
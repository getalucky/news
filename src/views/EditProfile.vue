<template>
  <div class="w">
    <!-- 标题栏 -->
    <titleBar titleName="编辑资料"></titleBar>
    <!-- 头像 -->
    <div class="icon">
      <span>
        <img :src="$axios.defaults.baseURL + userInfo.head_img " alt="头像" />
        <van-uploader :after-read="afterRead" class="uploader" />
      </span>
    </div>
    <!-- 标签栏 -->
    <div class="list">
      <!-- 昵称 -->
      <userlist
        label="昵称"
        :note="userInfo.nickname"
        @click.native="()=>{nickshow = true;nickname=userInfo.nickname}"
      ></userlist>
      <!-- 点击昵称弹出开始 -->
      <van-dialog v-model="nickshow" title="提示" show-cancel-button @confirm="affirmNick">
        <van-cell-group>
          <van-field v-model="nickname" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <!-- 点击昵称弹出结束 -->
      <!-- 密码 -->
      <userlist
        label="密码"
        note="******"
        @click.native="passshow = true;password = userInfo.password"
      ></userlist>
      <!-- 点击密码弹出开始 -->
      <van-dialog v-model="passshow" title="提示" show-cancel-button @confirm="affirmPass">
        <van-cell-group>
          <van-field v-model="password" placeholder="请输入密码" type="password" />
        </van-cell-group>
      </van-dialog>
      <!-- 点击密码弹出结束 -->
      <!-- 性别 -->
      <userlist label="性别" :note="['女','男'][userInfo.gender]" @click.native="sexshow = true"></userlist>
      <van-action-sheet
        v-model="sexshow"
        :actions="actions"
        @select="onSelect"
        close-on-click-action
      />
    </div>
  </div>
</template>

<script>
import userlist from "@/components/UserList";
import titleBar from "@/components/Title";
export default {
  data: function() {
    return {
      // 返回回来的用户数据
      userInfo: {},
      // 上拉栏选项
      actions: [
        { name: "女", value: 0 },
        { name: "男", value: 1 }
      ],
      // 显示昵称修改框
      nickshow: false,
      // 显示密码修改框
      passshow: false,
      // 显示性别选择框
      sexshow: false,
      // 显示用户的昵称
      nickname: "",
      // 显示用户的密码
      password: ""
    };
  },
  components: {
    userlist,
    titleBar
  },
  mounted: function() {
    //   获取本地的token
    const localStr = JSON.parse(localStorage.getItem("userInfo"));
    let myUrl = "/user/" + localStr.user.id;
    // 请求数据
    this.$axios({
      headers: { Authorization: localStr.token },
      url: myUrl
    }).then(res => {
      // 拿出数据渲染页面
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
      this.password = data.password;
    });
  },
  methods: {
    // 更换头像触发的事件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const iconFile = file.file;
      let formdata = new FormData();
      // 将文件加入formdata
      formdata.append("file", iconFile);
      // 获取用户的token
      const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
      this.$axios({
        method: "post",
        url: "/upload",
        headers: { Authorization: userToken },
        data: formdata
      }).then(res => {
        // 获取图片路径，将图片渲染到页面
        const iconUrl = res.data.data.url;
        this.userInfo.head_img = iconUrl;
        // 修改数据
        this.setProfile({ head_img: iconUrl });
      });
    },
    // 封装更改信息的方法
    setProfile(data) {
      // 获取id
      const userId = JSON.parse(localStorage.getItem("userInfo")).user.id;
      // 获取用户的token
      const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
      this.$axios({
        method: "post",
        url: "/user_update/" + userId,
        headers: { Authorization: userToken },
        data: data
      }).then(res => {
        this.$toast("修改成功");
      });
    },
    // 点击确定改变昵称的事件
    affirmNick() {
      this.setProfile({ nickname: this.nickname });
      this.userInfo.nickname = this.nickname;
    },
    // 点击确定改变密码
    affirmPass() {
      this.setProfile({ password: this.password });
      this.userInfo.password = this.password;
    },
    // 点击上拉菜单触发的事件
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.sexshow = false;
      this.setProfile({ gender: item.value });
      this.userInfo.gender = item.value;
    }
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
      position: relative;
      margin-top: 2.569444rem;
      width: 5rem;
      border-radius: 2.5rem;
      height: 5rem;
      overflow: hidden;
      // background: #ccc;
      img {
        width: 100%;
      }
      .uploader {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
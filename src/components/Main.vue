<template>
  <div class="root">
    <div
      v-bind:class="{
        menu: true,
        header1: true,
        visible:
          this.$store.state.config.isVisible &&
          !this.$store.state.config.adminShow,
      }"
    >
      <home-menu></home-menu>
    </div>
    <el-scrollbar
      id="scrollbar"
      ref="scrollbar"
      :height="scrollHeight"
      @scroll="scroll"
    >
      <div
        :class="{
          content: true,
          adminContent: this.$store.state.config.adminShow,
        }"
      >
        <router-view></router-view>
      </div>
      <div
        :class="{
          adminTail: this.$store.state.config.adminShow,
        }"
      >
        <home-tail></home-tail>
      </div>
    </el-scrollbar>
    <div class="tag"></div>
    <div class="dialog">
      <el-dialog
        v-model="this.$store.state.config.toLogin"
        title="请登录账号"
        :show-close="false"
        :before-close="handleClose"
        width="440px"
        align-center
      >
        <el-form :model="user">
          <el-form-item label="用户名" label-width="60px">
            <el-input
              v-model="this.$store.state.config.user.name"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码" label-width="60px">
            <el-input
              v-model="this.$store.state.config.user.password"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">返回 Home</el-button>
            <el-button type="primary" @click="login">登录</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/home/HomeMenu";
import HomeTail from "@/components/home/HomeTail.vue";

export default {
  name: "MainX",

  components: {
    HomeMenu,
    HomeTail,
  },

  computed: {
    getAdminShow() {
      return this.$store.state.config.adminShow;
    },
  },

  data() {
    return {
      // 菜单栏显示标识
      // isVisible: true,
      // 上一次滚动高度
      scrollSum: 0,
      // 滚动条高度
      scrollHeight: "800px",
      adminShow: true,
    };
  },

  beforeMount() {
    this.scrollHeight = window.innerHeight + "px";
    window.onresize = () => {
      // 窗口大小改变,重新设置滚动条高度
      this.scrollHeight = window.innerHeight + "px";
    };
  },

  methods: {
    handleClose() {
      console.log("test to home");
      this.$store.state.config.login = false;
      this.$store.state.config.noLogin = true;
      this.$store.state.config.adminShow = false;
      this.$store.state.config.toLogin = false;
      this.$router.push("/");
    },
    login() {
      this.$axios
        .post("/user/login", {
          name: this.$store.state.config.user.name,
          password: this.$store.state.config.user.password,
        })
        .then((res) => {
          const token = res.data.token;
          const id = res.data.id;
          console.log("test 1 login:" + res);
          localStorage.setItem("token", "token");
          localStorage.setItem("tokenValue", token);
          localStorage.setItem("id", res.data.id);
          this.$store.state.config.id = id;
          this.$store.state.config.token = token;
          this.$store.state.config.login = true;
          this.$store.state.config.noLogin = false;
          this.$store.state.config.toLogin = false;
        });
    },
    scroll(value) {
      const scrollTop = value.scrollTop;
      this.$store.state.config.isVisible = scrollTop - this.scrollSum <= 0;
      this.scrollSum = scrollTop;
      if (scrollTop >= document.getElementById("scrollbar").offsetHeight) {
        this.isTailVisible = true;
      }
    },
  },
};
</script>

<style >

/* * {
  margin: 0;
  padding: 0;
} */

.root {
	background-color: rgb(228, 228, 228);
}

.menu {
	position: fixed;
	z-index: 99;

	width: 100%;
	height: 59px;

	transition: all .2s;
	transform: translate3d(0, -100%, 0);
}

.content {
	margin-top: 59px;
}

.visible {
	transition: all .2s;
	transform: translateZ(0);
}

.adminContent {
	margin-top: 0;
}

.adminTail {
	display: none;
}

.adminMenu {
	display: none;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 6px;
}

/*定义滚动条轨道*/
::-webkit-scrollbar-track {
	border-radius: 12px;

	background-color: rgb(209, 209, 209);
}

/*定义滑块*/
::-webkit-scrollbar-thumb {
	border-radius: 12px;
	height: 10px;

	background-color: #9e9e9e;
	/* box-shadow: inset 0 0 .375rem #999; */
}

</style>
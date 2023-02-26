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
        :show-close="false"
        :before-close="handleClose"
        width="0"
        align-center
      >
        <div id="loginRoot">
          <div :class="{ double: true, doubleHeight: isRegister }">
            <div :class="{ doubleBox: true, doubleVisible: isRegister }">
              <table style="width: 100%">
                <tr>
                  <td>
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
                          @keyup.enter="login"
                          type="password"
                        />
                      </el-form-item>
                    </el-form>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right">
                    <span style="font-size: 16px"
                      >没有账号，去<span
                        @click="toRegister"
                        style="
                          color: #000;
                          font-weight: bold;
                          cursor: pointer;
                          margin-right: 26px;
                        "
                        >注册</span
                      ></span
                    >
                    <el-button type="primary" @click="login">登录</el-button>
                  </td>
                </tr>
              </table>
            </div>
            <div :class="{ doubleBox: true, doubleVisible: isLogin }">
              <table style="width: 100%">
                <tr>
                  <td class="t1">名称</td>
                  <td>
                    <el-input
                      v-model="this.$store.state.config.user.name"
                      autocomplete="off"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="t1">邮箱</td>
                  <td>
                    <el-input
                      :class="{ errorMessage: emailStatus }"
                      :formatter="handleEmail"
                      @input="handleUploadInfo"
                      v-model="this.$store.state.config.user.email"
                      autocomplete="off"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="t1">密码</td>
                  <td>
                    <el-input
                      :class="{ errorMessage: pwdStatus }"
                      v-model="user.password"
                      type="password"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="t1">重复密码</td>
                  <td>
                    <el-input
                      :class="{ errorMessage: pwdStatus }"
                      v-model="user.password1"
                      @keyup.enter="registerSubmit"
                      type="password"
                    />
                  </td>
                </tr>
              </table>
              <table style="width: 100%">
                <tr>
                  <td style="text-align: right">
                    <span style="font-size: 16px"
                      >已有账号，去<span
                        @click="toLogin"
                        style="
                          color: #000;
                          font-weight: bold;
                          cursor: pointer;
                          margin-right: 26px;
                        "
                        >登录</span
                      ></span
                    >
                    <el-button type="primary" @click="registerSubmit"
                      >注册</el-button
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <template #footer> </template>
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
      isLogin: true,
      isRegister: false,
      emailStatus: false,
      activeNames: "1",
      scrollSum: 0,
      // 滚动条高度
      scrollHeight: "800px",
      adminShow: true,
      user: {
        password: "",
        password1: "",
      },
    };
  },

  beforeMount() {
    this.scrollHeight = window.innerHeight + "px";
    window.onresize = () => {
      // 窗口大小改变,重新设置滚动条高度
      this.scrollHeight = window.innerHeight + "px";
    };
  },

  watch: {
    "$route.path"(newValue, oldValue) {
      if (
        newValue != "/articleManagement" &&
        newValue != "/commentManagement" &&
        newValue != "/systemManagement"
      ) {
        this.$store.state.config.isVisible = true;
        this.$store.state.config.adminShow = false;
      }
    },
    "user.password"(newVal, oldVal) {
      this.handlePwd();
    },
    "user.password1"(newVal, oldVal) {
      this.handlePwd();
    },
  },

  methods: {
    registerSubmit() {
      if (
        this.$store.state.config.user.name != "" &&
        this.$store.state.config.user.email != "" &&
        this.user.password != ""
      ) {
        this.$axios
          .post("/user/register", {
            name: this.$store.state.config.user.name,
            email: this.$store.state.config.user.email,
            password: this.user.password,
          })
          .then((res) => {
            this.$notify({
              message: res.message,
              duration: 1200,
            });
            if (res.code == "200") {
              this.isLogin = true;
              this.isRegister = false;
            }
          });
      }
    },
    handlePwd() {
      this.pwdStatus = !(this.user.password === this.user.password1);
    },
    handleEmail(s) {
      var reg =
        /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      this.emailStatus = !reg.test(s);
      return s;
    },
    toRegister() {
      this.$store.state.config.user = {};
      this.isLogin = false;
      this.isRegister = true;
    },
    toLogin() {
      this.isRegister = false;
      this.isLogin = true;
    },
    handleClose() {
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
          if (res.code == "200") {
            const token = res.data.token;
            const id = res.data.id;
            localStorage.setItem("token", "token");
            localStorage.setItem("tokenValue", token);
            localStorage.setItem("id", res.data.id);
            this.$store.state.config.id = id;
            this.$store.state.config.token = token;
            this.$axios.post("/user/info", { id: id }).then((res) => {
              this.$store.state.config.info = res.data;
              this.$store.state.config.info.headPortrait =
                this.$axios.serverAddress +
                "/file/image/" +
                res.data.headPortrait;
              this.$store.state.config.login = true;
              this.$store.state.config.noLogin = false;
              this.$store.state.config.toLogin = false;
              this.$router.go(0);
            });
          } else {
            this.$notify({
              message: res.message,
              duration: 1000,
            });
          }
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

#loginRoot {
	margin: 0;
	padding: 0;
}

.double {
	position: absolute;
	top: 50%;
	left: 50%;

	border-radius: 6px;
	padding: 30px 20px 20px 20px;
	width: 340px;
	height: 130px;

	background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

	transition: all .6s;
	transform: translate(-50%, -50%);
}

.doubleHeight {
	height: 230px;
}

.doubleBox {
	width: 100%;
	height: 130px;

	transition: all .4s;
}

.doubleVisible {
	overflow: hidden;

	height: 0;
}

.t1 {
	padding: 8px 4px;
	width: 60px;

	text-align: right;
}

.errorMessage {
	border: solid 1px red;
	border-radius: 4px;
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
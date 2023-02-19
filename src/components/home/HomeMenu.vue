<template>
  <div v-bind:class="{ header: true, visible: isVisible }">
    <el-menu
      :default-active="this.$route.path"
      active-text-color="#ffd04b"
      background-color="#ffffff"
      class="el-menu-demo left"
      mode="horizontal"
      :ellipsis="false"
      text-color="#000000"
      @select="handleSelect"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/timeline">Timeline</el-menu-item>
      <el-menu-item index="/tag">Tag</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <!-- <div class="flex-grow" /> -->
      <el-menu-item index="/admin">
        <el-button
          color="#ffffff"
          style="background-color: white; border-style: none"
        >
          <el-icon><User /></el-icon>
        </el-button>
      </el-menu-item>
    </el-menu>
    <div class="flex-grow" />
    <div class="right">
      <!-- <el-button
        color="#ffffff"
        style="background-color: white; border-style: none"
      >
        <el-icon><User /></el-icon>
      </el-button> -->
      <div class="aSearch">
        <el-input v-model="input3" placeholder="Please input">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
      </div>
      <div v-if="this.$store.state.config.noLogin">
        <div class="menuRight">
          <div class="login" @click="this.$store.state.config.toLogin = true">
            <img src="@/assets/user.png" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="login">
          <img :src="headPortrait" @click="hoverHeadPortrait" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import "element-plus/es/components/menu/style/css";
import "@/assets/css/home-menu.css";
import { User } from "@element-plus/icons-vue";

export default {
  name: "HomeMenu",

  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    User,
  },

  mixins: [],

  props: {},

  data() {
    return {
      isVisible: true,
      scroll: 0,
      default_active: 1,
      headPortrait: "",
      user: {},
    };
  },

  beforeMount() {
    this.getHeadPortrait();
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    hoverHeadPortrait() {
      console.log("test HeadPortrait");
      this.$router.push({
        name: "user",
      });
    },
    getHeadPortrait() {
      var id = localStorage.getItem("id");
      if (id) {
        this.$axios.post("/user/info", { id: id }).then((res) => {
          this.headPortrait =
            this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
        });
        this.$store.state.config.login = true;
        this.$store.state.config.noLogin = false;
      }
    },
    handleSelect: function (index) {
      console.log(index);
      switch (index) {
        case "/":
          this.$router.push("/");
          break;
        case "/timeline":
          this.$router.push("/timeline");
          break;
        case "/tag":
          this.$router.push("/tag");
          break;
        case "/about":
          this.$router.push("/about");
          break;
        case "return":
          this.$router.go(-1);
          break;
        case "/admin":
          this.$router.push("/admin");
          break;
      }
    },
    handleScroll: function () {
      const scrollTop = document.documentElement.scrollTop;
      const t = scrollTop - this.scroll;
      this.isVisible = t <= 0;
      this.scroll = scrollTop;
      // console.log(this.isVisible);
      // console.log(scrollTop);
    },
  },
  mounted() {
    console.log("test:" + this.$route.path);
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.header {
	display: flex;

	border-bottom: solid 1px #dcdfe6;

	background-color: white;
}

.login {
	display: table-cell;

	width: 59px;
	height: 59px;

	text-align: center;
	vertical-align: middle;
}

.login img {
	overflow: hidden;

	border-radius: 50%;
	width: 40px;
	height: 40px;

	transition: .2s;
}

.login img:hover {
	width: 50px;
	height: 50px;

	background-color: rgb(202, 202, 202);
}

.left {
	border: none;
}

.right {
	display: flex;
}

.aSearch {
	transform: translate3d(-20px, 14px, 0);
}

.flex-grow {
	flex-grow: 1;
}

</style>

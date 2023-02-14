<template>
  <div v-bind:class="{ header: true, visible: isVisible }">
    <el-menu
      :default-active="this.$route.path"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      @select="handleSelect"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/timeline">Timeline</el-menu-item>
      <el-menu-item index="/tag">Tag</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <el-menu-item index="return">Return</el-menu-item>
      <el-menu-item style="position: absolute; right: 0" index="/admin">
        <el-button style="background-color: transparent; border-style: none">
          <el-icon><User /></el-icon>
        </el-button>
      </el-menu-item>
    </el-menu>
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
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
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

<style >
</style>

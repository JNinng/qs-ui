<template>
  <div v-bind:class="{ header: true, visible: isVisible }">
    <el-menu
      default-active="1"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      @select="handleSelect"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Timeline</el-menu-item>
      <el-menu-item index="3">Return</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import "element-plus/es/components/menu/style/css";
import "@/assets/css/home-menu.css";

export default {
  name: "HomeMenu",

  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
  },

  mixins: [],

  props: {},

  data() {
    return {
      isVisible: true,
      scroll: 0,
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    handleSelect: function (index) {
      switch (index) {
        case "1":
          console.log(index);
          this.$router.push("/");
          break;
        case "2":
          console.log(index);
          this.$router.push("/timeline");
          break;
        case "3":
          this.$router.go(-1);
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
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
</style>

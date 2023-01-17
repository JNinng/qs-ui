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
      <el-menu-item index="2">Hello</el-menu-item>
      <el-menu-item index="3">Editor</el-menu-item>
      <el-menu-item index="4">Viewer</el-menu-item>
      <el-sub-menu index="5">
        <template #title>Workspace</template>
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
        <el-menu-item index="5-3">item three</el-menu-item>
        <el-sub-menu index="5-4">
          <template #title>item four</template>
          <el-menu-item index="5-4-1">item one</el-menu-item>
          <el-menu-item index="5-4-2">item two</el-menu-item>
          <el-menu-item index="5-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item disabled index="6">Info</el-menu-item>
      <el-menu-item index="7">Orders</el-menu-item>
      <el-menu-item index="8">Return</el-menu-item>
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
          this.$router.push("/hello");
          break;
        case "3":
          console.log(index);
          this.$router.push("/editor");
          break;
        case "4":
          console.log(index);
          this.$router.push("/viewer");
          break;
        case "5":
          console.log(index);
          this.$router.push("/two");
          break;
        case "6":
          console.log(index);
          this.$router.push("/");
          break;
        case "7":
          console.log(index);
          this.$router.push("/md");
          break;
        case "8":
          this.$router.go(-1);
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

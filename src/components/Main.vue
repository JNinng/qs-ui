<template>
  <div class="root">
    <div
      v-bind:class="{
        menu: true,
        header1: true,
        visible: isVisible && !this.$store.state.config.adminShow,
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
      isVisible: true,
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
    scroll(value) {
      const scrollTop = value.scrollTop;
      this.isVisible = scrollTop - this.scrollSum <= 0;
      this.scrollSum = scrollTop;
      if (scrollTop >= document.getElementById("scrollbar").offsetHeight) {
        this.isTailVisible = true;
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.root {
  background-color: ivory;
}

.menu {
  position: fixed;
  z-index: 99;

  width: 100%;
  height: 59px;

  transition: all 0.2s;
  transform: translate3d(0, -100%, 0);
}

.content {
  margin-top: 59px;
}

.visible {
  transition: all 0.2s;
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
</style>
<template>
  <div id="app">
    <div class="menu">
      <home-menu></home-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/HomeMenu";

export default {
  name: "App",
  components: {
    HomeMenu,
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.menu {
  width: 100%;
  height: 59px;
  margin-bottom: 16px;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}
</style>

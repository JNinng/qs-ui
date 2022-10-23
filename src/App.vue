<template>
  <div id="app">
    <main-x></main-x>
  </div>
</template>

<script>
import MainX from "@/components/Main.vue";

export default {
  name: "App",
  components: {
    MainX,
  },
  data() {
    return {};
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

	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
}

</style>

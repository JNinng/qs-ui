<template>
  <div>
    <el-button v-on:click="logPrint">打印全局数据</el-button>
    <h3>One</h3>
    <h3>One</h3>
    <h3>One</h3>
    <h3>One</h3>
  </div>
</template>

<script>
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";

export default {
  name: "TestOne",
  components: {
    ElButton,
  },
  methods: {
    logPrint: function () {
      console.log(this.$store.state.count);
      this.$store.state.count += 1;
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 40px;
}

h3 {
  height: 100vh;
}
</style>

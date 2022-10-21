<template>
  <div>
    <el-button v-on:click="logPrint">打印全局数据</el-button>
  </div>
</template>

<script>
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";

export default {
  name: "ElementUI",
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
</style>

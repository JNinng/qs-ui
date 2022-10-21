<template>
  <div class="hello">
    <h3>HelloWorld</h3>
    <el-button v-on:click="logPrint">打印全局数据</el-button>
  </div>
</template>

<script lang="js">
import {ElButton} from "element-plus";
import "element-plus/es/components/button/style/css";
import "../../assets/css/hello-world.css";

export default {
  name: "HelloWorld",

  components: {ElButton},

  mixins: [],

  props: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {
  },

  methods: {
    logPrint: function () {
      console.log("1111");
    },
  },
};

</script>

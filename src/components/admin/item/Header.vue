<template>
  <div>
    <el-menu
      :style="'background: rgba(0, 0, 0, 0);height:40px'"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">Login</el-menu-item>
      <el-menu-item index="1">Logout</el-menu-item>
      <el-menu-item index="2">CheckLogin</el-menu-item>
      <el-menu-item index="3">Test</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",

  components: {},

  mixins: [],

  props: [],

  data() {
    return {};
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    handleSelect: function (index) {
      console.log(index);
      switch (index) {
        case "0":
          console.log("test 0");
          this.$axios
            .post("/user/login", {
              name: "restfulToolkitX",
              password: "restfulToolkitX",
            })
            .then((res) => {
              const token = res.data.token;
              const id = res.data.id;
              console.log("test 1 login:" + res);
              localStorage.setItem("token", "token");
              localStorage.setItem("tokenValue", token);
              localStorage.setItem("id", res.data.id);
              this.$store.state.config.id = id;
              this.$store.state.config.token = token;
              this.$store.state.config.login = true;
              this.$store.state.config.noLogin = false;
            });
          break;
        case "1":
          console.log("test 1");
          this.$axios.get("/user/logout", {}).then((res) => {
            console.log("test 1 res:" + res);
            this.$store.state.config.login = false;
            this.$store.state.config.noLogin = true;
          });
          break;
        case "2":
          console.log("test 2");
          this.$axios
            .get("/user/checkLogin", {
              id: localStorage.getItem("id"),
            })
            .then((res) => {
              console.log("test 2 res:" + res);
            });
          break;
        case "3":
          console.log("test 3");
          this.$axios.get("/article/pageInfo", {}).then((res) => {
            console.log("test 3 res:" + res);
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>
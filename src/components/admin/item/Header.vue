<template>
  <div>
    <el-menu
      :style="'background: rgba(0, 0, 0, 0);height:40px'"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0"
        ><span class="sidebar-switch" @click="open = !open">
          <span v-if="this.$store.state.config.login">
            <el-tooltip content="退出连接" placement="bottom">
              <el-icon :size="25" style="height: 50px; width: 50px"
                ><img class="loginImg" :src="info.headPortrait"
              /></el-icon>
            </el-tooltip>
          </span>
          <span v-else>
            <el-tooltip content="登录" placement="bottom">
              <el-icon :size="25" style="height: 50px; width: 50px"
                ><Connection
              /></el-icon>
            </el-tooltip>
          </span> </span
      ></el-menu-item>
      <el-menu-item index="1">{{ info.name }}</el-menu-item>
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
    return {
      info: {},
    };
  },

  beforeMount() {
    this.getHeadPortrait();
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {
    "$store.state.config.login"(newValue, oldValue) {
      this.getHeadPortrait();
    },
  },

  methods: {
    handleSelect: function (index) {
      console.log(index);
      switch (index) {
        case "0":
          if (this.$store.state.config.login) {
            this.$axios.get("/user/logout", {}).then((res) => {
              console.log("test 1 res:" + res);
              this.$store.state.config.login = false;
              this.$store.state.config.noLogin = true;
            });
          } else {
            // this.$axios
            //   .post("/user/login", {
            //     name: "restfulToolkitX",
            //     password: "restfulToolkitX",
            //   })
            //   .then((res) => {
            //     const token = res.data.token;
            //     const id = res.data.id;
            //     console.log("test 1 login:" + res);
            //     localStorage.setItem("token", "token");
            //     localStorage.setItem("tokenValue", token);
            //     localStorage.setItem("id", res.data.id);
            //     this.$store.state.config.id = id;
            //     this.$store.state.config.token = token;
            //     this.$store.state.config.login = true;
            //     this.$store.state.config.noLogin = false;
            //   });
          }
          break;
        case "1":
          console.log("test 2");
          this.$axios
            .get("/user/checkLogin", {
              id: localStorage.getItem("id"),
            })
            .then((res) => {
              if ((res.code = "200")) {
                this.$notify({
                  message: res.data,
                  duration: 800,
                });
              }
            });
          break;
      }
    },
    getHeadPortrait() {
      var id = localStorage.getItem("id");
      if (id) {
        this.$axios.post("/user/info", { id: id }).then((res) => {
          this.info = res.data;
          this.info.headPortrait =
            this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
        });
      }
    },
  },
};
</script>

<style scoped>
.loginImg {
	overflow: hidden;

	border-radius: 50%;
	width: 40px;
	height: 40px;

	cursor: pointer;
}

</style>
<template>
  <div class="adminRoot">
    <!-- 整体页面布局 -->
    <el-row class="app-wrapper">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="open ? '210px' : '0px'">
          <Sidebar :open="open" />
        </el-aside>
        <el-container>
          <!-- 顶部 -->
          <el-header style="height: auto">
            <el-col
              ><span class="sidebar-switch" @click="open = !open">
                <!-- <i :class="open ? 'el-icon-s-fold' : 'el-icon-s-unfold'" /> -->
                <span v-if="open">
                  <el-icon :size="25" style="height: 50px; width: 50px"
                    ><Fold
                  /></el-icon>
                </span>
                <span v-else>
                  <el-icon :size="25" style="height: 50px; width: 50px"
                    ><Expand
                  /></el-icon>
                </span>
              </span>
              <span>
                <Header class="adminHeader" />
              </span>
            </el-col>
          </el-header>
          <!-- 主页面 -->
          <el-main><router-view></router-view></el-main>
          <div class="dialog">
            <el-dialog
              v-model="this.$store.state.config.noLogin"
              title="请登录管理员账号"
              :show-close="false"
              :before-close="handleClose"
              width="440px"
              align-center
            >
              <el-form :model="user">
                <el-form-item label="用户名" label-width="60px">
                  <el-input v-model="user.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" label-width="60px">
                  <el-input v-model="user.password" autocomplete="off" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="handleClose">返回 Home</el-button>
                  <el-button type="primary" @click="login"> 登录 </el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </el-container>
      </el-container>
    </el-row>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/item/Sidebar";
import Header from "@/components/admin/item/Header";

export default {
  name: "Admin",

  components: {
    Sidebar,
    Header,
  },

  mixins: [],

  props: [],

  data() {
    return {
      open: true,
      user: {
        name: "restfulToolkitX",
        password: "restfulToolkitX",
      },
    };
  },

  mounted() {},

  computed: {},

  beforeMount() {
    var tokenValue = localStorage.getItem("tokenValue"); // 从本地缓存读取tokenValue值
    if (!tokenValue) {
      this.$store.state.config.login = false;
      this.$store.state.config.noLogin = true;
    }
    this.$axios
      .get("/user/checkLogin", {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        if ((res.code = "200")) {
          this.$notify({
            message: res.data,
            duration: 1200,
          });
        }
      });
  },

  created() {},

  watch: {},

  methods: {
    handleClose() {
      console.log("test to home");
      this.$store.state.config.login = false;
      this.$store.state.config.noLogin = true;
      this.$store.state.config.adminShow = false;
      this.$router.push("/");
    },
    login() {
      this.$axios
        .post("/user/login", {
          name: this.user.name,
          password: this.user.password,
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
    },
  },
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.adminHeader {
  float: right;
}
</style>
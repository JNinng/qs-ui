<template>
  <div v-bind:class="{ header: true, visible: isVisible }">
    <el-menu
      :default-active="this.$route.path"
      active-text-color="#ffd04b"
      background-color="#ffffff"
      class="el-menu-demo left"
      mode="horizontal"
      :ellipsis="false"
      text-color="#000000"
      @select="handleSelect"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/timeline">探索</el-menu-item>
      <el-menu-item index="/tag">榜单</el-menu-item>
    </el-menu>
    <div class="flex-grow" />
    <div class="right">
      <!-- <el-button
        color="#ffffff"
        style="background-color: white; border-style: none"
      >
        <el-icon><User /></el-icon>
      </el-button> -->
      <div class="aSearch">
        <el-input
          id="searchInput"
          v-model="searchKey"
          @keyup.enter="search"
          placeholder="输入...."
        >
          <template #append>
            <el-button @click="search">✔</el-button>
          </template>
        </el-input>
      </div>
      <div v-if="this.$store.state.config.noLogin">
        <div class="menuRight">
          <div class="login" @click="this.$store.state.config.toLogin = true">
            <img src="@/assets/user.png" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="login">
          <el-popover :width="34" trigger="hover">
            <template #reference>
              <img
                :src="$store.state.config.info.headPortrait"
                @click="hoverHeadPortrait"
              />
            </template>
            <template #default>
              <div class="minMenu">
                <el-table :data="menuData" @row-click="clickMinMenu">
                  <el-table-column prop="name"></el-table-column>
                </el-table>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "element-plus/es/components/menu/style/css";
import "@/assets/css/home-menu.css";

export default {
  name: "HomeMenu",

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      isVisible: true,
      scroll: 0,
      default_active: 1,
      headPortrait: "",
      user: {},
      searchKey: "",
      menuData: [
        {
          id: 1,
          name: "个人空间",
        },
        {
          id: 2,
          name: "设置",
        },
        {
          id: 0,
          name: "退出登录",
        },
      ],
    };
  },

  beforeMount() {
    this.getHeadPortrait();
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    search() {
      if (this.searchKey && this.searchKey != "" && this.searchKey != null) {
        this.$router.push({
          name: "search",
          query: {
            searchKey: this.searchKey,
          },
        });
      }
    },
    hoverHeadPortrait() {
      this.$router.push({
        name: "user",
        params: {
          id: localStorage.getItem("id"),
        },
      });
    },
    getHeadPortrait() {
      var id = localStorage.getItem("id");
      if (id) {
        this.$axios.post("/user/info", { id: id }).then((res) => {
          this.$store.state.config.info.headPortrait =
            this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
          this.$store.state.config.login = true;
          this.$store.state.config.noLogin = false;
        });
      }
    },
    handleSelect: function (index) {
      switch (index) {
        case "/":
          this.$router.push("/");
          break;
        case "/timeline":
          this.$router.push("/timeline");
          break;
        case "/tag":
          this.$router.push("/tag");
          break;
        case "/about":
          this.$router.push("/about");
          break;
        case "return":
          this.$router.go(-1);
          break;
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
    clickMinMenu(row, column, e) {
      switch (row.id) {
        case 0:
          this.$axios.get("/user/logout", {}).then((res) => {
            if (res.code == "200") {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenValue");
              this.$store.state.config.login = false;
              this.$store.state.config.noLogin = true;
              this.$router.replace({
                name: "home",
              });
            }
          });
          break;
        case 1:
          this.hoverHeadPortrait();
          break;
        case 2:
          this.$router.push("/admin");
          break;
      }
    },
  },
  mounted() {
    console.log("test:" + this.$route.path);
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector("input").focus;
      },
    },
  },
};
</script>

<style>
.header {
	display: flex;

	border-bottom: solid 1px #dcdfe6;

	background-color: white;
}

#searchInput:focus {
	width: 300px;
}

.login {
	display: table-cell;

	padding-right: 16px;
	width: 59px;
	height: 59px;

	text-align: center;
	vertical-align: middle;
}

.login img {
	overflow: hidden;

	border-radius: 50%;
	width: 40px;
	height: 40px;

	transition: .2s;
}

.login img:hover {
	width: 50px;
	height: 50px;

	background-color: rgb(202, 202, 202);
}

.minMenu {
	text-align: right;

	background-color: transparent;

	cursor: pointer;
}

.left {
	border: none;
}

.right {
	display: flex;
}

.aSearch {
	transform: translate3d(-20px, 14px, 0);
}

.flex-grow {
	flex-grow: 1;
}

</style>

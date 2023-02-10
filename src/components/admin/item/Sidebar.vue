<template>
  <div>
    <el-col class="sidebar-container" :style="`width:${open ? '210' : '0'}px;`">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu default-active="/articleManagement" @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>
              <span>数据</span>
            </template>
            <el-menu-item index="/articleManagement">文章</el-menu-item>
            <el-menu-item index="/commentManagement">评论</el-menu-item>
            <!-- 菜单进行分组 -->
            <el-menu-item-group title="文件数据" class="default-menu">
              <el-menu-item index="/imageManagement">图床</el-menu-item>
              <el-menu-item index="/fileManagement">文件</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>设置</span>
            </template>
            <el-menu-item-group title="分组名称">
              <el-sub-menu index="2-1">
                <template #title>子菜单</template>
                <el-menu-item index="2-1-1">2级菜单</el-menu-item>
              </el-sub-menu>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Sidebar",

  components: {
    ElSubMenu,
  },

  mixins: [],

  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  beforeMount() {
    this.$store.state.config.adminShow = true;
  },

  computed: {},

  created() {},

  watch: {},

  methods: {
    handleSelect: function (index) {
      console.log(index);
      switch (index) {
        case "/articleManagement":
          console.log("test 11");
          this.$router.push("/articleManagement");
          break;
      }
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  transition: width 0.4s;
  width: 20%;
  background-color: #444;
  height: 100%;
  position: fixed;
  z-index: 1001;
  overflow: hidden;
}

.scrollbar-wrapper {
  overflow-x: hidden;
}
</style>
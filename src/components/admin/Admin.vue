<template>
  <div class="adminRoot">
    <!-- 整体页面布局 -->
    <el-row class="app-wrapper">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="open ? '210px' : '0px'">
          <sidebar :open="open" />
        </el-aside>
        <el-container>
          <!-- 顶部 -->
          <el-header height="50px">
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
              <span>header</span></el-col
            ></el-header
          >
          <!-- 主页面 -->
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-row>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/item/Sidebar";

export default {
  name: "Admin",

  components: {
    Sidebar,
  },

  mixins: [],

  props: [],

  data() {
    return {
      open: true,
    };
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {},
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="searchRoot">
    <div class="up"></div>
    <div class="middle" v-if="load">
      <div
        class="searchItem"
        v-for="(item, index) in searchResult"
        :key="index"
      >
        <div>
          <div class="itemTitle" style="display: flex">
            <el-icon style="margin-right: 12px; float: left"
              ><DArrowRight
            /></el-icon>
            <div style="flex: 1">
              <span
                v-html="item.title"
                @click="goItem(item.id)"
                style="cursor: pointer"
              ></span>
            </div>
            <div>
              <el-tooltip
                effect="dark"
                content="选中处理资源过期或重复"
                placement="top-start"
              >
                <el-checkbox
                  v-model="like[item.id]"
                  @change="checkAmendment(item.id, item.title)"
                  size="large"
                />
              </el-tooltip>
            </div>
          </div>
          <div class="searchMD">
            <MdViewer :content="item.content"></MdViewer>
          </div>
          <div class="shade"></div>
        </div>
      </div>
    </div>
    <div class="searchAmendment">
      <el-popover placement="bottom" width="320px" trigger="click" content="">
        <template #reference>
          <el-icon size="36px"><UploadFilled /></el-icon>
        </template>
        <table class="amendmentTable">
          <tr>
            <td>
              <div>
                <div v-for="(item, index) in like" :key="index">
                  <el-checkbox v-model="like[index]" size="large" />
                  {{ likeTitle[index] }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-input v-model="likeInfo" placeholder="资源重复或失效？" />
            </td>
          </tr>
          <tr>
            <td style="text-align: right; padding: 4px 8px; cursor: pointer">
              <el-icon
                class="amendmentSubmit"
                size="24px"
                @click="submitAmendment"
                ><Promotion
              /></el-icon>
            </td>
          </tr>
        </table>
      </el-popover>
    </div>
    <div class="down" v-if="load">
      <div class="paging">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 60, 100]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";

export default {
  name: "Search",

  components: {
    MdViewer,
  },

  mixins: [],

  props: {
    searchKey: {
      type: String,
      default: "null",
    },
  },

  data() {
    return {
      load: false,
      searchResult: [],
      currentPage: 0,
      pageSize: 10,
      count: 0,
      like: {},
      likeInfo: "",
      likeTitle: {},
    };
  },

  beforeMount() {
    this.loadData();
    // this.$axios
    //   .post("/es/index/searchArticle", {
    //     key: this.searchKey,
    //     page: 0,
    //     pageSize: 8,
    //   })
    //   .then((res) => {
    //     if (res.code == "200" && res.data.length > 0) {
    //       this.searchResult = res.data;
    //       this.count = res.data[0].count;
    //       this.load = true;
    //     }
    //   });
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {
    "$route.query.searchKey"(newValue, oldValue) {
      // this.load = false;
      // this.currentPage = 0;
      // this.loadData();
      this.$router.go(0);
    },
  },

  methods: {
    submitAmendment() {
      var ids = [];
      for (const key in this.like) {
        if (this.like[key] == true) {
          ids.push(key);
        }
      }
      this.$axios
        .post("/article/submitAmendmentSuggest", {
          articleId: ids.join(),
          info: this.likeInfo != "" ? this.likeInfo : "资源重复或失效",
        })
        .then((res) => {
          this.$notify({
            message: res.message,
            duration: 1200,
          });
        });
    },
    checkAmendment(id, title) {
      this.likeTitle[id] = title.replace(
        new RegExp("<(S*?)[^>]*>.*?|<.*? />", "gm"),
        ""
      );
    },
    loadData() {
      this.searchResult = [];
      this.$axios
        .post("/es/index/searchArticle", {
          key: this.searchKey,
          page: this.currentPage - 1,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == "200" && res.data.length > 0) {
            console.log("test:" + res.data[0].title);
            this.searchResult = res.data;
            this.count = res.data[0].count;
            this.load = true;
          }
        });
    },
    // 页大小改变
    handleSizeChange(num) {
      this.loadData();
    },
    // 换页
    handleCurrentChange(num) {
      this.loadData();
    },
    goItem(id) {
      let routeData = this.$router.resolve({
        name: "mdView",
        params: {
          id: id,
        },
        query: {
          searchKey: this.searchKey,
        },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style scoped>
.middle {
  padding: 8px 0;
  position: relative;
}

.shade {
  position: absolute;
  height: 100px;
  width: calc(100% - 40px);
  z-index: 1;
  transform: translateY(-100px);
  /* background-color: black; */
  /* background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0)); */
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 1));
}

.searchItem {
  margin-top: 10px;
  margin: 0 20px;
  margin-bottom: 6px;
}

.itemTitle {
  padding: 12px 20px 0px 20px;

  line-height: 18px;
  font-size: 18px;

  background-color: rgba(255, 241, 224, 0.829);
}

.searchMD {
  height: 200px;
  overflow: hidden;
}

.searchAmendment {
  cursor: pointer;
  z-index: 10;
  top: 90%;
  left: 90%;
  position: fixed;
}

.amendmentTable {
  width: 100%;
}

.paging {
  margin: 8px 20px;
}
</style>
<template>
  <div class="searchRoot">
    <div class="up"></div>
    <div class="middle" v-if="load">
      <div
        class="searchItem"
        v-for="(item, index) in searchResult"
        :key="index"
      >
        <div @click="goItem(item.id)">
          <div class="itemTitle">
            <el-icon style="margin-right: 12px"><DArrowRight /></el-icon>
            <span v-html="item.title"></span>
          </div>
          <div style="height: 200px; overflow: hidden">
            <MdViewer :content="item.content"></MdViewer>
          </div>
        </div>
      </div>
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
    };
  },

  beforeMount() {
    this.$axios
      .post("/es/index/searchArticle", {
        key: this.searchKey,
        page: 0,
        pageSize: 8,
      })
      .then((res) => {
        if (res.code == "200" && res.data.length > 0) {
          this.searchResult = res.data;
          this.count = res.data[0].count;
          this.load = true;
        }
      });
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {
    "$route.query.searchKey"(newValue, oldValue) {
      this.loadData();
    },
  },

  methods: {
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
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style scoped>
.middle {
	padding: 8px 0;
}

.searchItem {
	margin-top: 10px;
}

.itemTitle {
	margin: 0 20px;
	border-bottom: solid .1px rgba(119, 119, 119, .314);
	padding: 12px 20px 0 20px;

	font-size: 18px;

	background-color: white;
}

.paging {
	margin: 8px 20px;
}

</style>
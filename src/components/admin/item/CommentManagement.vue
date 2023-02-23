<template>
  <div>
    <!--  -->
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      stripe
      border
      style="width: 100%"
      max-height="80vh"
      :v-if="pageListLoad"
    >
      <el-table-column fixed label="Article" sortable width="160">
        <template #default="scope">
          <span>{{ getArticleTitle(scope.row.comment.articleId) }}</span>
        </template></el-table-column
      >
      <el-table-column
        prop="comment.content"
        label="Content"
        sortable
        width="200"
      />
      <el-table-column label="CreateTime" sortable width="180">
        <template #default="scope">
          <span>{{ dateFormat(scope.row.comment.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="UpdateTime" sortable width="180">
        <template #default="scope">
          <span>{{ dateFormat(scope.row.comment.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-tooltip content="查看详情" placement="top">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="toDelete(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 60, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
  

<script>
import CommentItem from "@/components/admin/item/CommentItem";
import moment from "moment";

export default {
  name: "CommentManagement",

  components: {
    CommentItem,
  },

  mixins: [],

  props: [],

  beforeMount() {
    this.loadData();
  },

  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      small: false,
      background: false,
      disabled: false,
      pageListLoad: false,
      operationRow: {},
      dialog: false,
      articleTitle: {},
    };
  },

  mounted() {},

  computed: {
    getTableData() {
      this.loadData();
    },
    getOperationRowUpdateTime() {
      return moment(this.operationRow.updateTime).format("YYYY-MM-DD");
    },
    getOperationRowCreateTime() {
      return moment(this.operationRow.createTime).format("YYYY-MM-DD");
    },
    getLogingStatus() {
      return this.$store.state.config.login;
    },
  },

  created() {},

  watch: {
    "$store.state.config.login"(newVal, oldVal) {
      if (newVal) {
        this.getPageInfo();
      }
    },
  },

  methods: {
    loadComment() {},
    // 页大小改变
    handleSizeChange(num) {
      this.loadData();
    },
    // 换页
    handleCurrentChange(num) {
      this.loadData(num);
    },
    loadData(num) {
      if (num > 0) {
        this.currentPage = num;
      }
      this.tableData = [];
      this.$axios
        .post("/comment/byUserId", {
          page: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == "200") {
            if (res.data.length > 0) {
              this.tableData = res.data;
              this.total = res.data[0].parentCount;
              this.pageListLoad = true;
            }
          }
        });
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getArticleTitle(id) {
      if (JSON.stringify(this.articleTitle[id]) == undefined) {
        this.$axios.get("/article/info/" + id, {}).then((res) => {
          this.articleTitle[id] = res.data.title;
        });
      }
      return this.articleTitle[id];
    },
    save(row) {
      Object.assign(row, this.operationRow);
      (this.operationRow.updateTime =
        moment(this.operationRow.updateTime).format("YYYY-MM-DD") +
        " 00:00:00"),
        (this.operationRow.createTime =
          moment(this.operationRow.createTime).format("YYYY-MM-DD") +
          " 00:00:00"),
        this.$axios
          .post("/article/updateInfo", this.operationRow)
          .then((res) => {
            console.log("test info: " + JSON.stringify(res));
          });
    },
    cancel(row) {},
    toDelete(row) {
      console.log("tese delete:" + JSON.stringify(row));
      console.log("tese delete:" + row.comment.id);
      this.$axios
        .post("/comment/deleteById", {
          id: row.comment.id,
        })
        .then((res) => {
          if (res.code == "200") {
            this.$notify({
              message: "删除成功",
              duration: 1000,
            });
          } else {
            this.$notify({
              message: res.message,
              duration: 1000,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.paging {
	margin-top: 10px;
}

</style>
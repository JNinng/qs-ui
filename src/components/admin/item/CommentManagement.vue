<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="operationRow.title"
      fullscreen="true"
      destroy-on-close="true"
    >
      <div>
        <comment-item
          :dialogFormVisible="dialogFormVisible"
          :id="operationRow.id"
        />
      </div>
      <template #footer>
        <div style="clear: both"></div>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">返回管理</el-button>
        </span>
      </template>
    </el-dialog>

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
      <el-table-column prop="id" label="ID" sortable width="110" />
      <el-table-column prop="userId" label="UserID" sortable width="110" />
      <el-table-column
        fixed
        prop="title"
        label="title"
        show-overflow-tooltip
        sortable
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="CreateTime"
        sortable
        width="180"
      >
        <template #default="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="UpdateTime"
        sortable
        width="180"
      >
        <template #default="scope">
          <span>{{ dateFormat(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-tooltip content="查看详情" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="View"
              @click="goto(scope.row)"
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
    this.getPageInfo();
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
      pageLoad: false,
      pageListLoad: false,
      dialogVisible: false,
      operationRow: {},
      dialogFormVisible: false,
      dialog: false,
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
    getPageInfo() {
      this.$axios.get("/article/pageInfo", {}).then((res) => {
        if (res.code == "200") {
          this.total = res.data.total;
          this.pageLoad = true;
          this.loadData();
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
    loadData() {
      this.$axios
        .post("/article/getPageList", {
          page: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == "200") {
            this.tableData = res.data;
            this.pageListLoad = true;
          }
        });
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleDetailClick(row) {
      console.log("test detail:" + JSON.stringify(row));
    },
    handleEditClick(row) {
      Object.assign(this.operationRow, row);
      this.dialog = true;
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
    goto(row) {
      Object.assign(this.operationRow, row);
      this.dialogFormVisible = !this.dialogFormVisible;
    },
  },
};
</script>

<style scoped>
.paging {
  margin-top: 10px;
}
</style>
<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="operationRow.title"
      fullscreen="true"
      destroy-on-close="true"
    >
      <div>
        <router-view
          @close="dialogFormVisible = !dialogFormVisible"
        ></router-view>
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
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.title"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="likeNum" label="LikeNum" sortable width="110">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.likeNum }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.likeNum"
            oninput="value=value.replace(/[^0-9.]/g,'')"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="pageView" label="PageView" sortable width="110">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.pageView }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.pageView"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP" width="110">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.ip }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.ip"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="site" label="Site" width="80">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.site }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.site"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="CreateTime"
        sortable
        width="180"
      >
        <template #default="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.createTime"
            type="date"
          ></el-input>
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
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.updateTime"
            type="date"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="mode" label="Mode" width="80">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.mode }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.mode"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="80">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.status }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.status"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="stick" label="Stick" sortable width="90">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.stick }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.stick"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-tooltip content="查看详情" placement="top">
            <el-button
              v-show="!scope.row.edit"
              type="primary"
              size="small"
              icon="View"
              @click="update(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button
              v-show="!scope.row.edit"
              type="primary"
              size="small"
              icon="Edit"
              @click="handleEditClick(scope.row)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="保存" placement="top">
            <el-button
              v-show="scope.row.edit"
              type="success"
              size="small"
              icon="Select"
              @click="save(scope.row)"
            >
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip content="取消" placement="top"> -->
          <el-button
            v-show="scope.row.edit"
            type="info"
            size="small"
            icon="CloseBold"
            @click="cancel(scope.row)"
          >
          </el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="articleTail">
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
      <div class="add">
        <el-tooltip content="添加文章" placement="top">
          <el-button type="success" icon="Plus" @click="add"> </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ArticleManagement",

  components: {},

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
      operationRow: {
        title: "创作",
      },
      dialogFormVisible: false,
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
      row.edit = true;
    },
    save(row) {
      Object.assign(row, this.operationRow);
      row.edit = false;
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
    cancel(row) {
      row.edit = false;
    },
    update(row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      Object.assign(this.operationRow, row);
      this.$router.push({
        name: "adminEditor",
        query: {
          id: row.id,
          mode: "update",
        },
      });
    },
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.$router.push({
        name: "adminEditor",
        query: {
          mode: "upload",
        },
      });
    },
  },
};
</script>

<style scoped>
.paging {
  float: left;
}

.articleTail {
  margin-top: 10px;
}

.add {
  float: right;
  margin-right: 20px;
}
</style>
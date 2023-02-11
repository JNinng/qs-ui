<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      stripe
      border
      style="width: 100%"
      max-height="80vh"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
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
              @click="handleDetailClick(scope.row)"
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
              @click="scope.row.edit = false"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="取消" placement="top">
            <el-button
              v-show="scope.row.edit"
              type="info"
              size="small"
              icon="CloseBold"
              @click="scope.row.edit = false"
            >
            </el-button>
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
    <!-- <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >

    <el-dialog
      title="提示"
      :model-value="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>{{ operationRow }}</div>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->

    <!-- <el-table :data="list1">
      <el-table-column align="center" prop="id" label="编号" width="80">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.id }}</span>
          <el-input v-show="scope.row.edit" v-model="scope.row.id"></el-input>
        </template>
      </el-table-column>

      <el-table-column width="180px" prop="name" label="名称">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
          <el-input v-show="scope.row.edit" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template #default="scope">
          <el-button
            v-show="!scope.row.edit"
            type="primary"
            size="small"
            icon="Edit"
            @click="scope.row.edit = !scope.row.edit"
          >
            编辑
          </el-button>
          <el-button
            v-show="scope.row.edit"
            type="success"
            size="small"
            icon="Select"
            @click="scope.row.edit = false"
          >
            Ok
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
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
      operationRow: {},
      list1: [
        { id: "1", name: "法外狂徒", editid: false, editname: false },
        { id: "2", name: "张三", editid: false, editname: false },
      ],
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
    // dateFormat(row, column, cellValue, index) {
    //   let date = row.time;
    //   return moment(date).format("YYYY-MM-DD");
    // },
    handleClose() {
      this.dialogVisible = false;
    },
    handleDetailClick(row) {
      console.log("test detail:" + JSON.stringify(row));
    },
    handleEditClick(row) {
      this.operationRow = row;
      row.edit = true;
      // this.dialogVisible = true;
      console.log("test detail:" + JSON.stringify(row));
    },
  },
};
</script>

<style scoped>
.paging {
  margin-top: 10px;
}
</style>
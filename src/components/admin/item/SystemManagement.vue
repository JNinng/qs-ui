<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      stripe
      border
      style="width: 100%"
      max-height="80vh"
      :v-if="pageListLoad"
    >
      <el-table-column prop="id" label="ID" sortable width="80" />
      <el-table-column prop="key" label="Key" sortable width="200">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.key }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.key"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="Value" sortable width="110">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.value }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.value"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="Info" sortable width="160">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.info }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.info"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="defaultValue" label="Default" sortable width="200">
        <template #default="scope">
          <span v-show="!scope.row.edit">{{ scope.row.defaultValue }}</span>
          <el-input
            v-show="scope.row.edit"
            v-model="operationRow.defaultValue"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
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
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SystemManagement",

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
      this.$axios.get("/admin/getAll", {}).then((res) => {
        if (res.code == "200") {
          this.total = res.data.total;
          this.pageLoad = true;
          this.loadData();
        }
      });
    },
    loadData() {
      this.$axios.post("/admin/getAll", {}).then((res) => {
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
        this.$axios.post("/admin/update", this.operationRow).then((res) => {
          this.$notify({
            message: res.message,
            duration: 800,
          });
        });
    },
    cancel(row) {
      row.edit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
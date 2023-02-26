<template>
  <div>
    <div class="userInfo" v-if="infoLoad">
      <div class="aCollapse">
        <el-collapse id="ac" v-model="activeName" accordion>
          <el-collapse-item name="0">
            <template #title>
              <h3>基本信息</h3>
            </template>
            <div class="infoItem">
              <table>
                <tr>
                  <td class="t1">
                    <span
                      class="ml-3 w-35 text-gray-600 inline-flex items-center"
                      >头像：</span
                    >
                  </td>
                  <td style="min-width: 260px">
                    <img
                      class="headPortrait"
                      style="width: 120px; height: 120px"
                      :src="headPortrait"
                    />
                    <el-upload
                      action="http://localhost:8401/file/upload"
                      name="files"
                      :headers="token"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                    >
                      <el-button>上传</el-button>
                    </el-upload>
                  </td>
                </tr>
                <tr>
                  <td class="t1">
                    <span
                      class="ml-3 w-35 text-gray-600 inline-flex items-center"
                      >名称：</span
                    >
                  </td>
                  <td>
                    <span>{{ info.name }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="t1">
                    <span
                      class="ml-3 w-35 text-gray-600 inline-flex items-center"
                      >昵称：</span
                    >
                  </td>
                  <td>
                    <el-input
                      v-model="info.nickname"
                      @input="handleUploadInfo"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="t1">
                    <span
                      class="ml-3 w-35 text-gray-600 inline-flex items-center"
                      >邮箱：</span
                    >
                  </td>
                  <td>
                    <el-input
                      :class="{ errorMessage: emailStatus }"
                      v-model="info.email"
                      :formatter="handleEmail"
                      @input="handleUploadInfo"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="t1">
                    <span
                      class="ml-3 w-35 text-gray-600 inline-flex items-center"
                      >简介：</span
                    >
                  </td>
                  <td>
                    <el-input
                      v-model="info.info"
                      type="textarea"
                      @input="handleUploadInfo"
                    />
                  </td>
                </tr>
                <tr v-if="uploadInfo">
                  <td></td>
                  <td style="text-align: right; padding-top: 8px">
                    <el-button type="info" @click="uploadInfoCancle">
                      <el-icon><CloseBold /></el-icon>
                    </el-button>
                    <el-button type="success" @click="uploadInfoSubmit">
                      <el-icon><Check /></el-icon>
                    </el-button>
                  </td>
                </tr>
              </table>
            </div>
          </el-collapse-item>
          <el-collapse-item name="1">
            <template #title>
              <h3>账号安全</h3>
            </template>
            <el-divider content-position="left">账号密码设置</el-divider>
            <table>
              <tr>
                <td class="t1">
                  <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
                    >旧密码：</span
                  >
                </td>
                <td>
                  <el-input
                    v-model="pwd.old"
                    type="password"
                    :formatter="handleEmail"
                    @input="handleUploadInfo"
                  />
                </td>
              </tr>
              <tr>
                <td class="t1">
                  <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
                    >新密码：</span
                  >
                </td>
                <td>
                  <el-input
                    :class="{ errorMessage: pwdStatus }"
                    type="password"
                    v-model="pwd.newV"
                    :formatter="handleEmail"
                  />
                </td>
              </tr>
              <tr>
                <td class="t1">
                  <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
                    >重复新密码：</span
                  >
                </td>
                <td>
                  <el-input
                    :class="{ errorMessage: pwdStatus }"
                    type="password"
                    v-model="pwd.newV1"
                    :formatter="handleEmail"
                  />
                </td>
                <td v-if="pwdStatus">
                  <font color="red">&nbsp;两次密码不一致</font>
                </td>
              </tr>
              <tr>
                <td></td>
                <td style="text-align: right; padding-top: 8px">
                  <el-button type="info" @click="uploadPwdCancle">
                    <el-icon><CloseBold /></el-icon>
                  </el-button>
                  <el-button type="success" @click="uploadPwdSubmit">
                    <el-icon><Check /></el-icon>
                  </el-button>
                </td>
              </tr>
            </table>
            <el-divider content-position="left">授权密码设置</el-divider>
            <el-table
              :data="authorizationData"
              :default-sort="{ prop: 'date', order: 'descending' }"
              stripe
              border
              style="width: 100%"
              max-height="80vh"
              :v-if="pageListLoad"
            >
              <el-table-column prop="id" label="授权码" sortable>
                <template #default="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="备注" sortable>
                <template #default="scope">
                  {{ scope.row.info }}
                </template>
              </el-table-column>
              <el-table-column sortable width="80">
                <template #default="scope">
                  <el-button type="danger" @click="deleteCode(scope.row.id)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="add">
              <el-tooltip content="新建授权码" placement="top">
                <el-button type="success" @click="add">
                  <el-icon><Plus /></el-icon>
                </el-button>
              </el-tooltip>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              <h3>其他</h3>
            </template>
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
              <el-table-column
                prop="defaultValue"
                label="Default"
                sortable
                width="200"
              >
                <template #default="scope">
                  <span v-show="!scope.row.edit">{{
                    scope.row.defaultValue
                  }}</span>
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
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        v-model="addCodeFlag"
        title="添加授权码"
        :show-close="false"
        :before-close="handleClose"
        width="440px"
        align-center
      >
        <el-form :model="user">
          <el-form-item label="授权码" label-width="60px">
            <el-input v-model="code.code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="备注" label-width="60px">
            <el-input v-model="code.info" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="addCodeSubmit">添加</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
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
    this.loadInfo();
    this.loadData();
    this.loadAuthorzationData();
  },

  data() {
    return {
      tableData: [],
      authorizationData: [],
      total: 0,
      small: false,
      background: false,
      pageListLoad: false,
      operationRow: {},
      infoLoad: false,
      addCodeFlag: false,
      activeName: ["0"],
      headPortrait: "",
      info: {
        articleNumber: 46,
        createTime: "2022-09-26T15:16:51.000+00:00",
        email: "xninng@163.com",
        fansNumber: 4,
        followNumber: 44,
        getLikes: 8,
        headPortrait: "周杰伦%20-%20七里香.jpg",
        id: "9wa9XkxL",
        info: "restfulToolkitX",
        name: "restfulToolkitX",
        nickname: "admin之我当然是管理了06",
        pageViewNumber: 145,
        site: "",
      },
      code: {},
      srcInfo: {},
      emailStatus: false,
      pwd: {
        old: "",
        newV: "",
        newV1: "",
      },
      pwdStatus: false,
      uploadInfo: false,
      token: { token: localStorage.getItem("tokenValue") },
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
        this.loadData();
      }
    },
    "pwd.newV"(newVal, oldVal) {
      this.handlePwd();
    },
    "pwd.newV1"(newVal, oldVal) {
      this.handlePwd();
    },
  },

  methods: {
    addCodeSubmit() {
      this.$axios
        .post("/user/setAuthorization", {
          code: this.code.code,
          info: this.code.info,
        })
        .then((res) => {
          if (res.code == "200") {
            if (res.code == "200") {
              this.$notify({
                message: "添加成功！",
                duration: 1000,
              });
              this.loadAuthorzationData();
              this.addCodeFlag = false;
            } else {
              this.$notify({
                message: res.message,
                duration: 1000,
              });
            }
          }
        });
    },
    handleClose() {
      this.addCodeFlag = false;
    },
    add() {
      this.addCodeFlag = true;
    },
    deleteCode(id) {
      this.$axios
        .post("/user/deleteAuthorization", {
          id: id,
        })
        .then((res) => {
          if (res.code == "200") {
            this.$notify({
              message: "删除成功！",
              duration: 1000,
            });
            this.loadAuthorzationData();
          } else {
            this.$notify({
              message: res.message,
              duration: 1000,
            });
          }
        });
    },
    uploadPwdSubmit() {
      console.log(!this.pwdStatus && this.pwd.newV != "");
      if (!this.pwdStatus && this.pwd.newV != "") {
        this.$axios
          .post("/user/update", {
            oldPassword: this.pwd.old,
            password: this.pwd.newV,
          })
          .then((res) => {
            if (res.code == "200") {
              this.$notify({
                message: "更新成功！",
                duration: 1000,
              });
            } else {
              this.$notify({
                message: res.message,
                duration: 1000,
              });
            }
          });
      }
    },
    uploadPwdCancle() {
      this.pwd.old = "";
      this.pwd.newV = "";
      this.pwd.newV1 = "";
    },
    handlePwd() {
      this.pwdStatus = !(this.pwd.newV === this.pwd.newV1);
    },
    handleEmail(s) {
      var reg =
        /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      this.emailStatus = !reg.test(s);
      return s;
    },
    uploadInfoSubmit() {
      this.$axios
        .post("/user/update", {
          nickname: this.info.nickname,
          email: this.info.email,
          info: this.info.info,
          headPortrait: this.info.headPortrait,
        })
        .then((res) => {
          if (res.code == "200") {
            this.$notify({
              message: "更新成功！",
              duration: 1000,
            });
          } else {
            this.$notify({
              message: res.message,
              duration: 1000,
            });
          }
          this.uploadInfo = false;
          this.loadInfo();
        });
    },
    uploadInfoCancle() {
      this.uploadInfo = false;
      this.emailStatus = false;
      Object.assign(this.info, this.srcInfo);
      this.headPortrait =
        this.$axios.serverAddress + "/file/image/" + this.info.headPortrait;
    },
    handleAvatarSuccess(response, uploadFile) {
      console.log("test success file:" + JSON.stringify(response.data[0]));
      this.headPortrait = this.$axios.serverAddress + response.data[0].url;
      this.info.headPortrait = response.data[0].title;
      this.uploadInfo = true;
    },
    handleUploadInfo() {
      this.uploadInfo = true;
    },
    loadInfo() {
      var id = localStorage.getItem("id");
      this.$axios
        .post("/user/info", {
          id: id,
        })
        .then((res) => {
          this.srcInfo = res.data;
          Object.assign(this.info, res.data);
          this.headPortrait =
            this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
          this.infoLoad = true;
        })
        .catch((err) => {
          console.log("system info:" + err);
        });
    },
    getPageInfo() {
      this.$axios.post("/admin/getAll", {}).then((res) => {
        if (res.code == "200") {
          this.total = res.data.total;
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
    loadAuthorzationData() {
      this.$axios.post("/user/getAuthorization", {}).then((res) => {
        if (res.code == "200") {
          this.authorizationData = res.data;
        }
      });
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
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

<style scoped>
.aCollapse {
	width: 100%;
	height: 100%;

	background-color: white;
}

.aCollapse #ac {
	padding: 8px 14px;
}

.t1 {
	padding: 8px 0;
	min-width: 100px;

	text-align: right;
}

.errorMessage {
	border: solid 1px red;
	border-radius: 4px;
}

.add {
	float: right;

	margin-right: 22px;
	padding: 8px 0;
}

</style>
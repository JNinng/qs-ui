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
            <div style="padding: 4px 4px 12px 4px; font-size: 16px">
              <span>您的接收链接：</span>
              {{ receiveLink }}
              <span>
                &nbsp;
                <el-icon @click="copyLink" class="isClick" size="18px"
                  ><CopyDocument
                /></el-icon>
              </span>
            </div>
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
            <div v-if="amendmentLoad">
              <el-divider content-position="left">资源校正</el-divider>
              <el-table
                :data="amendment.amendment.list"
                :default-sort="{ prop: 'date', order: 'descending' }"
                stripe
                border
                style="width: 100%"
                max-height="80vh"
                :v-if="pageListLoad"
              >
                <el-table-column
                  prop="createTime"
                  label="CreateTime"
                  sortable
                  fixed="left"
                  width="140"
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
                <el-table-column prop="articleId" label="资源 id">
                  <template #default="scope">
                    {{ scope.row.articleId }}
                  </template>
                </el-table-column>
                <el-table-column prop="dispose" label="处理信息">
                  <template #default="scope">
                    {{ scope.row.dispose }}
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" sortable>
                  <template #default="scope">
                    {{ scope.row.type }}
                  </template>
                </el-table-column>
                <el-table-column prop="info" label="备注">
                  <template #default="scope">
                    {{ scope.row.info }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="UpdateTime"
                  sortable
                  width="140"
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
                <el-table-column fixed="right" width="80">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      @click="amendmentUpdate(scope.row)"
                    >
                      <el-icon><Edit /></el-icon>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                v-model="updateAmendmentFlag"
                :title="updateAmendment.info"
                fullscreen="true"
                destroy-on-close="true"
              >
                <div>
                  <table style="width: 1024px">
                    <tr>
                      <td>
                        <el-input v-model="countValue" placeholder="修正值" />
                      </td>
                      <td>
                        <el-icon
                          class="amendmentSubmit"
                          size="24px"
                          @click="submitAmendment"
                          ><Promotion
                        /></el-icon>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-radio-group
                          v-model="amendmentIndex"
                          style="width: 100%"
                        >
                          <el-table
                            :data="updateArticleList"
                            :default-sort="{
                              prop: 'date',
                              order: 'descending',
                            }"
                            stripe
                            border
                            style="width: 1024px"
                          >
                            <el-table-column
                              prop="id"
                              label="ID"
                              sortable
                              width="110"
                            />
                            <el-table-column
                              prop="userId"
                              label="UserID"
                              sortable
                              width="110"
                            />
                            <el-table-column
                              fixed="left"
                              prop="title"
                              label="title"
                              show-overflow-tooltip
                              sortable
                              width="200"
                            >
                              <template #default="scope">
                                <span
                                  style="cursor: pointer"
                                  @click="goItem(scope.row.id)"
                                  >{{ scope.row.title }}</span
                                >
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="likeNum"
                              label="LikeNum"
                              sortable
                              width="110"
                            >
                              <template #default="scope">
                                <span>{{ scope.row.likeNum }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="pageView"
                              label="PageView"
                              sortable
                              width="110"
                            >
                              <template #default="scope">
                                <span>{{ scope.row.pageView }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="ip" label="IP" width="110">
                              <template #default="scope">
                                <span>{{ scope.row.ip }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="site"
                              label="Site"
                              width="80"
                            >
                              <template #default="scope">
                                <span>{{ scope.row.site }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="createTime"
                              label="CreateTime"
                              sortable
                            >
                              <template #default="scope">
                                <span>{{
                                  dateFormat(scope.row.createTime)
                                }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="updateTime"
                              label="UpdateTime"
                              sortable
                              width="180"
                            >
                              <template #default="scope">
                                <span>{{
                                  dateFormat(scope.row.updateTime)
                                }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="stick"
                              label="Stick"
                              sortable
                              width="90"
                            >
                              <template #default="scope">
                                <span>{{ scope.row.stick }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="stick"
                              label="Option"
                              sortable
                              fixed="right"
                              width="120"
                            >
                              <template #default="scope">
                                <el-radio :label="scope.row.id" size="large"
                                  >Option</el-radio
                                >
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-radio-group>
                      </td>
                    </tr>
                  </table>
                </div>
                <template #footer>
                  <div style="clear: both"></div>
                  <span class="dialog-footer">
                    <el-button @click="updateAmendmentFlag = false"
                      >返回管理</el-button
                    >
                  </span>
                </template>
              </el-dialog>
            </div>
            <el-divider content-position="left">map 配置</el-divider>
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
                <el-table-column
                  prop="value"
                  label="Value"
                  sortable
                  width="110"
                >
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
            </div>
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
import moment, { duration } from "moment";

export default {
  name: "SystemManagement",

  components: {},

  mixins: [],

  props: [],

  beforeMount() {
    this.loadInfo();
    this.loadAmendment();
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
      activeName: ["2"],
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
      receiveLink: "",
      pwdStatus: false,
      uploadInfo: false,
      token: { token: localStorage.getItem("tokenValue") },
      amendment: {
        page: 1,
        pageSize: 8,
      },
      updateAmendment: {},
      updateArticleList: [],
      updateAmendmentFlag: false,
      amendmentLoad: false,
      amendmentIndex: "",
      countValue: 100,
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
    submitAmendment() {
      this.$axios
        .post("/article/amendment", {
          id: this.updateAmendment.id,
          articleId: this.amendmentIndex,
          mode: 1,
          value: this.countValue,
          info: " ",
        })
        .then((res) => {
          this.$notify({
            message: res.message,
            duration: 1000,
          });
        });
    },
    amendmentUpdate(row) {
      this.updateAmendment = row;
      this.updateAmendmentFlag = true;
      var list = this.updateAmendment.articleId.split(",");
      for (var i = 0; i < list.length; i++) {
        this.$axios.get("/article/info/" + list[i], {}).then((res) => {
          if (res.code == "200") {
            this.updateArticleList.push(res.data);
          }
        });
      }
      this.amendmentIndex = list[0];
    },
    copyLink() {
      var tInput = document.createElement("input");
      tInput.value = this.receiveLink;
      document.body.appendChild(tInput);
      tInput.select();
      document.execCommand("copy");
      this.$notify({
        message: "复制成功！",
        duration: 1000,
      });
      document.body.removeChild(tInput);
    },
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
          this.receiveLink =
            this.$axios.serverAddress + "/transmission/receive/" + res.data.id;
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
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
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
    loadAmendment() {
      this.$axios
        .post("/article/getArticleAmendmentInfo", {
          page: this.amendment.page,
          pageSize: this.amendment.pageSize,
        })
        .then((res) => {
          if (res.code == "200") {
            this.amendment.amendment = res.data;
            if (res.data.list.length > 0) {
              this.amendment.page += this.amendment.page;
            }
            this.amendmentLoad = true;
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

.isClick {
  cursor: pointer;
}
</style>
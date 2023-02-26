<template>
  <div class="userRoot">
    <div class="userLeft">
      <div
        v-bind:class="{
          infoContent: true,
          visible: !isVisible,
          noVisible: isVisible,
        }"
      >
        <div class="info" v-if="infoLoad">
          <div class="infoHeader">
            <img :src="info.headPortrait" />
            <div>
              <el-popover
                placement="top-start"
                :width="200"
                trigger="hover"
                :content="info.nickname"
              >
                <template #reference>
                  <div>{{ info.nickname }}</div>
                </template>
              </el-popover>
            </div>
          </div>
          <div class="tag">
            <span class="item" @click="activeName = 'article'"
              >文章：{{ info.articleNumber }}</span
            >
            <el-divider id="divider" border-style="dashed" />
            <span class="item" @click="activeName = 'follow'"
              >关注：{{ info.followNumber }}</span
            >
            <el-divider id="divider" border-style="dashed" />
            <span class="item" @click="activeName = 'fans'"
              >粉丝：{{ info.fansNumber }}</span
            >
            <el-divider id="divider" border-style="dashed" />
            <span>总访问：{{ info.pageViewNumber }}</span>
          </div>
          <el-divider id="aDivider" border-style="dashed" />
          <div class="infoTagContent">
            <div>简介：{{ info.info }}</div>
            <div>创建时间：{{ getCreateTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="userRight">
      <el-tabs
        class="demo-tabs"
        v-model="activeName"
        type="border-card"
        @tab-change="handleClick"
      >
        <el-tab-pane label="文章" name="article">
          <div v-if="data.article.load">
            <ul
              v-infinite-scroll="loadArticle"
              infinite-scroll-immediate="true"
              style="overflow: auto"
              class="infinite-list"
            >
              <li
                v-for="(item, index) in data.article.data"
                :key="index"
                class="infinite-list-item"
                @click="gotoArticle(item.id)"
              >
                <div class="articleCardTitle">
                  {{ item.title }}
                </div>
                <div class="articleCardContent">
                  {{ item.content }}
                </div>
                <div class="articleCardTag">
                  {{ item.date }}
                </div>
              </li>
            </ul>
          </div>
          <div class="noData" v-else>暂无内容</div></el-tab-pane
        >
        <el-tab-pane label="收藏" name="favorite">
          <div v-if="data.favorite.load > 0">
            <ul
              v-infinite-scroll="loadFavorite"
              infinite-scroll-immediate="true"
              style="overflow: auto"
              class="infinite-list"
            >
              <li
                v-for="(item, index) in data.favorite.data"
                :key="index"
                class="infinite-list-item"
                @click="gotoArticle(item.id)"
              >
                <table>
                  <tr>
                    <td>
                      <div class="articleCardTitle">
                        {{ item.title }}
                      </div>
                      <div class="articleCardContent">
                        {{ item.content }}
                      </div>
                      <div class="articleCardTag">
                        {{ item.date }}
                      </div>
                    </td>
                    <td>
                      <el-button
                        v-if="isVisitor"
                        @click="cancelFavorite(item.id)"
                        >取消收藏</el-button
                      >
                    </td>
                  </tr>
                </table>
              </li>
            </ul>
          </div>
          <div class="noData" v-else>暂无内容</div>
        </el-tab-pane>
        <el-tab-pane label="关注" name="follow"
          ><div v-if="data.follow.load > 0">
            <ul
              v-infinite-scroll="loadFollow"
              infinite-scroll-immediate="true"
              style="overflow: auto"
              class="infinite-list"
            >
              <li
                v-for="(item, index) in data.follow.data"
                :key="index"
                class="relation-infinite-list-item"
              >
                <table style="width: 100%">
                  <tr>
                    <td style="width: 80px">
                      <div class="relationHeadPortrait">
                        <img
                          :src="imgBaseUrl + item.headPortrait"
                          @click="gotoUser(item.id)"
                        />
                      </div>
                    </td>
                    <td @click="gotoUser(item.id)">
                      <div class="relationName">
                        {{ item.name }}
                      </div>
                    </td>
                    <td style="width: 80px">
                      <div v-if="isVisitor">
                        <el-button @click="cancelFollow(item.id)"
                          >取消关注</el-button
                        >
                      </div>
                      <div v-else>
                        <el-button @click="addFollow(item.id)"
                          >添加关注</el-button
                        >
                      </div>
                    </td>
                  </tr>
                </table>
              </li>
            </ul>
          </div>
          <div class="noData" v-else>暂无内容</div></el-tab-pane
        >
        <el-tab-pane label="粉丝" name="fans"
          ><div v-if="data.fans.load > 0">
            <ul
              v-infinite-scroll="loadFans"
              infinite-scroll-immediate="true"
              style="overflow: auto"
              class="infinite-list"
            >
              <li
                v-for="(item, index) in data.fans.data"
                :key="index"
                class="relation-infinite-list-item"
              >
                <table style="width: 100%">
                  <tr>
                    <td style="width: 80px">
                      <div class="relationHeadPortrait">
                        <img
                          :src="imgBaseUrl + item.headPortrait"
                          @click="gotoUser(item.id)"
                        />
                      </div>
                    </td>
                    <td @click="gotoUser(item.id)">
                      <div class="relationName">
                        {{ item.name }}
                      </div>
                    </td>
                    <td style="width: 80px">
                      <div>
                        <el-button @click="addFollow(item.id)"
                          >添加关注</el-button
                        >
                      </div>
                    </td>
                  </tr>
                </table>
              </li>
            </ul>
          </div>
          <div class="noData" v-else>暂无内容</div></el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "User",

  components: {},

  mixins: [],

  props: {
    id: {
      type: String,
      default: "null",
    },
  },

  data() {
    return {
      isVisible: true,
      isVisitor: !(this.id != localStorage.getItem("id")),
      infoLoad: false,
      info: {},
      activeName: "article",
      count: 4,
      data: {
        article: {
          load: false,
          page: 1,
          pageSize: 8,
          data: [],
        },
        favorite: { load: false, page: 1, pageSize: 8, data: [] },
        follow: { load: false, page: 1, pageSize: 8, data: [] },
        fans: { load: false, page: 1, pageSize: 8, data: [] },
      },
      imgBaseUrl: this.$axios.serverAddress + "/file/image/",
    };
  },

  beforeMount() {
    this.loadInfo();
    this.loadArticle();
    this.loadFavorite();
    this.loadFollow();
    this.loadFans();
  },

  mounted() {},

  computed: {
    getCreateTime() {
      return moment(this.info.createTime).format("yyyy年MM月DD日");
    },
    getArticleContent() {},
  },

  created() {
    this.$store.watch(
      (state, getters) => {
        return state.config.isVisible;
      },
      () => {
        this.isVisible = this.$store.state.config.isVisible;
      }
    );
  },

  watch: {
    id(newValue, oldValue) {
      this.$router.go(0);
    },
  },

  methods: {
    cancelFavorite(id) {
      this.$axios
        .post("/article/deleteFavorite", {
          articleId: id,
        })
        .then((res) => {
          this.$notify({
            message: res.message,
            duration: 1000,
          });
        });
    },
    cancelFollow(id) {
      this.$axios
        .post("/user/cancelFollow", {
          bUserId: id,
        })
        .then((res) => {
          this.$notify({
            message: res.message,
            duration: 1000,
          });
        });
    },
    addFollow(id) {
      this.$axios
        .post("/user/follow", {
          bUserId: id,
        })
        .then((res) => {
          this.$notify({
            message: res.message,
            duration: 1000,
          });
        });
    },
    gotoArticle(id) {
      let routeData = this.$router.resolve({
        name: "mdView",
        params: {
          id: id,
        },
      });
      window.open(routeData.href, "_blank");
    },
    gotoUser(id) {
      let routeData = this.$router.resolve({
        name: "user",
        params: {
          id: id,
        },
      });
      window.open(routeData.href, "_blank");
    },
    loadInfo() {
      var id_;
      if (this.id == "null") {
        id_ = localStorage.getItem("id");
      }
      var that = this;
      this.$axios
        .post("/user/info", {
          id: this.id,
        })
        .then((res) => {
          this.info = res.data;
          this.info.headPortrait =
            that.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
          this.infoLoad = true;
        });
    },
    handleClick(name) {
      switch (name) {
        case "article":
          this.data.article.load = false;
          this.data.article.page = 1;
          this.data.article.data = [];
          this.loadArticle();
          break;
        case "favorite":
          this.data.favorite.load = false;
          this.data.favorite.page = 1;
          this.data.favorite.data = [];
          this.loadFavorite();
          break;
        case "follow":
          this.data.follow.load = false;
          this.data.follow.page = 1;
          this.data.follow.data = [];
          this.loadFollow();
          break;
        case "fans":
          this.data.fans.load = false;
          this.data.fans.page = 1;
          this.data.fans.data = [];
          this.loadFans();
          break;
      }
    },
    loadArticle() {
      var mode = "article";
      switch (mode) {
        case "article":
          this.$axios
            .post("/article/getIdListPage", {
              id:
                this.id && this.id != "null"
                  ? this.id
                  : localStorage.getItem("id"),
              page: this.data.article.page,
              pageSize: this.data.article.pageSize,
            })
            .then((res) => {
              if (res.data.list.length > 0) {
                this.data.article.page += 1;
                this.data.article.data = this.data.article.data.concat(
                  res.data.list
                );
                this.data.article.load = true;
              }
            });
          break;
      }
    },
    loadFavorite() {
      this.$axios
        .post("/article/getFavorite", {
          userId:
            this.id && this.id != "null" ? this.id : localStorage.getItem("id"),
          page: this.data.favorite.page,
          pageSize: this.data.favorite.pageSize,
        })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.data.favorite.page += 1;
            this.data.favorite.data = this.data.favorite.data.concat(
              res.data.list
            );
            this.data.favorite.load = true;
          }
        });
    },
    loadFollow() {
      this.$axios
        .post("/user/getFollow", {
          id:
            this.id && this.id != "null" ? this.id : localStorage.getItem("id"),
          page: this.data.follow.page,
          pageSize: this.data.follow.pageSize,
        })
        .then((res) => {
          if (res.data.userList.length > 0) {
            this.data.follow.page += 1;
            this.data.follow.data = this.data.follow.data.concat(
              res.data.userList
            );
            this.data.follow.userId = res.data.userId;
            this.data.follow.load = true;
          }
        });
    },
    loadFans() {
      this.$axios
        .post("/user/getFans", {
          id:
            this.id && this.id != "null" ? this.id : localStorage.getItem("id"),
          page: this.data.fans.page,
          pageSize: this.data.fans.pageSize,
        })
        .then((res) => {
          if (res.data.userList.length > 0) {
            this.data.fans.page += 1;
            this.data.fans.data = this.data.fans.data.concat(res.data.userList);
            this.data.fans.userId = res.data.userId;
            this.data.fans.load = true;
          }
        });
    },
  },
};
</script>

<style scoped>
.userRoot {
	display: flex;

	padding: 0 1%;
}

.noData {
	display: flex;

	color: grey;

	align-items: center;
	justify-content: center;
}

@media only screen and (min-width: 1199px) and (max-width: 1919px) {
	.userRoot {
		padding: 0 4%;
	}
}

@media only screen and (min-width: 1920px) {
	.userRoot {
		padding: 0 8%;
	}
}

.userLeft {
	display: block;

	width: 320px;
	min-width: 280px;
}

.userLeft .infoContent {
	position:         sticky;
	position: -webkit-sticky;

	margin: 0 0 4px 58px;
	padding: 2px 4px 4px 0;
	min-height: 400px;

	background-color: white;

	box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px;

	transition: all .4s;
}

.info >>> img {
	margin: -14px 0 0 -14px;
	border-radius: 50%;
	width: 86px;
	height: 86px;

	box-shadow: rgba(0, 0, 0, .8) 0 0 2px 4px,
	rgba(255, 255, 255, .8) 0 0 1px 6px;
}

.infoHeader {
	display: flex;

	margin-bottom: 4px;
}

.infoHeader img {
	float: left;
}

.infoHeader div {
	overflow: hidden;

	margin: 6px 2px 0 8px;
	height: 60px;

	font-size: 20px;
	white-space: prare-wp;

/* text-overflow: ellipsis; */
	word-wrap: break-word;
}

.info .tag {
	margin: 10px 8px 0 8px;

	font-size: 14px;
	font-weight: bold;
}

.info .tag .item:hover {
	color: red;

	cursor: pointer;
}

#divider {
	margin: 6px 0;
	width: 100%;
}

#aDivider {
	margin: 6px 0 20px 0;
}

.infoTagContent {
	margin: 10px 8px 0 8px;

	font-size: 14px;
	text-overflow: ellipsis;
	word-wrap: break-word;
}

.noVisible {
	top: 89px;
}

.visible {
	top: 24px;
}

.userRight {
	margin: 30px 58px 12px 2%;

/* max-width: 1200px; */
	width: 600px;

/* height: calc(90vh - 59px); */
	min-height: 406px;

	background-color: white;

	box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px;

	flex: 1;
}

.infinite-list {
	list-style: none;

	margin: 0;
	padding: 0;
	height: 70vh;
}

.infinite-list .infinite-list-item {
	/* display: flex; */
	margin: 10px;
	padding: 10px 8px;
	height: 110px;

	color: rgb(0, 0, 0);

/* background: rgb(236, 245, 255); */
	/* background: rgb(235, 247, 255); */

	box-shadow: rgba(9, 30, 66, .25) 0 1px 1px, rgba(9, 30, 66, .13) 0 0 1px 1px;

	cursor: pointer;

	/* align-items: center;
	justify-content: center; */
}

.infinite-list .infinite-list-item + .list-item {
	margin-top: 10px;
}

.articleCardTitle {
	overflow: hidden;

	width: 100%;

/* max-width: 800px; */
	height: 28px;

	font-size: 18px;
	white-space: normal;
	text-overflow: ellipsis;
}

.articleCardContent {
	display: -webkit-box;
	overflow: hidden;

	-webkit-box-orient: vertical;

	margin-top: 6px;
	height: 48px;

	font-size: 14px;
	line-height: 24px;
	white-space: normal;
	word-break: break-word;

	color: rgb(46, 46, 46);

	-webkit-line-clamp: 2;
}

.articleCardTag {
	margin-top: 8px;

	font-size: 14px;

	color: #666;
}

.infinite-list .relation-infinite-list-item {
	margin: 10px;
	padding: 10px 8px;
	height: 65px;

	color: rgb(0, 0, 0);

	box-shadow: rgba(9, 30, 66, .25) 0 1px 1px, rgba(9, 30, 66, .13) 0 0 1px 1px;

	cursor: pointer;
}

.relationHeadPortrait >>> img {
	float: left;

	border-radius: 50%;
	width: 60px;
	height: 60px;

	box-shadow: rgba(0, 0, 0, .8) 0 0 2px 4px,
	rgba(255, 255, 255, .8) 0 0 1px 6px;

	align-items: center;
}

.relationName {
	float: left;

	font-size: 20px;
}

</style>
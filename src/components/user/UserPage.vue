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
            <span class="item">文章：{{ info.articleNumber }}</span>
            <el-divider id="divider" border-style="dashed" />
            <span class="item">关注：{{ info.followNumber }}</span>
            <el-divider id="divider" border-style="dashed" />
            <span class="item">粉丝：{{ info.fansNumber }}</span>
            <el-divider id="divider" border-style="dashed" />
            <span>获得收藏：{{ info.getLikes }}</span>
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
        @tab-click="handleClick"
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
                  斯蒂芬闪光点发货所得到的多多多多多多多dddddddddddddddddddddddddddddddd胜多负少多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多
                </div>
                <div class="articleCardTag">
                  {{ item.date }}
                </div>
              </li>
            </ul>
          </div>
          <div class="noData" v-else>暂无内容</div></el-tab-pane
        >
        <el-tab-pane label="资源" name="resource">
          <div v-if="data.resource.load > 0">
            <ul
              v-infinite-scroll="loadResource"
              infinite-scroll-immediate="true"
              style="overflow: auto"
              class="infinite-list"
            >
              <li
                v-for="(item, index) in data.article.data"
                :key="index"
                class="infinite-list-item"
              >
                <div class="articleCardTitle">
                  {{ item.title }}
                </div>
                <div class="articleCardContent"></div>
                <div class="articleCardTag">
                  {{ item.date }}
                </div>
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
                class="infinite-list-item"
              >
                <div class="articleCardTitle">
                  {{ item.title }}
                </div>
                <div class="articleCardContent"></div>
                <div class="articleCardTag">
                  {{ item.date }}
                </div>
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
                class="infinite-list-item"
              >
                <div class="articleCardTitle">
                  {{ item.title }}
                </div>
                <div class="articleCardContent"></div>
                <div class="articleCardTag">
                  {{ item.date }}
                </div>
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
        resource: { load: false, page: 1, pageSize: 8, data: [] },
        follow: { load: false, page: 1, pageSize: 8, data: [] },
        fans: { load: false, page: 1, pageSize: 8, data: [] },
      },
    };
  },

  beforeMount() {
    this.loadInfo();
    this.loadArticle();
    this.loadFollow();
    this.loadFans();
  },

  mounted() {},

  computed: {
    getCreateTime() {
      return moment(this.info.createTime).format("yyyy年MM月DD日");
    },
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

  watch: {},

  methods: {
    gotoArticle(id) {
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
    },
    loadInfo() {
      var id_;
      if (this.id == "null") {
        id_ = localStorage.getItem("id");
      }
      var that = this;
      this.$axios
        .post("/user/info", {
          id: id_,
        })
        .then((res) => {
          this.info = res.data;
          this.info.headPortrait =
            that.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
          this.infoLoad = true;
        });
    },
    handleClick() {},
    loadArticle() {
      var mode = "article";
      switch (mode) {
        case "article":
          console.log(
            "test :" +
              this.data.article.page +
              "++" +
              this.data.article.pageSize
          );
          this.$axios
            .post("/article/getIdListPage", {
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
    loadResource() {},
    loadFollow() {},
    loadFans() {},
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
	max-width: 1200px;

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
	height: 100px;

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

	max-width: 800px;

	font-size: 18px;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.articleCardContent {
	display: -webkit-box;
	overflow: hidden;

	-webkit-box-orient: vertical;

	margin-top: 6px;

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

</style>
<template>
  <div class="homeRoot">
    <div class="homeContent">
      <div class="homeTop" v-if="topLoad">
        <el-carousel height="280px">
          <el-carousel-item v-for="(item, index) in topData" :key="index">
            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
            <div class="topTitle">{{ item.title }}</div>
            <div id="mdView" @click="goItem(topIdList[index])">
              <MdViewer :content="item.content"></MdViewer>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="homeLeft">
        <div class="tagCard">
          <div v-for="(item, index) in tagList" :key="index">
            <div v-if="item.sum >= 8">
              <tag-list-card
                class="tagListCard"
                :id="item.id"
                :tagName="item.name"
                mode="tag"
              ></tag-list-card>
              <el-divider id="divider" border-style="solid" />
            </div>
          </div>
        </div>
      </div>
      <div class="homeRight">
        <div class="rightCard">
          <div>
            <div class="itemTitle">今日热榜</div>
            <div v-for="(item, index) in hotData" :key="index">
              <div class="hotItem" @click="goItem(item.id)">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="rightCard">
          <div class="itemTitle">来看看吧</div>
          <div v-for="(item, index) in timelineData" :key="index">
            <div class="hotItem" @click="goItem(item.id)">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="content" ref="content" v-if="isShow">
      <div v-for="(item, index) in listPage.list" :key="index">
        <MdListCard :index="item.id + ''"></MdListCard>
      </div>
    </div> -->
      <!-- <div style="text-align: center">
      <el-button round @click="loadNextPage">继续</el-button>
    </div> -->
    </div>
  </div>
</template>

<script>
import TagListCard from "@/components/home/item/TagListCard";
import MdViewer from "@/components/MdViewer";

export default {
  name: "Home",

  components: {
    MdViewer,
    TagListCard,
  },

  mixins: [],

  props: {},

  data() {
    return {
      tagLoad: false,
      topLoad: false,
      tagList: [],
      topIdList: [
        "qPz9okBaj35m",
        "kjWmaQ9ardJ2",
        "1LkD4YXoMZx7",
        "bwOea6d4JYnK",
      ],
      topData: [],
      content: [],
      hotData: [],
      timelineData: [],
    };
  },

  computed: {},

  watch: {
    // "$store.state.home.listPage.list": {
    //   handler(newValue, oldValue) {
    //     this.isShow = false;
    //     this.$nextTick(() => {
    //       this.listPage.list = this.$store.state.home.listPage.list;
    //       this.isShow = true;
    //     });
    //   },
    // },
  },

  created() {},

  methods: {
    loadTimelineData() {
      this.$axios
        .post("/article/getIdListPage", {
          page: 1,
          pageSize: 10,
        })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.timelineData = res.data.list;
          }
        });
    },
    getTopContent() {
      for (var i = 0; i < this.topIdList.length; i++) {
        this.$axios
          .get("/article/preview/" + this.topIdList[i], {})
          .then((res) => {
            //请求成功
            this.topData.push(res.data);
          })
          .catch((err) => {
            console.log("test get err" + JSON.stringify(err));
          });
      }
      this.topLoad = true;
    },
    more() {},
    loadNextPage() {
      this.$axios
        .post("/tag/allTag", {})
        .then((res) => {
          this.tagList = res.data;
          this.tagLoad = true;
        })
        .catch((err) => {
          console.log("test post tag all:" + err);
        });
    },
    goItem(id) {
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
    },
    loadHot() {
      this.$axios.post("/article/hot", {}).then((res) => {
        if ((res.code = "200" && res.data.list.length > 0)) {
          this.hotData = res.data.list;
        }
      });
    },
  },

  mounted() {
    this.loadHot();
  },

  beforeMount() {
    this.getTopContent();
    this.loadNextPage();
    this.loadTimelineData();
  },

  computed: {
    styleVar() {
      return this.contextHeight;
    },
  },
};
</script>

<style scoped>
.homeRoot {
	display: flex;
}

.homeContent {
	display: flex;

	padding: 20px 2%;
	width: 100%;
	min-width: 980px;

	justify-content: center;

/* align-items: center; */
	/* background-color: ivory; */
	flex-wrap: wrap;
}

#mdView {
	overflow: hidden;

	height: 78%;

	cursor: pointer;
}

.homeTop {
	float: left;
	overflow: hidden;

	margin-bottom: 12px;

/* padding: 8px 6px; */
	width: calc(60% + 300px + 1% + 12px);
	height: 280px;

	background-color: white;

	box-shadow: rgba(9, 30, 66, .25) 0 1px 1px, rgba(9, 30, 66, .13) 0 0 1px 1px;
}

.itemTitle {
	overflow: hidden;

	border-bottom: solid 1px rgba(119, 119, 119, .314);
	padding-bottom: 1px;

	font-size: 20px;
	font-weight: bold;
}

.hotItem {
	overflow: hidden;

	height: 28px;

	line-height: 28px;
	white-space: nowrap;
	text-overflow: ellipsis;

	cursor: pointer;
}

.hotItem:hover {
	background-color: rgba(219, 219, 219, .314);
}

.topTitle {
	margin: 6px 20px;
}

.homeLeft {
	float: left;

	padding: 8px 6px;
	width: 60%;
	min-width: 296px;

	background-color: white;

	box-shadow: rgba(9, 30, 66, .25) 0 1px 1px, rgba(9, 30, 66, .13) 0 0 1px 1px;
}

.homeRight {
	margin-left: 1%;
	width: 300px;
}

#divider {
	margin: 6px 0;
}

.rightCard {
	margin-bottom: 8px;
	padding: 8px 6px;

/* height: 200px; */

	background-color: white;

	box-shadow: rgba(9, 30, 66, .25) 0 1px 1px, rgba(9, 30, 66, .13) 0 0 1px 1px;
}

.el-carousel__item {
	background-color: #d3dce6;
}

</style>

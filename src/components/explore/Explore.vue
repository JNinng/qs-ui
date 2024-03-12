<template>
  <div class="exploreRoot">
    <div class="exploreContent">
      <div class="exploreItem" v-if="topData.load">
        <div class="tagName">最近有什么</div>
        <div
          class="item"
          v-for="(item, index) in topData.list"
          :key="index"
          @click="goItem(item.id)"
        >
          <div class="itemTitle">
            {{ item.title }}
          </div>
          <div class="flex-grow" />
          <div class="date">{{ item.date }}</div>
          <span>&nbsp;>></span>
          <div style="clear: both"></div>
        </div>
      </div>
      <div
        class="exploreItem et2"
        v-for="(item, index) in itemData.list"
        :key="index"
      >
        <div>
          <tag-list-card
            :id="item.id"
            :tagName="item.name"
            mode="tag"
          ></tag-list-card>
          <el-divider id="divider" border-style="solid" />
        </div>
      </div>
      <div class="exploreItem">
        <table style="width: 100%">
          <tr>
            <td style="width: 20px">
              <el-button @click="submitName"
                ><el-icon size="20px"><Promotion /></el-icon
              ></el-button>
            </td>
            <td>
              <el-input v-model="bottomData.name" />
            </td>
          </tr>
        </table>
        <div class="tagList">
          <div
            class="item"
            v-for="(item, index) in bottomData.list"
            :key="index"
            @click="goItem(item.id)"
          >
            <div class="itemTitle">
              {{ item.title }}
            </div>
            <div class="flex-grow" />
            <div class="date">{{ item.date }}</div>
            <span>&nbsp;>></span>
            <div style="clear: both"></div>
          </div>
        </div>
        <el-divider id="divider" border-style="solid" />
      </div>
    </div>
  </div>
</template>

<script>
import TagListCard from "@/components/home/item/TagListCard";

export default {
  name: "Explore",

  components: {
    TagListCard,
  },

  mixins: [],

  props: [],

  data() {
    return {
      topData: {
        load: false,
        page: 0,
        pageSize: 12,
        idList: [],
        list: [],
      },
      itemData: {
        load: false,
        list: [],
      },
      bottomData: {
        load: false,
        name: "",
        page: 0,
        pageSize: 8,
      },
    };
  },

  beforeMount() {
    this.loadTopData();
    this.loadNextPage();
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    submitName() {
      this.$axios
        .post("/tag/getIdListPageByName", {
          name: this.bottomData.name,
          page: 1,
          pageSize: 8,
        })
        .then((res) => {
          this.bottomData.list = res.data.list;
        })
        .catch((err) => {
          console.log("test post err:" + err);
        });
    },
    goItem(id) {
      // let routeData =
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
      // window.open(routeData.href, "_blank");
    },
    loadTopData() {
      this.$axios
        .post("/article/getIdListPage", {
          page: this.topData.page,
          pageSize: this.topData.pageSize,
        })
        .then((res) => {
          if ((res.code = "200")) {
            this.topData.list = res.data.list;
            this.topData.load = true;
          }
        });
    },
    loadNextPage() {
      this.$axios
        .post("/tag/allTag", {})
        .then((res) => {
          this.itemData.list = res.data.splice(0, 4);
          this.itemData.load = true;
        })
        .catch((err) => {
          console.log("test post tag all:" + err);
        });
    },
  },
};
</script>

<style scoped>
.exploreRoot {
  display: flex;
  width: 100%;
  justify-content: center;
}

.exploreContent {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px calc(2% + 20px + 24px + 1%);
  /* justify-content: center; */
}

.exploreItem {
  width: 100%;
  padding: 8px 6px;
  margin: 10px 2% 0 0;
  overflow: hidden;
  background-color: white;

  box-shadow: rgba(9, 30, 66, 0.25) 0 1px 1px, rgba(9, 30, 66, 0.13) 0 0 1px 1px;
}

.et2 {
  width: calc(50% - calc(2% + 12px));
}

#divider {
  margin: 8px 0 6px 0;
}

.tagName {
  overflow: hidden;

  padding-bottom: 1px;

  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.itemTitle {
  display: -webkit-box;
  float: left;
  overflow: hidden;

  -webkit-box-orient: vertical;

  min-width: 120px;

  white-space: normal;
  word-break: break-word;

  -webkit-line-clamp: 1;
}

.item {
  display: flex;

  border-bottom: solid 0.6px rgba(102, 102, 102, 0.0686);
  padding-top: 8px;

  font-size: 14px;

  color: #666;

  cursor: pointer;
}

.date {
  float: right;

  min-width: 120px;
}
</style>
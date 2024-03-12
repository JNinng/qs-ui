<template>
  <div class="root">
    <div class="content">
      <div class="tags">
        <div>
          <h1>
            {{ tagName }}
          </h1>
        </div>
        <div class="items" v-if="articleLoad">
          <div
            class="item"
            v-for="(item, index) in tagArticleList"
            :key="index"
          >
            <div class="date">{{ item.date }}&nbsp;</div>
            <div class="articleTitle" @click="goto(item.id)">
              {{ item.title }}
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <el-button round @click="postArticle(tagName, true)">继续</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tag",

  components: {},

  mixins: [],

  props: {
    tagName: {
      type: String,
      default: "null",
    },
  },

  data() {
    return {
      articleLoad: false,
      tagArticleList: [],
      page: 1,
      pageSize: 4,
    };
  },

  beforeMount() {
    this.postArticle(this.tagName, false);
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    goto(id) {
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
    },
    // mode: false 首次加载
    postArticle(tagName, mode) {
      if (mode) {
        this.page += 1;
      }
      this.$axios
        .post("/tag/getIdListPageByName", {
          name: tagName,
          page: mode ? this.page : 1,
          pageSize: 8,
        })
        .then((res) => {
          const data = res.data;
          if (data.list.length > 0) {
            this.tagArticleList = this.tagArticleList.concat(data.list);
            this.page = data.page;
            this.pageSize = data.pageSize;
          } else {
            this.page -= 1;
          }
          this.articleLoad = true;
        })
        .catch((err) => {
          console.log("test post err:" + err);
          if (mode) {
            this.page -= 1;
          }
        });
    },
  },
};
</script>

<style  scoped>
.root {
  width: 100%;
  min-width: 240px;

  /* background-color: ivory; */
}

.content {
  padding: 10px 4% 20px 4%;
  width: 78%;

  /* background-color: ivory; */

  transform: translate3d(8.1%, 0, 0);
}

@media (min-width: 768px) {
  .content {
    padding: 10px 4% 20px 4%;
    width: 64%;

    transform: translate3d(19.44%, 0, 0);
  }
}

.tags {
  position: relative;

  padding: 20px 18px 18px 18px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}

.items {
  padding-top: 18px;
}

.item {
  margin: 0 18px 8px 18px;
  border-width: 1px;
  border-color: rgb(206, 206, 206);
  border-bottom-style: dashed;
  padding: 0 0 8px 0;
}

.item:hover {
  border-width: 1.5px;
  border-color: rgb(0, 0, 0);
  border-bottom-style: solid;

  cursor: pointer;
}

.articleTitle {
  margin-left: 140px;
  height: 100%;
  overflow: hidden;
}

.date {
  float: left;

  width: 140px;
  height: 100%;

  color: gray;
}
</style>
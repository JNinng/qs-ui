<template>
  <div class="root">
    <div class="content">
      <div class="tags">
        <el-tag
          v-for="(item, index) in tagList"
          :key="index"
          :class="{
            tag: true,
            tag_2: index != 0,
            active: index == activeIndex,
            zero_article: zero && item.sum == 0,
          }"
          @click="toTag(item, index)"
        >
          {{ item.name }}&nbsp;({{ item.sum }})
        </el-tag>
        <el-tag
          type="info"
          :class="{ tag: true, tag_2: true, zero: zero }"
          @click="onZero"
        >
          {{ zeroTagContent }}
        </el-tag>
        <div class="items" v-if="articleLoad">
          <div
            class="item"
            v-for="(item, index) in getNowTagArticleList"
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
      <el-button round @click="postArticle(tagList[activeIndex].name, true)"
        >继续</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Tag",

  components: {},

  mixins: [],

  props: [],

  data() {
    return {
      tagLoad: false,
      articleLoad: false,
      checked: ref(false),
      activeIndex: 0,
      zero: false,
      zeroTagContent: ">>",
      tagList: [],
      tagArticleList: [],
      page: 1,
      pageSize: 4,
    };
  },

  beforeMount() {
    this.$axios
      .post("/tag/allTag", {})
      .then((res) => {
        this.tagList = res.data;
        this.zero = this.tagList[this.tagList.length - 1].sum == 0;
        this.postArticle(this.tagList[0].name, false);
        this.tagLoad = true;
      })
      .catch((err) => {
        console.log("test post tag all:" + err);
      });
  },

  mounted() {},

  computed: {
    getNowTagArticleList() {
      if (this.tagLoad) {
        const tagName = this.tagList[this.activeIndex].name;
        let tIndex;
        this.tagArticleList.forEach((item, index) => {
          if (item.name == tagName) {
            tIndex = index;
          }
        });
        return this.tagArticleList[tIndex].data.list;
      }
    },
  },

  created() {},

  watch: {},

  methods: {
    onChange(stauts) {
      this.checked.value = stauts;
    },
    toTag(tag, index) {
      this.page = 1;
      this.activeIndex = index;
      this.postArticle(tag.name, false);
    },
    onZero() {
      this.zero = !this.zero;
      this.zeroTagContent = this.zero ? ">>" : "<<";
    },
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
      console.log("test post:" + JSON.stringify(tagName) + " " + mode);
      if (mode) {
        this.page += 1;
      }
      this.$axios
        .post("/tag/getIdListPageByName", {
          name: tagName,
          page: mode ? this.page : 1,
          pageSize: 4,
        })
        .then((res) => {
          const data = res.data;
          let flag = false;
          let tIndex = 0;
          this.tagArticleList.forEach((item, index) => {
            if (item.name == tagName) {
              flag = true;
              tIndex = index;
            }
          });
          if (flag) {
            if (this.tagArticleList[tIndex].data.page < data.page) {
              if (data.list.length > 0) {
                this.tagArticleList[tIndex].data.list = this.tagArticleList[
                  tIndex
                ].data.list.concat(data.list);
                this.tagArticleList[tIndex].data.page = data.page;
                this.tagArticleList[tIndex].data.pageSize = data.pageSize;
              } else {
                this.page -= 1;
              }
            }
          } else {
            this.tagArticleList.push({ name: tagName, data: data });
            this.articleLoad = true;
          }
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

  background-color: ivory;

  transform: translate3d(8.1%, 0, 0);
}

@media (min-width: 768px) {
  .content {
    padding: 10px 4% 20px 4%;
    width: 64%;

    background-color: ivory;

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

.tag {
  font-size: 16px;
  padding: 0 9px;
  margin: 4px 0;
}

.tag_2 {
  margin-left: 12px;
}

.zero_article {
  display: none;
}

.active {
  color: rgb(62, 128, 255);
  background-color: #ecf5ff;
  border: 2px solid rgb(90, 141, 223);
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
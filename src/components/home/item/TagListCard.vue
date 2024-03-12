<template>
  <div class="tagListCardRoot">
    <div class="tagName" @click="goTag">{{ data.name }}</div>
    <div class="tagList">
      <div
        class="item"
        v-for="(item, index) in data.list"
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
  </div>
</template>

<script>
export default {
  name: "TagListCard",

  components: {},

  mixins: [],

  props: {
    id: {
      type: String,
      default: "null",
    },
    tagName: {
      type: String,
      default: "null",
    },
    mode: {
      type: String,
      default: "tag",
    },
  },

  data() {
    return {
      data: {
        name: "",
        link: "",
        list: [],
      },
    };
  },

  beforeMount() {
    this.loadTag();
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    loadTag() {
      this.data.name = this.tagName;
      this.$axios
        .post("/tag/getIdListPageByName", {
          name: this.tagName,
          page: 1,
          pageSize: 8,
        })
        .then((res) => {
          this.data.list = res.data.list;
        })
        .catch((err) => {
          console.log("test post err:" + err);
        });
    },
    goTag() {
      this.$router.push({
        name: "tag",
        query: {
          tagName: this.tagName,
        },
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
  },
};
</script>

<style scoped>
.tagListCardRoot {
  /* padding: 8px 6px; */
  min-width: 300px;
}

.tagName {
  overflow: hidden;

  padding-bottom: 1px;

  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
}

.tagList .item {
  display: flex;

  border-bottom: solid 0.6px rgba(102, 102, 102, 0.0686);
  padding-top: 8px;

  font-size: 14px;

  color: #666;

  cursor: pointer;
}

.tagList .item:hover {
  background-color: rgba(219, 219, 219, 0.314);
}

.tagList .itemTitle {
  display: -webkit-box;
  float: left;
  overflow: hidden;

  -webkit-box-orient: vertical;

  min-width: 120px;

  white-space: normal;
  word-break: break-word;

  -webkit-line-clamp: 1;
}

.tagList .date {
  float: right;

  min-width: 120px;
}
</style>
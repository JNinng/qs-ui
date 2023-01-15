<template>
  <div class="mdListCardRoot">
    <div class="content" ref="content">
      <div class="mdListCardHead">
        <div class="mdTitel link" @click="goto">{{ getTitel }}</div>
        <div class="mdInfo">
          <div class="mdData link">{{ getUpdateDate }}</div>

          <div class="mdClassify link">{{ getClassify }}</div>

          <div class="mdTag link" v-for="(tag, index) in getTags" :key="index">
            {{ tag }}
          </div>
          <!-- {{ id }} | {{ getUpdateDate }} |
          <div class="hidden-xs-only">{{ getClassify }} | {{ getTag }}</div> -->
        </div>
      </div>
      <MdViewer :index="index"></MdViewer>
      <div class="read" @click="goto">阅读全部</div>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";
import "element-plus/theme-chalk/display.css";
import "@/assets/css/link.css";

export default {
  name: "MdListCard",

  components: {
    MdViewer,
  },

  mixins: [],

  props: ["index"],

  data() {
    return {};
  },

  watch: {},

  created() {},

  watch: {},

  methods: {
    goto: function () {
      this.$router.push({
        name: "mdIndex",
        params: {
          index: this.index,
        },
      });
    },
  },
  computed: {
    getIndex() {
      return this.$store.state.abstractPage.abstracList[this.index].id;
    },
    getTitel() {
      console.log("test:" + this.index);
      this.titel = this.$store.state.abstractPage.abstracList[this.index].titel;
      return this.titel;
    },
    getUpdateDate() {
      this.updateDate =
        this.$store.state.abstractPage.abstracList[this.index].updateDate;
      console.log("测试updaDate：" + this.updateDate);
      return this.updateDate;
    },
    getClassify() {
      this.classify =
        this.$store.state.abstractPage.abstracList[this.index].classify;
      console.log("测试classify：" + this.classify);
      return this.classify;
    },
    getTags() {
      this.tags = this.$store.state.abstractPage.abstracList[this.index].tag;
      this.tags = this.tags.split(",");
      return this.tags;
    },
  },
};
</script>

<style scoped>
.content {
  position: relative;

  padding-top: 20px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}

.mdListCardHead {
  overflow: hidden;
}

.mdListCardHead div {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mdTitel {
  display: flex;

  font-size: 18px;
  line-height: 18px;

  justify-content: center;
}

.mdInfo {
  display: flex;

  padding: 10px 0 10px 0;

  font-size: 12px;
  line-height: 12px;

  color: rgb(102, 102, 102);

  justify-content: center;
}

.mdInfo div {
  padding-left: 10px;
}

.read {
  position: absolute;

  /* left: -10px; */
  bottom: -4px;
  left: 50%;

  /* backdrop-filter: blur(2px); */
  /* -webkit-backdrop-filter: blur(2px); */

  border-radius: 10px;
  width: 26%;
  height: 28px;

  font-size: 14px;
  line-height: 28px;
  text-align: center;

  background: rgb(255, 255, 255);

  box-shadow: 0 0 2px 0 rgba(31, 38, 135, 0.37);

  transform: translate3d(-50%, -38%, 0);
}

.read:hover {
  box-shadow: 0 0 14px rgba(66, 158, 250, 0.8);
}
</style>
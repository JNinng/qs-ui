<template>
  <div class="root">
    <div class="content">
      <div class="timelintHeader">
        <span class="dateHeader">{{ monthItem.date }}&nbsp;</span>
        <span class="sum">{{ monthItem.idList.length }}篇</span>
        <!-- <svg-icon icon-class="add"></svg-icon> -->
        <!-- <svg class="svgIcon" aria-hidden="true">
          <use :xlink:href="`#icon-add`" @click="visible"></use>
        </svg> -->
        <el-button class="more" circle size="small" @click="visible"
          >></el-button
        >
      </div>
      <div
        :class="{ list: true, visible: isVisible }"
        :style="setStyle"
        ref="aList"
      >
        <div v-for="(item, index) in monthItem.idList" :key="index">
          <div class="item">
            <div class="date">{{ item.date }}&nbsp;</div>
            <div class="articleTitle" @click="goto(item.id)">
              {{ item.title }}
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div ref="aBottom"></div>
    </div>
  </div>
</template>

<script>
// import "@/assets/svg/add.svg";
// import SvgIcon from "@/components/svgIcon";

export default {
  name: "TimelineMonth",

  components: {},

  props: ["monthItem"],

  data() {
    return {
      isVisible: false,
      listHeight: "",
      bottom: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.listHeight = this.$refs.aBottom.offsetTop + "px";
    });
  },

  computed: {
    setStyle() {
      return {
        "--listHeight": this.listHeight,
      };
    },
  },

  watch: {},

  methods: {
    goto: function (id) {
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
    },
    visible: function () {
      console.log("test : xisible");
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style scoped>
.root {
  margin: 0 0 8px 0;
  width: 100%;

  background-color: ivory;
}

.content {
  position: relative;

  padding-top: 20px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}

.timelintHeader {
  margin: 0 18px 18px 18px;
}

.dateHeader {
  font-size: 20px;
  font-weight: bold;
}

.svgIcon {
  margin-left: 10px;
  width: 20px;
  height: 20px;

  vertical-align: text-bottom;

  color: gray;

  fill: currentColor;
}

.svgIcon:hover {
  color: rgb(64, 67, 255);
}

.sum {
  color: gray;
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

.date {
  float: left;

  width: 50px;
  height: 100%;

  color: gray;
}

.articleTitle {
  margin-left: 65px;
  height: 100%;
}

.list {
  overflow: hidden;

  max-height: var(--listHeight);

  /* transition-timing-function: cubic-bezier(0.32, 0.13, 0.5, 0.9); */

  transition-duration: 0.3s;

  /* transition-property: all; */
}

.visible {
  max-height: 0;
}

.more {
  margin-left: 4px;

  transform: translateY(-1px);
}
</style>
<template>
  <div class="root">
    <div class="content">
      <div v-for="(item, index) in timeline" :key="index">
        <div v-if="item.idList.length > 0">
          <timeline-month
            class="timelineItem"
            :monthItem="item"
          ></timeline-month>
        </div>
      </div>
    </div>
    <div style="text-align: center"><el-button round>继续</el-button></div>
  </div>
</template>

<script>
import moment from "moment";
import TimelineMonth from "@/components/timeline/TimelineMonth";

export default {
  name: "Timeline",

  components: {
    TimelineMonth,
  },

  mixins: [],

  props: {},

  data() {
    return {
      timeline: [],
    };
  },

  mounted() {
    for (let index = moment().format("M"); index > 0; index--) {
      this.$axios
        .post("/article/timeline", {
          date: moment().format("YYYY") + "-" + index + "-01 00:00:00",
        })
        .then((res) => {
          this.timeline.push(res.data);
        })
        .catch((err) => {
          console.log("test:" + err);
        });
    }
    this.$axios
      .post("/article/timeline", {
        date: "2022" + "-" + "12" + "-01 00:00:00",
      })
      .then((res) => {
        this.timeline.push(res.data);
      })
      .catch((err) => {
        console.log("test:" + err);
      });
    this.$axios
      .post("/article/timeline", {
        date: "2022" + "-" + "11" + "-01 00:00:00",
      })
      .then((res) => {
        this.timeline.push(res.data);
      })
      .catch((err) => {
        console.log("test:" + err);
      });
    this.$axios
      .post("/article/timeline", {
        date: "2022" + "-" + "10" + "-01 00:00:00",
      })
      .then((res) => {
        this.timeline.push(res.data);
      })
      .catch((err) => {
        console.log("test:" + err);
      });
  },

  computed: {},

  created() {},

  methods: {},

  watch: {},

  methods: {},
};
</script>

<style scoped>
.root {
  width: 100%;

  background-color: ivory;
}

.content {
  padding: 10px 4% 20px 4%;
  width: 64%;

  background-color: ivory;

  /* 瀑布流主框 */
  /* box-shadow: rgba(0, 0, 0, 0.35) 0 5px 8px; */

  transform: translate3d(19.44%, 0, 0);
}
</style>
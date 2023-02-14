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
    <div style="text-align: center">
      <el-button round @click="more">继续</el-button>
    </div>
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

  mounted() {},

  beforeMount() {
    // this.loadNextArticle();
    this.loadYearArticle();
  },

  computed: {},

  created() {},

  methods: {
    more() {
      console.log(
        "test data: " +
          moment(this.$store.state.timeline.currentDate)
            .subtract(1, "M")
            .format("YYYY-MM")
      );
      this.loadMonthArticle(
        this.$store.state.timeline.currentDate + "-01 00:00:00",
        true
      );
      this.$store.state.timeline.currentDate = moment(
        this.$store.state.timeline.currentDate
      )
        .subtract(1, "M")
        .format("YYYY-MM");
    },
    // mode:true 单月递增，false 首加载
    loadMonthArticle(date, mode) {
      this.$axios
        .post("/article/timeline", {
          date: date,
        })
        .then((res) => {
          if (res.data.idList.length > 0) {
            this.timeline.push(res.data);
          } else if (mode) {
            this.$store.state.timeline.currentDate = moment(
              this.$store.state.timeline.currentDate
            )
              .add(1, "M")
              .format("YYYY-MM");
          }
        })
        .catch((err) => {
          console.log("test:" + err);
        });
    },
    loadYearArticle() {
      for (
        let index = moment(this.$store.state.timeline.currentDate).format("M");
        index > 0;
        index--
      ) {
        this.loadMonthArticle(
          moment().format("YYYY") + "-" + index + "-01 00:00:00",
          false
        );
      }
      this.$store.state.timeline.currentDate =
        moment().subtract(1, "y").format("YYYY") + "-12";
    },
  },

  watch: {},
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
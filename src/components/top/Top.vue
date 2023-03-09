<template>
  <div class="topRoot">
    <div class="topContent" v-if="load">
      <div v-for="(item, index) in topList" :key="index">
        <div class="topItem">
          <h2 class="topName">{{ item }}</h2>
          <ul>
            <li
              style="cursor: pointer"
              v-for="(aItem, index) in hotData[item]"
              :key="index"
              @click="goItem(aItem.id)"
            >
              {{ aItem.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",

  components: {},

  mixins: [],

  props: [],

  data() {
    return {
      load: false,
      topList: ["日榜", "月榜"],
      hotData: {},
    };
  },

  beforeMount() {
    this.loadHot();
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    loadHot() {
      for (const i in this.topList) {
        var mode = 0;
        switch (this.topList[i]) {
          case "日榜":
            mode = 0;
            break;
          case "月榜":
            mode = 1;
            break;
        }
        this.$axios
          .post("/article/hot", {
            mode: mode,
            top: 10,
          })
          .then((res) => {
            if ((res.code = "200" && res.data.list.length > 0)) {
              this.hotData[this.topList[i]] = res.data.list;
            }
          });
      }
      this.load = true;
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

<style  scoped>
.topRoot {
  display: flex;
  width: 100%;
  justify-content: center;
}

.topContent {
  display: flex;
  flex-wrap: wrap;
  width: 100vh;
  padding: 10px calc(2% + 20px + 24px + 1%);
  /* justify-content: center; */
}

.topItem {
  background-color: white;

  box-shadow: rgba(9, 30, 66, 0.25) 0 1px 1px, rgba(9, 30, 66, 0.13) 0 0 1px 1px;
  padding: 0 8px;
  margin: 4px 0;
  width: 100vh;
  overflow: hidden;
}

.topName {
  counter-reset: index;
  padding: 6px 0 0 12px;
}

ul {
  counter-reset: index;
  padding: 0;
  width: 100%;
  /* max-width: 300px; */
}

li {
  counter-increment: index;
  display: flex;
  align-items: center;
  padding: 12px 0;
  box-sizing: border-box;
}

li::before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 22px;
  text-align: right;
  font-weight: bold;
  min-width: 50px;
  padding-right: 12px;
  background-image: linear-gradient(to bottom, #ff0000, #fdd819);
  background-attachment: fixed;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
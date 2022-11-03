<template>
  <div class="root" :style="styleVar">
    <div class="content" ref="content">
      <div v-for="index in abstractPage.sum" :key="index">
        <MdListCard :index="index - 1"></MdListCard>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
// import MdViewer from "@/components/MdViewer";
// import MdListCard from "@/components/MdListCard";
import MdListCard from "@/components/MdListCard";

export default {
  name: "Home",

  components: {
    // MdViewer
    MdListCard,
  },

  mixins: [],

  props: {},

  data() {
    return {
      contextHeight: "100px",
      abstractPage: {
        sum: 0,
        pageSize: 0,
        currentPage: 0,
      },
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {},

  mounted() {
    // 瀑布流含内容高度
    this.contextHeight = this.$refs.content.offsetHeight + 20 + "px";
    // console.log("测试" + this.$refs.content.offsetHeight);
  },

  beforeMount() {
    this.abstractPage.sum = this.$store.state.abstractPage.sum;
    this.abstractPage.pageSize = this.$store.state.abstractPage.pageSize;
    this.abstractPage.currentPage = this.$store.state.abstractPage.currentPage;
  },

  computed: {
    styleVar() {
      return {
        "--contextHeight": this.contextHeight,
      };
    },
  },
};
</script>

<style scoped>
.root {
  width: 100%;
  height: var(--contextHeight);

  background-color: ivory;
}

.content {
  /* height: 100%; */
  position: absolute;
  left: 50%;

  /* margin: 0px 0 10px 0; */

  padding: 10px 40px 20px 40px;
  width: 64%;

  background-color: ivory;

  /* 瀑布流主框 */
  /* box-shadow: rgba(0, 0, 0, 0.35) 0 5px 8px; */

  transform: translate3d(-50%, 0, 0);
}
</style>

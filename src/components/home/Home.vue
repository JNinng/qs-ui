<template>
  <div class="root" v-if="isShow">
    <div class="content" ref="content" v-if="isShow">
      <div v-for="(item, index) in listPage.list" :key="index">
        <MdListCard :index="item.id + ''"></MdListCard>
      </div>
    </div>
    <div style="text-align: center"><el-button round>继续</el-button></div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
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
      isShow: false,
      listPage: {},
      abstractPage: {
        sum: 0,
        pageSize: 0,
        currentPage: 0,
      },
    };
  },

  computed: {
    getLoad() {
      return this.$store.state.load;
    },
    getListPage() {
      return this.listPage.list;
    },
    getHeight() {
      return this.listPage;
    },
  },

  watch: {
    "$store.state.listPage.list": {
      handler(newValue, oldValue) {
        this.isShow = false;
        this.$nextTick(() => {
          this.listPage.list = this.$store.state.listPage.list;
          this.isShow = true;
        });
      },
    },
  },

  created() {},

  methods: {},

  mounted() {},

  beforeMount() {
    this.abstractPage.sum = this.$store.state.abstractPage.sum;
    this.abstractPage.pageSize = this.$store.state.abstractPage.pageSize;
    this.abstractPage.currentPage = this.$store.state.abstractPage.currentPage;
    // this.listPage = this.$store.state.listPage;
    this.$axios
      .post("/article/getIdListPage", {
        page: 1,
        pageSize: 4,
      })
      .then((res) => {
        this.$store.state.listPage = {
          list: this.$store.state.listPage.list.concat(res.data.list),
        };
      });
  },

  computed: {
    styleVar() {
      return this.contextHeight;
    },
  },
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

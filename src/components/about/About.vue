<template>
  <div class="root">
    <div class="content">
      <div class="about">
        <img class="headPortrait" :src="headPortrait" />
        <br />
        <br />
        <div class="aboutHeader">关于</div>
        <div class="aboutContent">
          <MdViewer :content="content"></MdViewer>
        </div>
      </div>
      <comment-view :articleId="articleId" v-if="load"></comment-view>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";
import CommentView from "@/components/comment/CommentView";

export default {
  name: "About",

  components: {
    MdViewer,
    CommentView,
  },

  mixins: [],

  props: [],

  data() {
    return {
      headPortrait:
        this.$axios.serverAddress + "/file/image/周杰伦%20-%20七里香.jpg",
      content: "",
      load: false,
    };
  },

  mounted() {
    this.$axios
      .get("/about/info", {})
      .then((res) => {
        this.content = res.data.info;
        this.headPortrait =
          this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
        this.articleId = res.data.id;
        this.load = true;
      })
      .catch((err) => {
        console.log("test about info:" + err);
      });
  },

  beforeMount() {},

  computed: {},

  created() {},

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
  width: 60%;

  background-color: ivory;

  transform: translate3d(23.5%, 0, 0);
}

@media (min-width: 768px) {
  .content {
    padding: 10px 4% 20px 4%;
    width: 50%;

    background-color: ivory;

    transform: translate3d(36.2%, 0, 0);
  }
}

.about {
  position: relative;

  padding: 20px 18px 18px 18px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}

.aboutHeader {
  font-size: 22px;
  font-weight: bold;
  margin-left: 20px;
  padding-left: 20px;
}

.aboutContent {
  font-size: 18px;
}

.headPortrait {
  transform: translate3d(8%, 0, 0);
  border-radius: 50%;
  overflow: hidden;
}
</style>
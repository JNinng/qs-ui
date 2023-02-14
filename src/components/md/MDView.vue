<template>
  <div class="root">
    <div class="content">
      <MdViewer class="show" :content="content"></MdViewer>
      <comment-view :articleId="id" v-if="load"></comment-view>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";
import CommentView from "@/components/comment/CommentView";

export default {
  name: "MdView",

  components: {
    MdViewer,
    CommentView,
  },

  props: ["id"],

  data() {
    return {
      content: "x",
      load: false,
    };
  },

  mounted() {
    this.$axios
      .get("/article/" + this.id, {})
      .then((res) => {
        //请求成功
        this.content = res.data.content;
        this.load = true;
      })
      .catch((err) => {
        console.log("test get err" + JSON.stringify(err));
      });
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

  transform: translate3d(19.44%, 0, 0);
}

.show {
  padding-top: 20px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}
</style>
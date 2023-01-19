<template>
  <div>
    <MdViewer :content="content"></MdViewer>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";

export default {
  name: "MdView",

  components: {
    MdViewer,
  },

  props: ["id"],

  data() {
    return {
      content: "x",
    };
  },

  mounted() {
    this.$axios
      .get("/article/" + this.id, {})
      .then((res) => {
        //请求成功
        this.content = res.data.content;
      })
      .catch((err) => {
        console.log("test get err" + JSON.stringify(err));
      });
  },
};
</script>

<style scoped>
</style>
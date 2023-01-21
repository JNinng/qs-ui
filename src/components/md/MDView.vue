<template>
  <div class="root">
    <div class="content">
      <MdViewer class="show" :content="content"></MdViewer>
    </div>
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
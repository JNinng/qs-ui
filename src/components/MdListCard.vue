<template>
  <div class="mdListCardRoot">
    <div class="content" ref="content">
      <MdViewer :id="id"></MdViewer>
      <div class="read" @click.prevent="goto">阅读全部</div>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";

export default {
  name: "MdListCard",

  components: {
    MdViewer,
  },

  mixins: [],

  props: ["id"],

  data() {
    return {};
  },

  watch: {},

  created() {},

  watch: {},

  methods: {
    goto: function () {
      this.$router.push({
        name: "viewer",
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.mdListCardRoot {
  position: relative;
}
.read {
  width: 26%;
  height: 28px;
  position: absolute;
  /* left: -10px; */
  bottom: -4px;
  font-size: 14px;
  line-height: 28px;
  text-align: center;

  left: 50%;
  transform: translate3d(-50%, -38%, 0);

  /* background: rgba(196, 184, 184, 0.377); */
  /* background: linear-gradient(
    rgba(199, 197, 197, 0),
    rgba(199, 197, 197, 0.4),
    rgba(199, 197, 197, 1)
  ); */
  background: rgb(255, 255, 255);

  box-shadow: 0 0px 2px 0 rgba(31, 38, 135, 0.37);
  /* backdrop-filter: blur(2px); */
  /* -webkit-backdrop-filter: blur(2px); */
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
}

.read:hover {
  box-shadow: 0 0 14px rgba(66, 158, 250, 0.8);
}
</style>
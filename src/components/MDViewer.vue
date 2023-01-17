<template>
  <div class="viewerRoot">
    <div :class="[card, styleClass[index.mode]]">
      <Viewer :plugins="plugins" :value="index.content"></Viewer>
    </div>
  </div>
</template>

<script>
import breaks from "@bytemd/plugin-breaks";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
// import highlight from '@bytemd/plugin-highlight'
import highlightSsr from "@bytemd/plugin-highlight-ssr";
// import math from '@bytemd/plugin-math'
import mathSsr from "@bytemd/plugin-math-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Viewer } from "@bytemd/vue-next";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "katex/dist/katex.css";
import "github-markdown-css";
import locales from "bytemd/locales/zh_Hans.json";
import gfmLocales from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import mathLocales from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocales from "@bytemd/plugin-mermaid/locales/zh_Hans.json";

const plugins = [
  breaks(),
  gfm({
    locale: gfmLocales,
  }),
  // Add more plugins here
  frontmatter(),
  gemoji(),
  // highlight(),
  highlightSsr(),
  // math(),
  mathSsr({
    locale: mathLocales,
    katexOptions: { output: "html" },
  }),
  mediumZoom(),
  mermaid({
    locale: mermaidLocales,
  }),
];

export default {
  name: "MdViewer",
  components: {
    Viewer,
  },
  props: ["index", "mode"],
  data() {
    return {
      // card样式，x大小类型
      card: "card",
      cardNull: "",
      styleClass: ["x1", "x2"],
      styleClassNull: ["", ""],

      abstract: {},
      plugins,
      locales,
      data: {},
    };
  },
  watch: {},
  methods: {},
  beforeMount() {
    this.getContent;
  },
  mounted() {},
  computed: {
    getContent() {
      console.log("test index:" + this.index);
      // console.log("test hash:" + window.location.hash);
      // console.log("test props.index:" + this.index);
      if (window.location.hash == "#/index/" + this.index) {
        console.log("test #/index/:" + this.index);
        // this.card = this.cardNull;
        this.styleClass = this.styleClassNull;
      }
      if (this.abstract.abstract == null) {
        this.abstract = this.$store.state.abstractPage.abstracList[0];
        if (this.data) {
          // TODO 从服务器获取指定id文章
          // this.$axios
          //   .get("/article/preview/" + this.index, {})
          //   .then((res) => {
          //     //请求成功
          //     this.data = res.data;
          //   })
          //   .catch((err) => {
          //     console.log("test get err" + JSON.stringify(err));
          //   });
        }
      }
      return this.abstract;
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;

  margin: 0 20px 20px 20px;
  padding: 20px 20px 20px 20px;

  height: 100%;

  background-color: white;
}

.x1 {
  height: 120px;
}

.x2 {
  height: 280px;
}
</style>
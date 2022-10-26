<template>
  <div class="viewerRoot">
    <div :class="[card, styleClass[abstract.mode]]">
      {{ id }}
      <Viewer :plugins="plugins" :value="abstract.abstract"></Viewer>
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
  props: ["id"],
  data() {
    return {
      // card样式，x大小类型
      card: "card",
      styleClass: ["x1", "x2"],

      abstract: {},
      plugins,
      locales,
    };
  },
  methods: {},
  beforeMount() {
    this.getContent;
  },
  mounted() {},
  computed: {
    getContent() {
      if (this.abstract.abstract == null) {
        this.abstract = this.$store.state.abstractPage.abstracList[this.id - 1];
      }
      return this.abstract;
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;

  margin: 20px;
  padding: 40px 20px 40px 20px;

  /* height: 100%; */
  height: 100px;

  background-color: white;

  box-shadow: 0 0 5.7px rgba(0, 0, 0, -0.273), 0 0 5.1px rgba(0, 0, 0, 0.056),
    0 0 6px rgba(0, 0, 0, 1);
}

.x2 {
  height: 280px;
}
</style>
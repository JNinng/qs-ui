<template>
  <Viewer :plugins="plugins" :value="value"></Viewer>
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
  name: "ByteMD",
  components: {
    Viewer,
  },
  data() {
    return {
      value:
        "# qs-ui-demo\n" +
        "\n" +
        "## Project :+1: setup\n" +
        "\n" +
        "```\n" +
        "npm install\n" +
        "```\n" +
        "\n" +
        "### Compiles and hot-reloads for development\n" +
        "\n" +
        "```\n" +
        "npm run serve\n" +
        "```\n" +
        "\n" +
        "### Compiles and minifies for production\n" +
        "\n" +
        "```\n" +
        "npm run build\n" +
        "```\n" +
        "\n" +
        "### Lints and fixes files\n" +
        "\n" +
        "```\n" +
        "npm run lint\n" +
        "```\n" +
        "\n" +
        "### Customize configuration\n" +
        "\n" +
        "See [Configuration Reference](https://cli.vuejs.org/config/).",
      plugins,
      locales,
    };
  },
  methods: {},
};
</script>

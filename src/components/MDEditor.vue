<template>
  <div>
    <Editor
      :locale="locales"
      :plugins="plugins"
      :uploadImages="uploadImage"
      :value="content"
      @change="handleChange"
      v-if="load"
    />
    <div class="operate">
      <el-tooltip content="保存" placement="top">
        <el-button type="success" icon="Select" @click="save">保存</el-button>
      </el-tooltip>
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
import { Editor } from "@bytemd/vue-next";
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
  name: "MdEditor",

  components: {
    Editor,
  },

  props: {
    id: {
      type: String,
      default: "null",
    },
  },
  beforeMount() {
    this.loadContent();
  },
  data() {
    return {
      content: "null",
      article: {},
      load: false,
      plugins,
      locales,
    };
  },

  computed: {},

  methods: {
    handleChange(v) {
      this.content = v;
    },
    uploadImage: function (files) {
      console.log("files", files);
      return [
        {
          title: files.map((i) => i.name),
          url: "http://ninng.top/media/img/seafile-logo.png",
        },
      ];
    },
    loadContent() {
      this.load = false;
      this.content = "";
      this.$axios
        .get("/article/" + this.id, {})
        .then((res) => {
          //请求成功
          this.article = res.data;
          this.content = res.data.content;
          this.load = true;
        })
        .catch((err) => {
          console.log("test get err" + JSON.stringify(err));
        });
    },
    save() {
      this.$axios
        .post("/article/updateById", {
          id: this.article.id,
          userId: this.article.userId,
          content: this.content,
          title: this.article.title,
        })
        .then((res) => {
          //请求成功
          this.$notify({
            message: res.message + "信息",
            duration: 800,
          });
          this.load = true;
        })
        .catch((err) => {
          console.log("test get err" + JSON.stringify(err));
        });
    },
  },

  watch: {
    id(newValue, oldValue) {
      if (newValue != oldValue) {
        this.loadContent();
      }
    },
  },
};
</script>

<style>
.bytemd {
  height: 74vh;
}

.operate {
  margin-top: 6px;
  margin-bottom: 2px;
  float: right;
}
</style>
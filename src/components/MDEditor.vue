<template>
  <div>
    <el-input v-model="article.title" placeholder="Title" />
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
import axios from "axios";

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
    mode: {
      type: String,
      default: "update",
    },
  },
  beforeMount() {
    this.loadContent();
  },
  data() {
    return {
      content: "",
      article: {
        title: "",
      },
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
    uploadImage: async function (files) {
      // this.$axios
      //   .uploadImage("/file/upload", files)
      //   .then((res) => {
      //     console.log("test image:");
      //     let data = res.data;
      //     for (let i = 0; i < data.length; i++) {
      //       data[i].url =
      //         this.$axios.serverAddress + "/file/image/" + data[i].url;
      //     }
      //     return data;
      //   })
      //   .catch((err) => {
      //     console.log("test image err:" + JSON.stringify(err));
      //   });

      // var tokenName = localStorage.getItem("token"); // 从本地缓存读取tokenName值
      // var tokenValue = localStorage.getItem("tokenValue"); // 从本地缓存读取tokenValue值
      // var header = {
      //   "Content-Type": "multipart/form-data",
      // };
      // if (tokenName != undefined && tokenName != "") {
      //   header[tokenName] = tokenValue;
      // }

      // const data = new FormData();
      // files = Array.from(files);
      // for (let i = 0; i < files.length; i++) {
      //   data.append("files", files[i]);
      // }
      var result;
      // await axios({
      //   method: "post",
      //   url: "/file/upload",
      //   header: header,
      //   data: data,
      // })
      //   .then((res) => {
      //     result = res.data.data;
      //     console.log("test upload li:" + JSON.stringify(result));
      //   })
      //   .catch((err) => {
      //     console.log("test md err:" + err);
      //   });
      result = this.$axios.uploadImage(files);

      console.log("test upload:" + JSON.stringify(result));
      return result;
    },
    loadContent() {
      console.log("test mode:" + this.mode);
      switch (this.mode) {
        case "update":
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
          break;
        case "upload":
          this.article.title = "创作";
          this.load = true;
          break;
      }
    },
    save() {
      switch (this.mode) {
        case "update":
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
                message: res.message,
                duration: 1400,
              });
              this.load = true;
            })
            .catch((err) => {
              console.log("test get err" + JSON.stringify(err));
            });
          break;
        case "upload":
          this.$axios
            .post("/article/upload", {
              content: this.content,
              title: this.article.title,
            })
            .then((res) => {
              //请求成功
              this.$notify({
                message: res.message,
                duration: 1400,
              });
              if (res.message == "上传成功！") {
                this.$emit("close");
              }
            })
            .catch((err) => {
              console.log("test get err" + JSON.stringify(err));
            });
          break;
      }
    },
  },

  watch: {
    id(newValue, oldValue) {
      if (newValue != oldValue) {
        this.loadContent();
      }
    },
    mode(newValue, oldValue) {
      if (newValue != oldValue) {
        this.loadContent();
      }
    },
  },
};
</script>

<style>
.bytemd {
  height: 72vh;
}

.operate {
  float: right;

  margin-top: 6px;
  margin-bottom: 2px;
}
</style>
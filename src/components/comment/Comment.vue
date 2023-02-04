<template>
  <div class="root">
    <div class="content">
      <!-- <div class="commentBlock">
        <div class="commentHeader">
          <div class="commentHeaderItem">
            <el-input
              class="input"
              v-model="nickname"
              placeholder="昵称"
              clearable
            ></el-input>
          </div>
          <div class="commentHeaderItem">
            <el-input
              class="input"
              v-model="email"
              placeholder="邮箱"
              clearable
            ></el-input>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="comment">
          <el-input
            type="textarea"
            v-model="commentContent"
            placeholder="限制500字"
            autosize="true"
          ></el-input>
        </div>
      </div> -->
      <comment-block></comment-block>
    </div>
  </div>
</template>

<script>
import CommentBlock from "@/components/comment/CommentBlock";

export default {
  name: "Comment",

  components: {
    CommentBlock,
  },

  mixins: [],

  props: [],

  data() {
    return {
      nickname: "",
      email: "",
      commentContent: "",
    };
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {},
};
</script>

<style scoped>
.root {
  display: flex;

  position: relative;

  min-height: 32px;
}

.content {
  width: 100%;
}

.commentHeader {
  display: flex;

  padding: 0 10px 0 10px;
}

.commentHeaderItem {
  float: left;

  margin: 4px 10px 0 10px;

  flex: 1;
}

@media only screen and (max-width: 767px) {
  .commentHeader {
    display: block;
  }
}

.input {
  height: 32px;
}

.comment {
  margin: 4px 20px 0 20px;
}
</style>
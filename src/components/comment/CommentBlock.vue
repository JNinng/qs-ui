<template>
  <div class="root">
    <div class="content">
      <div class="commentBlock">
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
            class="commentContent"
            type="textarea"
            v-model="commentContent"
            placeholder="限制500字"
            maxlength="500"
            :autosize="{ minRows: minRows, maxRows: true }"
          ></el-input>
          <!-- <span>{{ commentContent.length > 500 ? "评论过长！" : "" }}</span> -->
          <!-- <div>{{ commentContent.length }} 字</div> -->
          <div style="text-align: right; margin-top: 4px">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBlock",

  components: {},

  mixins: [],

  props: ["commentId", "articleId"],

  data() {
    return {
      nickname: "",
      email: "",
      commentContent: "",
      minRows: 1,
    };
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    submit: function () {},
  },
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
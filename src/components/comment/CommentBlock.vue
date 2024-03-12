<template>
  <div class="commentBlockRoot">
    <div class="commentContent">
      <div>
        <div class="commentHeader">
          <div v-if="this.$store.state.config.noLogin">
            <div class="commentHeaderItem">
              <el-input
                class="input"
                v-model="this.$store.state.config.info.nickname"
                placeholder="昵称"
                clearable
              ></el-input>
            </div>
            <div class="commentHeaderItem">
              <el-input
                class="input"
                v-model="this.$store.state.config.info.email"
                placeholder="邮箱"
                clearable
              ></el-input>
            </div>
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
            {{ message }}
            <el-button type="info" @click="cancel">取消</el-button>
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

  props: {
    commentId: {
      type: String,
    },
    articleId: {
      type: String,
    },
  },

  data() {
    return {
      commentContent: "",
      minRows: 1,
      message: "",
    };
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    submit: function () {
      if (this.commentContent.length > 0) {
        this.$axios
          .post("/comment/comment", {
            name: this.$store.state.config.info.nickname,
            email: this.$store.state.config.info.email,
            content: this.commentContent,
            parentId: this.commentId,
            articleId: this.articleId,
          })
          .then((res) => {
            this.message = res.message;
            this.$emit("submitSuccess");
          });
      }
    },
    cancel: function () {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.commentBlockRoot {
	display: flex;

	position: relative;

	min-height: 32px;

	background-color: white;
}

.commentContent {
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
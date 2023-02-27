<template>
  <div class="commentRoot">
    <div class="commentContent">
      <comment-block
        :commentId="commentId"
        :articleId="articleId"
        @submitSuccess="submitSuccess"
        @cancel="cancel"
      ></comment-block>
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
    };
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  beforeMount() {
    if (this.tNickname) {
      this.nickname = this.tNickname;
    }
    if (this.tEmai) {
      this.email = this.tEmai;
    }
  },

  methods: {
    submitSuccess() {
      this.$emit("submitSuccess");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.commentRoot {
	display: flex;

	position: relative;

	min-height: 32px;
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
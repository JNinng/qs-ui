<template>
  <div class="commentViewRoot" v-if="load">
    <div class="commentHeader">评论</div>
    <comment
      :commentId="-1"
      :articleId="articleId"
      @submitSuccess="loadComments"
      v-if="showItemId == '0'"
    ></comment>
    <div class="container">
      <div class="comment" v-for="(item, index) in getComments" :key="index">
        <div class="info">
          <img
            style="border-radius: 50%"
            class="avatar"
            :src="
              this.$axios.serverAddress +
              '/file/image/' +
              item.comment.headPortrait
            "
            width="36"
            height="36"
          />
          <div class="right">
            <div class="name">{{ item.comment.name }}</div>
            <div class="date">
              {{ getTime(item.comment.updateTime) }} {{ item.comment.ip }}
            </div>
          </div>
        </div>
        <div class="commentContentView">{{ item.comment.content }}</div>
        <div class="control">
          <span class="comment-reply" @click="showCommentInput(item)">
            <i class="iconfont icon-comment"></i>
            <span @click="setShow('0' + index)">回复</span>
          </span>
        </div>
        <comment
          :commentId="item.comment.id"
          :articleId="articleId"
          @submitSuccess="loadComments"
          @cancel="cancel"
          v-if="showItemId == '0' + index"
        ></comment>
        <div class="reply">
          <div
            class="item"
            v-for="(reply, index1) in item.childCommentList"
            :key="index1"
          >
            <div class="reply-content">
              <div class="from-name">{{ reply.name }}</div>
              <div>
                <span class="to-name">@{{ reply.toName }}</span
                >:
                {{ reply.content }}
              </div>
            </div>
            <div class="reply-bottom">
              <span>{{ getTime(reply.updateTime) }} &nbsp;</span>
              <span>{{ reply.ip }}</span>
              <span @click="setShow(index + '-' + index1)">&nbsp;回复</span>
            </div>
            <comment
              :commentId="reply.id"
              :articleId="articleId"
              @submitSuccess="loadComments"
              @cancel="cancel"
              v-if="showItemId == index + '-' + index1"
            ></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Comment from "@/components/comment/Comment";

export default {
  name: "CommentView",

  props: {
    commentId: {
      type: String,
    },
    articleId: {
      type: String,
    },
  },
  components: {
    Comment,
  },
  data() {
    return {
      inputComment: "",
      showItemId: "0",
      comments: [],
      nickname: "",
      email: "",
      load: false,
    };
  },
  computed: {
    getComments() {
      return this.comments;
    },
  },
  beforeMount() {
    this.loadComments();
  },
  methods: {
    setShow(id) {
      this.showItemId = id;
    },
    getTime(time) {
      return moment(time).format("YYYY年MM月DD日");
    },
    loadComments() {
      console.log("test loadComments");
      this.$axios
        .post("/comment/byArticleId", { articleId: this.articleId })
        .then((res) => {
          this.comments = res.data;
          this.load = true;
        });
      this.showItemId = "0";
    },
    cancel() {
      console.log("test cancel");
      this.showItemId = "0";
    },
  },
};
</script>

<style  scoped>
.commentHeader {
  font-size: 20px;
  font-weight: bold;
  /* color: rgb(104, 104, 104); */
  padding-bottom: 10px;
}

.commentViewRoot {
  margin-top: 24px;
  padding-top: 10px;
  border-top: 1px solid #dcdfe6;
}

.container .comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
}

.container .comment .info {
  display: flex;
  align-items: center;
}

.container .comment .info .right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.container .comment .info .right .date {
  font-size: 12px;
  color: #909399;
}

.container .comment .commentContentView {
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0;
}

.container .comment .control {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;
}

.container .comment .reply {
  margin: 10px 0;
  border-left: 2px solid #dcdfe6;
}

.container .comment .reply .item {
  margin: 0 20px;
  padding: 10px 0;
  border-bottom: 1px dashed #dcdfe6;
}

.container .comment .reply .item .reply-content {
  display: block;
  align-items: center;
  font-size: 14px;
  color: #303133;
}

.container .comment .reply .item .reply-content .from-name {
  margin: 0 0 2px 0;
}

.container .comment .reply .item .reply-content .to-name {
  color: #409eff;
  margin-left: 5px;
  margin-right: 5px;
}

.container .comment .reply .item .reply-bottom {
  display: flex;
  align-items: center;
  margin-top: 6px;
  font-size: 12px;
  color: #909399;
}

.container .comment .reply .item .reply-bottom .reply-text {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
</style>
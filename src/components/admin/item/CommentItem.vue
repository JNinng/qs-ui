<template>
  <div :data="getComments">
    <el-table
      :data="comments"
      :border="true"
      style="width: 100%"
      v-if="dialogFormVisible"
      empty-text="暂无评论"
    >
      <el-table-column type="expand">
        <template #default="scope">
          <div m="4">
            <el-table
              :data="scope.row.childCommentList"
              :border="true"
              empty-text="暂无回复"
            >
              <el-table-column label="name" prop="name" />
              <el-table-column label="toName" prop="toName" />
              <el-table-column label="content" prop="content" />
              <el-table-column
                label="updateTime"
                prop="updateTime"
                :formatter="dateFormat"
              />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="comment.name" />
      <el-table-column label="content" prop="comment.content" />
      <el-table-column label="updateTime" prop="comment.updateTime" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteComment(scope.row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CommentItem",

  components: {},

  mixins: [],

  props: {
    id: {
      type: String,
      default: "null",
    },
    dialogFormVisible: {
      type: Boolean,
    },
  },

  data() {
    return {
      comments: [],
      load: false,
    };
  },

  beforeMount() {
    this.loadComments();
  },

  mounted() {},

  computed: {},

  created() {},

  watch: {},

  methods: {
    loadComments() {
      this.$axios
        .post("/comment/byArticleId", { articleId: this.id })
        .then((res) => {
          this.comments = res.data;
          this.load = true;
        });
    },
    deleteComment(row) {
      console.log("test comment row:" + JSON.stringify(row));
    },
    dateFormat(row, column) {
      console.log("test date fromat:" + JSON.stringify(row));
      return moment(row.updateTime).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped>
</style>
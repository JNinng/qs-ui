<template>
  <div>
    <span>{{ monthItem.date }}&nbsp;</span>
    <span>{{ monthItem.idList.length }}篇</span>
  </div>
  <div v-for="(item, index) in monthItem.idList" :key="index">
    <a @click="goto(item.id)">
      {{ item.title }}
    </a>
  </div>
</template>

<script>
export default {
  name: "TimelineMonth",

  components: {},

  mixins: [],

  props: ["monthItem"],

  data() {
    return {};
  },

  mounted() {
    console.log("test:" + JSON.stringify(this.monthItem));
  },

  computed: {},

  created() {},

  watch: {},

  methods: {
    goto: function (id) {
      this.$router.push({
        name: "mdView",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
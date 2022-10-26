<template>
  <div>
    <div class="menu">
      <home-menu></home-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div>
      <home-tail></home-tail>
    </div>
  </div>
</template>

<script>
import HomeMenu from "@/components/HomeMenu";
import HomeTail from "@/components/HomeTail.vue";

export default {
  name: "MainX",

  components: {
    HomeMenu,
    HomeTail,
  },

  mixins: [],

  props: {},

  data() {
    return {
      isVisible: true,
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {},

  watch: {},

  methods: {},
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
}

.menu {
	width: 100%;
	height: 59px;

	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
}

</style>
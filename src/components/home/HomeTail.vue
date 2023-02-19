<template>
  <div class="root">
    <div style="width: 380px; margin: 0 auto; padding: 20px 0">
      <p style="display: block-inline; text-align: center; color: #939393">
        © 2021-2023 xxxx.xxx 版权所有
      </p>
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        style="
          display: inline-block;
          float: left;
          text-align: center;
          text-decoration: none;
          height: 20px;
          width: 42%;
          line-height: 20px;
          color: #939393;
        "
        >粤ICP备2022060606号</a
      >
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44152302000034"
        style="
          display: inline-block;
          float: left;
          text-decoration: none;
          height: 20px;
          width: 58%;
          line-height: 20px;
        "
        ><img
          src="@/assets/备案图标.png"
          style="float: left; margin: 0px auto"
        />
        <p
          style="
            float: left;
            height: 20px;
            line-height: 20px;
            margin: 0px 0px 0px 5px;
            color: #939393;
          "
        >
          粤公网安备 44060606060606号
        </p></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Demo",

  components: {},

  mixins: [],

  props: {},

  data() {
    return {};
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

	font-size: 13px;
}

p {
	text-align: center;
}

.root {
	/* margin: 10px; */
	padding: 30px 0 20px 0;

/* background-color: ivory; */
	/* background-color: rgb(214, 214, 214); */
	/* box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px; */

	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
}

p {
	margin-bottom: 4px;
}

</style>
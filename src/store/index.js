// import Vue from "vue";
import Vuex from "vuex";

// Vue.use(Vuex);
const abstracContext =
	"# qs-blog-ui :+1:\n" +
	"\n" +
	"## Project setup\n" +
	"\n" +
	"```\n" +
	"npm install\n" +
	"```\n" +
	"\n" +
	"### Compiles and hot-reloads for development\n" +
	"\n" +
	"```\n" +
	"npm run serve\n" +
	"```\n" +
	"\n" +
	"### Compiles and minifies for production\n" +
	"\n" +
	"```\n" +
	"npm run build\n" +
	"```\n" +
	"\n" +
	"### Lints and fixes files\n" +
	"\n" +
	"```\n" +
	"npm run lint\n" +
	"```\n" +
	"\n" +
	"### Customize configuration\n" +
	"\n" +
	"See [Configuration Reference](https://cli.vuejs.org/config/).";

const store = new Vuex.Store({
	state: {
		home: {
			count: 0,
			pageSize: 4,
			currentPage: 0,
			listPage: {
				list: [],
			},
		},
	},
});

export default store;

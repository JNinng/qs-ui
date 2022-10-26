// import Vue from "vue";
import Vuex from "vuex";

// Vue.use(Vuex);
const abstracContext =
	"# qs-ui-demo :+1:\n" +
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
		count: 0,
		abstractPage: {
			sum: 8,
			pageSize: 4,
			currentPage: 1,
			abstracList: [
				{
					mode: 0,
					id: 0,
					abstract: abstracContext,
				},
				{
					mode: 1,
					id: 1,
					abstract: abstracContext,
				},
				{
					mode: 1,
					id: 2,
					abstract: abstracContext,
				},
				{
					mode: 0,
					id: 3,
					abstract: abstracContext,
				},
				{
					mode: 0,
					id: 4,
					abstract: abstracContext,
				},
				{
					mode: 1,
					id: 5,
					abstract: abstracContext,
				},
				{
					mode: 1,
					id: 6,
					abstract: abstracContext,
				},
				{
					mode: 0,
					id: 7,
					abstract: abstracContext,
				},
			],
		},
	},
});

export default store;

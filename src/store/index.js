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
		count: 0,
		abstractPage: {
			sum: 8,
			pageSize: 4,
			currentPage: 1,
			abstracList: [
				{
					id: 0,
					mode: 0,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,英语",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 1,
					mode: 1,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,c,d,e,f",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 2,
					mode: 1,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "b,c,d,p,h,r,t,y",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					mode: 0,
					id: 3,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,b,c,d",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 4,
					mode: 0,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,b,c,d",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 5,
					mode: 1,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,b,c,d",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 6,
					mode: 1,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,b,c,d",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
				{
					id: 7,
					mode: 0,
					createDate: "2022年10月27日",
					updateDate: "2022年10月27日",
					classify: "分类A",
					tag: "数学,b,c,d",
					titel: "标题AAAA",
					abstract: abstracContext,
				},
			],
		},
	},
});

export default store;

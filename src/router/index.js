import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "@/components/demo/HelloWorld";
import TestOne from "@/components/demo/TestOne";
import Home from "@/components/home/Home";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import ByteMD from "@/components/demo/ByteMD";
import Timeline from "@/components/timeline/Timeline";
import MDView from "@/components/md/MDView";
import Tag from "@/components/tag/Tag";
import About from "@/components/about/About";
import Admin from "@/components/admin/Admin";
import ArticleManagement from "@/components/admin/item/ArticleManagement";
import SystemManagement from "@/components/admin/item/SystemManagement";
import CommentManagement from "@/components/admin/item/CommentManagement";

const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/timeline", name: "timeline", component: Timeline },
	{ path: "/tag", name: "tag", component: Tag },
	{ path: "/about", name: "about", component: About },
	{ path: "/editor", name: "editor", component: MdEditor },
	{
		path: "/admin",
		name: "admin",
		component: Admin,
		redirect: "articleManagement",
		children: [
			{
				path: "/articleManagement",
				name: "articleManagement",
				component: ArticleManagement,
				props: true,
				children: [
					{
						path: "/",
						name: "adminEditor",
						component: MdEditor,
						props: (route) => ({
							id: route.query.id,
							mode:route.query.mode
						}),
					},
				],
			},
			{
				path: "/commentManagement",
				name: "commentManagement",
				component: CommentManagement,
				props: true,
			},
			{
				path: "/systemManagement",
				name: "systemManagement",
				component: SystemManagement,
				props: true,
			},
		],
	},
	{
		path: "/viewer",
		name: "viewer",
		children: [
			{
				path: "/index/:index",
				name: "mdIndex",
				component: MdViewer,
				props: true,
			},
			{
				path: "/id/:id",
				name: "mdView",
				component: MDView,
				props: true,
			},
		],
	},
	{ path: "/hello", name: "hello", component: HelloWorld },
	{ path: "/one", name: "testOne", component: TestOne },
	{ path: "/md", name: "md", component: ByteMD },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;

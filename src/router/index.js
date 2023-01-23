import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "@/components/demo/HelloWorld";
import TestOne from "@/components/demo/TestOne";
import Home from "@/components/home/Home";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import ByteMD from "@/components/demo/ByteMD";
import Timeline from "@/components/timeline/Timeline";
import MDView from "@/components/md/MDView";
import About from "@/components/about/About";

const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/timeline", name: "timeline", component: Timeline },
	{ path: "/about", name: "about", component: About },
	{ path: "/editor", name: "editor", component: MdEditor },
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

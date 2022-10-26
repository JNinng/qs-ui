import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "@/components/demo/HelloWorld";
import TestOne from "@/components/demo/TestOne";
import Home from "@/components/Home";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import ByteMD from "@/components/demo/ByteMD";

const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/editor", name: "editor", component: MdEditor },
	{
		path: "/viewer/:id",
		name: "viewer",
		component: MdViewer,
		props: true,
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

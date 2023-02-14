import { createApp } from "vue";
import App from "./App.vue";

// const routes = {
//     routes: [
//         {path: '/', component: App},
//         {path: '/test', component: TestOne},
//         {path: '/hello', component: Hello}
//     ]
// };
// const router = Router.createRouter({
//     // history: Router.createWebHashHistory(),
//     routes
// })
// const router = new Router({
//     routes: [
//         {path: '/', name: 'app', component: App},
//         {path: '/test', name: 'test', component: TestOne},
//         {path: '/hello', name: 'hello', component: Hello}
//     ]
// });
import router from "./router";
import { createStore } from "vuex";
import store from "./store";
import api from "./api/index";
import moment from "moment";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import "element-plus/es/components/notification/style/css";

const app = createApp(App);
app.use(router);
app.use(createStore);
app.use(store);
app.use(ElNotification);
app.config.globalProperties.$axios = api;
app.mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
store.state.timeline.currentDate = moment().format("YYYY-MM-DD");

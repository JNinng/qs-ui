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

const app = createApp(App);
app.use(router);
app.use(createStore);
app.use(store);
app.config.globalProperties.$axios = api;
app.mount("#app");
store.state.timeline.currentDate = moment().format("YYYY-MM-DD");

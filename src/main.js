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
import Vuex from "vuex";
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(Vuex);
app.use(store);
app.mount("#app");

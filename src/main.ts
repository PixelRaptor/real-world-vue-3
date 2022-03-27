import { createApp } from "vue"
import App from "./App.vue"
// import upperFirst from "lodash/upperFirst";
// import camelCase from "lodash/camelCase";
import router from "./router"
import store from "./store"
import "../node_modules/nprogress/nprogress.css"

const app = createApp(App)

app.use(store).use(router).mount("#app")

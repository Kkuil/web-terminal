import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "@/assets/style/tailwind.css"
import "@/assets/style/index.scss"
import "@/assets/style/iconfont.css"

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount("#app")

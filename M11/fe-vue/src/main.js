// npm create vue@latest
// npm install bulma
// npm install vue vue-router
// npm install cors
// npm install vue-router@4
// npm install axios
// npm run dev

import { createApp } from "vue"
import "bulma/css/bulma.min.css"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import Create from "./components/ProductAdd.vue"
import Edit from "./components/ProductEdit.vue"
import Index from "./components/ProductList.vue"
import "./assets/main.css"

const routes = [
  { name: "Create", path: "/create", component: Create },
  { name: "Edit", path: "/edit/:id", component: Edit },
  { name: "Index", path: "/", component: Index },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount("#app")

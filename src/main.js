import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueResource from "vue-resource";
import dashboard from "@/views/dashboard";
import editEmployee from "@/views/editEmployee";
import newEmployee from "@/views/newEmployee";
import viewEmployee from "@/views/viewEmployee";
import navbar from "@/components/navbar";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component("dashboard", dashboard);
Vue.component("edit-employee", editEmployee);
Vue.component("new-employee", newEmployee);
Vue.component("view-employee", viewEmployee);
Vue.component("navbar", navbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

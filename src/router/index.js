import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "../views/dashboard";
import editEmployee from "../views/editEmployee";
import newEmployee from "../views/newEmployee";
import viewEmployee from "../views/viewEmployee";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/edit/:employee_id",
    name: "edit-employee",
    component: editEmployee,
  },
  {
    path: "/new",
    name: "new-employee",
    component: newEmployee,
  },
  {
    path: "/:employee_id",
    name: "view-employee",
    component: viewEmployee,
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

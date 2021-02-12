<template>
  <div>
    <ul class="collection with-header z-depth-2">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">
        <dev class="chip red white-text">employee #ID:</dev>
        <b>{{employee_id}}</b>
      </li>
      <li class="collection-item">
        <dev class="chip red white-text">Departement:</dev>
        <b>{{dept}}</b>
      </li>
      <li class="collection-item">
        <dev class="chip red white-text">position:</dev>
        <b>{{position}}</b>
      </li>
    </ul>
    <router-link class="btn grey" to="/">Back</router-link>
    <button class="btn red" @click="deleteEmployee">Delete</button>
    <!-- fixed button -->
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large purple darken-4 pulse" :to="{
        name:'edit-employee',
        params: {
          employee_id: employee_id
        }
      }">
        <i class="material-icons">create</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseInit";
export default {
  name: "view-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    deleteEmployee() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push("/");
          });
        });
    }
  }
};
</script>

<style>
</style>
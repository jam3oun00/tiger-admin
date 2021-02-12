<template>
  <div>
    <h1>Dashboard</h1>
    <ul class="collection with-header z-depth-2">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li class="collection-item" v-for="employee in employees" :key="employee.id">
        <div class="chip purple darken-2 z-depth-2 white-text">{{employee.dept}}</div> <br>
        {{employee.employee_id}} >
        <b>{{employee.name}}</b>

        <!-- link to the target employee -->
        <router-link
          class="secondary-content"
          :to="{
            name: 'view-employee',
            params: {employee_id: employee.employee_id}
        }"
        > Visite Profile
          <i class="material-icons">account_circle</i>
        </router-link>
      </li>
    </ul>

    <!-- fixed button -->
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large purple darken-4 pulse" to="/new">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseInit";
export default {
  data() {
    return {
      employees: []
    };
  },
  created() {
    db.collection("employees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>
<template>
  <div>
    <h1>edit employee</h1>
    <form>
      <div class="row">
        <div class="input-field col s6">
          <input value="003" type="number" required disabled v-model="employee_id" />
          <label class="active" for="first_name2">Employee ID#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" id="first_name2" required v-model="name" />
          <label for="first_name2">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" id="first_name3" required v-model="dept" />
          <label for="first_name3">Departement</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" id="first_name4" required v-model="position" />
          <label for="first_name4">Position</label>
        </div>
      </div>
      <router-link to="/" class="btn grey">cancel</router-link>
      <button type="submit" @click.prevent="addtoData" class="btn purple darken-4">Add</button>
    </form>
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
            doc.ref
              .update({
                mployee_id: this.employee_id,
                name: this.name,
                dept: this.dept,
                position: this.position
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: {
                    employee_id: this.employee_id
                  }
                })
              });
          });
        });
    }
  }
};
</script>

<style>
</style>
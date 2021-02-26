<template>
   <v-card flat class="px-12 pb-15 pt-5 mx-auto wall" width="450">
      <v-form v-model="isFormValid" @submit.prevent="register">
         <v-card-title class="text-capitalize d-flex justify-center">
            Register
         </v-card-title>
         <v-text-field
            v-model="registration.name"
            label="Shop Name"
            :counter="100"
            required
            filled
            dense
         />
         <v-text-field
            v-model="registration.contact"
            label="Email or Phone"
            :counter="100"
            required
            filled
            dense
         />
         <v-text-field
            v-model="registration.password"
            type="password"
            :counter="25"
            filled
            dense
            required
            label="Password"
            :rules="passRules"
         />
         <v-btn
            block
            class="mt-5"
            type="submit"
            color="primary"
            :loading="registrationLoader"
            :disabled="!isFormValid || registrationLoader"
         >
            Register
         </v-btn>
      </v-form>
   </v-card>
</template>

<script>
export default {
   auth: false,
   data() {
      return {
         registrationLoader: false,
         registration: {
            name: '',
            contact: '',
            password: '',
         },
         isFormValid: false,
         regexValidEmail: new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         ),
         emailRules: [
            (v) => !!v || 'E-mail is required',
            // (v) => this.regexValidEmail.test(v) || 'E-mail must be valid',
            (v) => v.length <= 30 || 'E-mail is too long',
         ],
         passRules: [
            (v) => !!v || 'Password is required',
            // (v) => v.length >= 4 || 'Password is too short',
            (v) => v.length <= 25 || 'Password is too long',
         ],
      }
   },
   methods: {
      register() {
         this.registrationLoader = true
         this.$store.dispatch('shop/register', this.registration)
            .then((data) => {
               if (data) {
                  this.$store.dispatch('authentication/signIn/signIn', this.registration)
               }
            })
            .finally(() => {
               this.registrationLoader = false
            })
      },
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <v-card flat class="px-12 pb-15 pt-5 mx-auto wall" width="450">
      <v-form v-model="isFormValid" @submit.prevent="userLogin">
         <v-card-title class="text-capitalize d-flex justify-center">
            sign in
         </v-card-title>
         <v-text-field
            v-model="logInData.contact"
            label="Email or Phone"
            :counter="100"
            required
            filled
            dense
         />
         <v-text-field
            v-model="logInData.password"
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
            :loading="signInLoader"
            :disabled="!isFormValid || signInLoader"
         >
            sign in
         </v-btn>
      </v-form>
   </v-card>
</template>

<script>
export default {
   data() {
      return {
         signInLoader: false,
         logInData: {
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
      userLogin() {
         this.signInLoader = true
         this.$store
            .dispatch('authentication/signIn/signIn', this.logInData)
            .then(() => {
               this.$store.dispatch('shop/getShop')
            })
            .finally(() => {
               this.signInLoader = false
            })
      },
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <v-container class="fill-width fill-height d-flex align-center justify-center">
      <sign-in-card class="mx-auto" />
      No account?
      <v-btn color='primary' @click="$router.push('/register')">Register</v-btn>
   </v-container>
</template>
<script>
export default {
   data() {
      return {}
   },
}
</script>

<style lang="scss" scoped></style>

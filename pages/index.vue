<template>
  <NuxtLink to="/menus">Home page</NuxtLink>
</template>

<script>
export default {
  created() {
      if (this.$store.state.shop.shop) {
        this.$router.push('/menus')
      } else {
        this.$router.push('/auth/sign-in')
      }
      
   },
}
</script>

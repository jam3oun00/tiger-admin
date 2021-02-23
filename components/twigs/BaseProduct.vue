<template>
   <div>
      <v-card
         flat
         class="transparent"
         v-for="(product, i, k) in products"
         :key="k"
      >
         <v-img
            height="250"
            :src="product.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.07), rgba(0,0,0,.55)"
         >
            <v-card-title>{{ product.name }}</v-card-title>
         </v-img>
         <v-card-subtitle class="primary--text pb-0"> Review </v-card-subtitle>
         <v-card-text>
            {{ product.details.review }}
         </v-card-text>
         <v-divider />
         <v-card-subtitle class="primary--text pb-0">
            Description
         </v-card-subtitle>
         <v-card-text>
            {{ product.details.description }}
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
export default {
   data() {
      return {
         show: false,
      }
   },
   computed: {
      products() {
         return this.$store.getters['shop/getProducts'](this.$route.query.key)
      },
   },
}
</script>

<style lang="scss" scoped></style>

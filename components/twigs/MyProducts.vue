<template>
   <div>
      <v-card
         flat
         class="transparent"
         v-for="(product, i, k) in products"
         :key="k"
      >
         <div style="display: flex">
            <my-edit
               do="doProduct"
               :doKey="product.key"
               itemName="name"
               :itemValue="product.name"
            />
            <!-- TODO: on click go to product page to edit details -->
            <v-btn class="mx-2" fab dark x-small color="primary" @click="setProduct(product)">
               <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
         </div>

         <my-edit
            do="doProduct"
            :doKey="product.key"
            itemName="pricing.retailPrice"
            :itemValue="product.pricing.retailPrice.toString()"
         />

         <my-edit
            do="doProduct"
            :doKey="product.key"
            itemName="status"
            :itemValue="product.status"
            :isSwitch="true"
            :switchOptions="['active', 'inactive']"
         />

         <v-divider />
      </v-card>
   </div>
</template>

<script>
export default {
   props: {
      menuKey: {
         type: String,
         default: '',
      },
   },
   data() {
      return {
         show: false,
      }
   },
   computed: {
      products() {
         // return this.$store.getters['shop/getProducts'](this.$route.query.key)
         return this.$store.state.shop.products[this.menuKey]
      },
   },
   methods: {
      setProduct(product) {
         this.$store.commit('shop/setCurrentProduct', product)
         this.$router.push('/product')
      }
   }
}
</script>

<style lang="scss" scoped></style>

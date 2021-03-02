<template>
   <div>
      <modal
         v-model="productModal"
         color="back"
         :fullscreen="$vuetify.breakpoint.smAndDown"
      >
         <v-card-title> Edit Product </v-card-title>
         <v-card-text>
            <my-product-edit />
         </v-card-text>
         <v-card-actions>
            <v-spacer />
            <v-btn text @click="productModal = false">cancel</v-btn>
            <v-btn text color="primary" @click="productModal = false">
               done
            </v-btn>
         </v-card-actions>
      </modal>
      <div v-for="(product, i, k) in products" :key="k">
         <v-divider class="mt-n1 mb-0" />
         <div class="pa-4">
            <v-card flat>
               <my-image :src="product.image" :doKey="product.key" do="doProduct">
                  <my-edit
                     do="doProduct"
                     className="v-card__title d-flex flex-nowrap"
                     :doKey="product.key"
                     itemName="name"
                     :itemValue="product.name"
                  />
               </my-image>
               <!-- TODO: on click open product modal to edit details -->
               <v-btn
                  class="primary"
                  dark
                  icon
                  absolute
                  top
                  right
                  @click="setProduct(product)"
               >
                  <pencil-icon size="20" />
               </v-btn>
            </v-card>
            <v-card-subtitle class="primary--text pb-0">
               Retail Price
            </v-card-subtitle>
            <my-edit
               class="px-4"
               do="doProduct"
               :doKey="product.key"
               itemName="pricing.retailPrice"
               :itemValue="product.pricing.retailPrice.toString()"
            />
            <v-card-subtitle class="primary--text pb-0">
               Status
            </v-card-subtitle>
            <my-edit
               class="px-4"
               do="doProduct"
               :doKey="product.key"
               itemName="status"
               :itemValue="product.status"
               :isSwitch="true"
               :switchOptions="['active', 'inactive']"
            />
         </div>
      </div>
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
         productModal: false,
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
         this.productModal = !this.productModal
      },
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <div>
      <div class="display-1 mb-5">
         <my-edit
            do="doComponent"
            :doKey="product.key"
            itemName="name"
            :itemValue="product['name']"
         />
      </div>
      <masonry :cols="{ 600: 1, 960: 1, 1264: 2, 1904: 3 }" :gutter="20">
         <v-card
            class="shadow-2 mb-5"
            v-for="(component, i, k) in components"
            :key="k"
         >
            <v-card-title>
               <my-edit
                  do="doComponent"
                  :doKey="component.key"
                  itemName="name"
                  :itemValue="component['name']"
               />
            </v-card-title>
            <v-card-text class="pb-1">
               <v-card-subtitle class="primary--text pa-0">
                  Optional
               </v-card-subtitle>
               <my-edit
                  do="doComponent"
                  :doKey="component.key"
                  itemName="optional"
                  :itemValue="component.optional.toString()"
                  :isSwitch="true"
                  :switchOptions="['true', 'false']"
               />
               <v-card-subtitle class="primary--text px-0 pb-0">
                  Retail Price
               </v-card-subtitle>
               <my-edit
                  do="doComponent"
                  :doKey="component.key"
                  itemName="pricing.retailPrice"
                  type="number"
                  :itemValue="component.pricing.retailPrice.toString()"
               />
            </v-card-text>
            <v-card-title class="pt-0">elements</v-card-title>
            <v-card-text>
               <div
                  cols="6"
                  v-for="(element, i, k) in elements[component.key]"
                  :key="k"
               >
                  <!-- <v-card-subtitle class="primary--text">
                     Review
                  </v-card-subtitle> -->
                  <v-card outlined class="mb-2">
                     <my-image
                        :src="element.image"
                        :doKey="element.key"
                        do="doElement"
                     >
                        <my-edit
                           do="doElement"
                           className="v-card__title d-flex flex-nowrap"
                           :doKey="element.key"
                           itemName="name"
                           :itemValue="element.name"
                        />
                     </my-image>
                     <v-card-text class="pa-3 px-4">
                        <v-card-subtitle class="primary--text pa-0">
                           Retail Price
                        </v-card-subtitle>
                        <my-edit
                           do="doElement"
                           :doKey="element.key"
                           itemName="pricing.retailPrice"
                           type="number"
                           :itemValue="element.pricing.retailPrice.toString()"
                        />

                        <v-card-subtitle class="primary--text pa-0">
                           Optional
                        </v-card-subtitle>
                        <my-edit
                           do="doElement"
                           :doKey="element.key"
                           itemName="optional"
                           :itemValue="element.optional.toString()"
                           :isSwitch="true"
                           :switchOptions="['true', 'false']"
                        />
                     </v-card-text>
                  </v-card>
               </div>
            </v-card-text>
         </v-card>
      </masonry>
   </div>
</template>
<script>
export default {
   name: 'Product',
   data() {
      return {}
   },
   computed: {
      product() {
         return this.$store.state.shop.currentProduct
      },
      components() {
         const key = this.$store.state.shop.currentProduct.key
         const components = this.$store.state.shop.components[key]
         return components
      },
      componentsObj() {
         return this._.keyBy(this.components, 'key')
      },
      elements() {
         return this.$store.state.shop.elements
      },
      cores() {
         var items = []
         for (const com of this.components) {
            if (com.optional === false) {
               items.push(com)
            }
         }
         return items
      },
      options() {
         var items = []
         for (const com of this.components) {
            if (com.optional === true) {
               items.push(com)
            }
         }
         return items
      },
   },
   methods: {},
   mounted() {},
   beforeDestroy() {},
}
</script>

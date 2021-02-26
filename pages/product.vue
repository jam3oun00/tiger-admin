<template>
   <div>
      <h2><my-edit
          do="doComponent"
          :doKey="product.key"
          itemName='name'
          :itemValue="product['name']"
         />
      </h2>
      <div v-for="component in components">
        <my-edit
          do="doComponent"
          :doKey="component.key"
          itemName='name'
          :itemValue="component['name']"
         />

         <my-edit
          do="doComponent"
          :doKey="component.key"
          itemName="optional"
          :itemValue="component.optional.toString()"
          :isSwitch="true"
          :switchOptions="['true', 'false']"
         />

         <my-edit
          do="doComponent"
          :doKey="component.key"
          itemName="pricing.retailPrice"
          :itemValue="component.pricing.retailPrice.toString()"
         />
         
         <h2>elements</h2>
         <div v-for="element in elements[component.key]">
            <my-edit 
              do="doElement"
              :doKey="element.key"
              itemName='name'
              :itemValue="element['name']"
            />
         </div>
      </div>
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

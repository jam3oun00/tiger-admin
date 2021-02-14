<template>
   <base-container>
      <masonry :cols="{ 600: 1, 960: 1, 1264: 2, 1904: 3 }" :gutter="20">
         <base-product
            class="mb-5"
            v-for="(data, i, k) in products"
            :key="k"
            :data="data"
         />
      </masonry>
   </base-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
   computed: {
      ...mapState({
         products: (state) => get(state, 'shops.shops.products', {}),
      }),
   },
}
</script>

<style lang="scss" scoped></style>

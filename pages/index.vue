<template>
   <base-container>
      <masonry :cols="{ 600: 1, 960: 1, 1264: 2, 1904: 3 }" :gutter="20">
         <base-do-menu
            v-for="(menu, i, k) in menus"
            :key="k"
            :menu="menu"
            class="mb-5"
         />
      </masonry>
      <!-- <v-row>
         <v-col cols="12" md="4" lg="3" v-for="(menu, i, k) in menus" :key="k">
         </v-col>
      </v-row> -->
   </base-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
   computed: {
      ...mapState({
         menus: (state) => get(state, 'shops.shops.menus', {}),
      }),
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <base-container>
      <masonry :cols="{ 600: 1, 960: 1, 1264: 2, 1904: 3 }" :gutter="20">
         <my-menu
            v-for="(menu, i, k) in menus"
            :key="k"
            :menu="menu"
            class="mb-5"
         />
      </masonry>
      <v-btn fixed bottom right fab color="primary" @click="modal = !modal">
         <plus-icon />
      </v-btn>
      <modal v-model="modal" title="Add new menu" max-width="450">
         <v-card-text>
            <v-text-field
               v-model="data.name"
               placeholder="Enter menu name"
               filled
               autofocus
               clearable
            />
            <v-textarea
               v-model="data.description"
               filled
               placeholder="Enter menu description"
               auto-grow
            />
         </v-card-text>
         <div class="d-flex">
            <v-spacer />
            <v-btn
               :loading="loading"
               class="primary mx-3 mb-3"
               @click="doMenu('')"
               >create</v-btn
            >
         </div>
      </modal>
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
   data() {
      return {
         modal: false,
         modalEnd: false,
         modalStart: false,
         loading: false,
         data: {
            name: '',
            description: '',
            // status: 'active',
            hours: {
               start: null,
               end: null,
            },
         },
      }
   },
   computed: {
      ...mapState({
         menus: (state) => get(state, 'shop.shop.menus', {}),
      }),
   },
   methods: {
      doMenu(key) {
         this.loading = true
         this.$store
            .dispatch('shop/doMenu', {
               key,
               contact: this.$store.state.shop.shop.contact,
               ...this.data,
            })
            .then(() => {
               this.modal = false
            })
            .finally(() => {
               this.loading = false
            })
      },
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <base-container>
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
               filled
               placeholder="Enter menu description"
               v-model="data.description"
               auto-grow
            />
            <template>
               <!--  -->
               <!--  -->
               <!--  -->
               <v-dialog
                  v-model="modalStart"
                  ref="modalStart"
                  :return-value.sync="data.hours.start"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ data.hours.start || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalStart"
                     v-model="data.hours.start"
                     full-width
                  >
                     <v-spacer />
                     <v-btn
                        text
                        color="primary"
                        @click="
                           modalEnd = false
                           $refs.modalStart.save(data.hours.start)
                        "
                     >
                        OK
                     </v-btn>
                  </v-time-picker>
               </v-dialog>

               <v-dialog
                  ref="modalEnd"
                  v-model="modalEnd"
                  :return-value.sync="data.hours.end"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ data.hours.end || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalEnd"
                     v-model="data.hours.end"
                     full-width
                  >
                     <v-spacer />
                     <v-btn
                        text
                        color="primary"
                        @click="
                           modalEnd = false
                           $refs.modalEnd.save(data.hours.end)
                        "
                     >
                        OK
                     </v-btn>
                  </v-time-picker>
               </v-dialog>
               <!--  -->
               <!--  -->
               <!--  -->
            </template>
         </v-card-text>
         <div class="d-flex">
            <v-spacer />
            <v-btn
               :loading="loading"
               @click="doMenu('')"
               class="primary mx-3 mb-3"
               >create</v-btn
            >
         </div>
      </modal>
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
               key: key,
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

<template>
   <v-card class="shadow-2">
      <!--  -->
      <!-- title (name) -->
      <!--  -->
      <v-card-title class="d-flex flex-nowrap">
         <v-text-field
            name="name"
            v-model="form.name"
            placeholder="Enter menu name"
            filled
            rounded
            dense
            autofocus
            clearable
            hide-details
            class="fill-width"
            v-if="isInEditMode.name"
         />
         <span
            v-else
            @click="
               isInEditMode.name = true
               form.name = menu.name
            "
         >
            {{ form.name }}
         </span>
         <v-spacer />
         <div class="ml-2 d-flex" v-if="isInEditMode.name">
            <v-btn
               icon
               class="mt-1"
               color="success"
               @click="doMenu(menu.key)"
               :disabled="!form.name"
            >
               <check-icon />
            </v-btn>
            <v-btn
               icon
               class="mt-1"
               color="error"
               @click="isInEditMode.name = false"
            >
               <x-icon />
            </v-btn>
         </div>
      </v-card-title>

      <v-card-text>
         <!--  -->
         <!-- description  -->
         <!--  -->
         <div>
            <div class="d-flex" v-if="isInEditMode.desc">
               <v-textarea
                  filled
                  placeholder="Enter menu description"
                  v-model="form.description"
                  auto-grow
                  class="fill-width"
                  hide-details
               />
               <v-spacer />
               <div class="ml-2">
                  <v-btn
                     icon
                     class="mt-1"
                     color="success"
                     @click="doMenu(menu.key)"
                  >
                     <check-icon />
                  </v-btn>
                  <v-btn
                     icon
                     class="mt-1"
                     color="error"
                     @click="isInEditMode.desc = false"
                  >
                     <x-icon />
                  </v-btn>
               </div>
            </div>
            <!--  -->
            <div
               v-else
               @click="
                  isInEditMode.desc = true
                  form.description = menu.description
               "
            >
               {{ form.description || 'Without description' }}
            </div>
         </div>
         <v-divider class="my-6"></v-divider>
         <div class="d-flex">
            <template>
               <!--  -->
               <!--  -->
               <!--  -->
               <v-dialog
                  v-model="modalStart"
                  ref="modalStart"
                  :return-value.sync="form.start"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ form.start || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalStart"
                     v-model="form.start"
                     full-width
                  >
                     <v-spacer />
                     <v-btn text color="primary" @click="modalStart = false">
                        Cancel
                     </v-btn>
                     <v-btn
                        text
                        color="primary"
                        @click="updateTimeModal(menu.key, 'start')"
                     >
                        OK
                     </v-btn>
                  </v-time-picker>
               </v-dialog>
               <!--  -->
               <!--  -->
               <!--  -->
               <v-dialog
                  ref="modalEnd"
                  v-model="modalEnd"
                  :return-value.sync="form.end"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ form.end || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalEnd"
                     v-model="form.end"
                     full-width
                  >
                     <v-spacer />
                     <v-btn text color="primary" @click="modalEnd = false">
                        Cancel
                     </v-btn>
                     <v-btn
                        text
                        color="primary"
                        @click="updateTimeModal(menu.key, 'end')"
                     >
                        OK
                     </v-btn>
                  </v-time-picker>
               </v-dialog>
               <!--  -->
               <!--  -->
               <!--  -->
            </template>
            <v-spacer />
            <v-select
               dense
               class="primary"
               hide-details
               filled
               dark
               :items="['active', 'inactive']"
               v-model="form.status"
               style="max-width: 120px"
               @change="doMenu(menu.key)"
            >
               <template #append>
                  <chevron-down-icon size="21" />
               </template>
            </v-select>
         </div>
      </v-card-text>
   </v-card>
</template>

<script>
import { get, isEmpty } from 'lodash'
export default {
   props: {
      menu: {
         type: [Object],
         default: () => {},
      },
   },
   data() {
      return {
         get,
         isEmpty,
         modalStart: false,
         modalEnd: false,
         form: {
            name: this.menu.name || '',
            description: this.menu.description || '',
            start:
               this.menu.hours && this.menu.hours.start
                  ? this.menu.hours.start
                  : '',
            end:
               this.menu.hours && this.menu.hours.end
                  ? this.menu.hours.end
                  : '',
            status: this.menu.status,
         },
         isInEditMode: {
            name: false,
            desc: false,
            status: false,
            time: false,
         },
         loaders: {
            name: false,
            desc: false,
            status: false,
            time: false,
            hours: false,
         },
      }
   },
   methods: {
      doMenu(key) {
         this.$store
            .dispatch('shops/updateShop', {
               key,
               contact: this.$store.state.shops.shops.contact,
               ...this.form,
            })
            .finally(() => {
               for (let key in this.isInEditMode) {
                  this.isInEditMode[key] = false
               }
               for (let key in this.loaders) {
                  this.loaders[key] = false
               }
            })
      },
      updateTimeModal(key, time) {
         time === 'end'
            ? this.$refs.modalEnd.save(this.form.end)
            : this.$refs.modalStart.save(this.form.start)
         //  this.loaders.hours = true
         this.doMenu(key)
      },
      updateTime() {
         console.warn(this.form, this.menu)
         // start
         this.form.start
            ? (this.form.start = [
                 this.form.start.slice(0, 2),
                 ':',
                 this.form.start.slice(2),
              ].join(''))
            : null

         // end
         this.form.end
            ? (this.form.end = [
                 this.form.end.slice(0, 2),
                 ':',
                 this.form.end.slice(2),
              ].join(''))
            : null
      },
   },
   mounted() {
      this.updateTime()
   },
}
</script>

<style lang="scss" scoped></style>

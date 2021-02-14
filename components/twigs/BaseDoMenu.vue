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
                  :return-value.sync="form.hours.start"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ form.hours.start || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalStart"
                     v-model="form.hours.start"
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
                  :return-value.sync="form.hours.end"
                  persistent
                  width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-chip v-bind="attrs" v-on="on">
                        {{ form.hours.end || 'Not set' }}
                     </v-chip>
                  </template>
                  <v-time-picker
                     format="ampm"
                     v-if="modalEnd"
                     v-model="form.hours.end"
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
            hours: { ...this.menu.hours } || '',
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
         //  if (!name) return
         let form = this.form
         //  for (let key in form.hours) {
         //     form.hours[key]
         //        ? (form.hours[key] = form.hours[key].slice(0, 2))
         //        : null
         //  }
        //  console.warn('cc', { ...form.hours })
        //  form.hours.start
        //     ? (form.hours.start = 'form.hours.start.slice(0, 2)')
        //     : null
        //  console.warn('cc', { ...form.hours })
        //  form.hours.end ? (form.hours.end = 'form.hours.end.slice(0, 2)') : null
          this.$store
             .dispatch('shops/updateShop', {
                key,
                contact: this.$store.state.shops.shops.contact,
                ...form,
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
            ? this.$refs.modalEnd.save(this.form.hours.end)
            : this.$refs.modalStart.save(this.form.hours.start)
         //  this.loaders.hours = true
         this.doMenu(key)
      },
   },
   mounted() {
      if (!isEmpty(this.form.hours)) {
         console.log('lrekhgd5fg4df54gd65f4gej')
         for (let key in this.form.hours) {
            this.form.hours[key] = [
               this.form.hours[key].slice(0, 2),
               ':',
               this.form.hours[key].slice(2),
            ].join('')
         }
      }
   },
}
</script>

<style lang="scss" scoped></style>

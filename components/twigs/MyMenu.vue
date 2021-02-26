<template>
   <v-card class="shadow-2">
      <!--  -->
      <!-- title (name) -->
      <!--  -->
      <v-card-title class="d-flex flex-nowrap">
         <my-edit
            do="doMenu"
            :doKey="menu.key"
            itemName="name"
            :itemValue="menu.name"
         />
      </v-card-title>

         <my-edit
            do="doMenu"
            :doKey="menu.key"
            itemName="status"
            :itemValue="menu.status"
            :isSwitch="true"
            :switchOptions="['active', 'inactive']"
         />

         <v-btn icon @click="showProducts()">
            <v-icon>
               {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
         </v-btn>

         <v-expand-transition>
            <div v-show="show">
               <my-products :menuKey="menu.key" class="mt-6" />
            </div>
         </v-expand-transition>
      
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
         show: false,
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
      showProducts() {
         this.show = !this.show
      },
      doMenu(key) {
         this.$store
            .dispatch('shop/doMenu', {
               key,
               contact: this.$store.state.shop.shop.contact,
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
         // console.warn(this.form, this.menu)
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

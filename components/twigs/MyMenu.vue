<template>
   <v-card class="shadow-2">
      <!--  -->
      <!-- title (name) -->
      <!--  -->
      <!-- <v-card-title class="d-flex flex-nowrap">
         <my-edit
            do="doMenu"
            :doKey="menu.key"
            itemName="name"
            :itemValue="menu.name"
         />
      </v-card-title> -->
      <v-img
         :aspect-ratio="16 / 10"
         :src="menu.image"
         class="white--text align-end"
         gradient="to bottom, rgba(0,0,0,.07), rgba(0,0,0,.55)"
      >
         <my-edit
            do="doMenu"
            className="v-card__title d-flex flex-nowrap"
            :doKey="menu.key"
            itemName="name"
            :itemValue="menu.name"
         />
      </v-img>
      <v-card-text>
         <my-edit
            do="doMenu"
            :doKey="menu.key"
            itemName="description"
            :itemValue="menu.description"
            textarea
         />

         <div class="d-flex align-center mt-4">
            <v-btn @click="show = !show" rounded>
               Products
               <v-icon right>
                  {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
               </v-icon>
            </v-btn>
            <v-spacer />
            <my-edit
               do="doMenu"
               :doKey="menu.key"
               itemName="status"
               :itemValue="menu.status"
               isSwitch
               :switchOptions="['active', 'inactive']"
            />
         </div>
      </v-card-text>

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
      // doMenu(key) {
      //    this.$store
      //       .dispatch('shop/doMenu', {
      //          key,
      //          contact: this.$store.state.shop.shop.contact,
      //          ...this.form,
      //       })
      //       .finally(() => {
      //          for (let key in this.isInEditMode) {
      //             this.isInEditMode[key] = false
      //          }
      //          for (let key in this.loaders) {
      //             this.loaders[key] = false
      //          }
      //       })
      // },
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

<template>
   <div :key="editing">
      <div v-if="isSwitch">
         <v-switch
            v-model="switched"
            inset
            :label="`${itemName}: ${edit}`"
            @click="doEdit"
         ></v-switch>
      </div>
      <div v-else>
         <v-text-field
            v-if="editing"
            v-model="edit"
            name="name"
            :placeholder="'Input ' + itemName"
            filled
            rounded
            dense
            autofocus
            hide-details
            class="fill-width"
         />
         <span v-else @click="editing = true">
            {{ edit }}
         </span>

         <div class="ml-2 d-flex" v-if="editing">
            <v-btn
               icon
               class="mt-1"
               color="success"
               @click="doEdit()"
               :disabled="!edit"
            >
               <check-icon />
            </v-btn>
            <v-btn icon class="mt-1" color="error" @click="undoEdit()">
               <x-icon />
            </v-btn>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      do: {
         type: String,
         default: '',
      },
      doKey: {
         type: String,
         default: '',
      },
      itemName: {
         type: String,
         default: '',
      },
      itemValue: {
         type: String,
         default: '',
      },
      isSwitch: {
         type: Boolean,
         default: false,
      },
      switchOptions: {
         type: Array,
         default: function () {
            return ['on', 'off']
         },
      },
   },
   data() {
      return {
         editing: false,
         edit: '',
         switched: false,
      }
   },
   mounted() {
      this.edit = this.itemValue
      if (!this.itemValue) {
         this.editing = true
      }
      if (this.itemValue == this.switchOptions[0]) {
         this.switched = true
      }
   },
   methods: {
      undoEdit() {
         this.edit = this.itemValue
         this.editing = false
      },
      doEdit() {
         if (this.isSwitch) {
            if (this.edit === this.switchOptions[0]) {
               this.edit = this.switchOptions[1].toString()
            } else {
               this.edit = this.switchOptions[0].toString()
            }
         }
         const data = {}
         data['key'] = this.doKey
         data[this.itemName] = this.edit
         const todo = this.do
         const update = { todo, data }
         this.$store.dispatch('shop/update', update)
         this.editing = false
      },
   },
}
</script>

<style lang="scss" scoped></style>

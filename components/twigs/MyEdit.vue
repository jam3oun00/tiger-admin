<template>
   <div :key="editing" v-click-outside="undoEdit">
      <div v-if="isSwitch">
         <v-switch
            v-model="switched"
            inset
            class="mt-2 mb-1"
            hide-details
            :label="noSwitchLabel ? false : `${itemName}: ${edit}`"
            @click="doEdit"
         />
      </div>
      <div v-else>
         <div v-if="editing">
            <v-textarea
               v-if="textarea"
               filled
               :placeholder="`Input ${itemName} description`"
               v-model="edit"
               auto-grow
               class="fill-width"
               hide-details
            >
               <template #append>
                  <base-append-input
                     @confirm="doEdit()"
                     @cancel="undoEdit()"
                     :value="edit"
                  />
               </template>
            </v-textarea>
            <v-text-field
               v-else
               v-model="edit"
               :type="type"
               name="name"
               :placeholder="`Input ${itemName}`"
               filled
               rounded
               dense
               autofocus
               hide-details
               class="fill-width"
            >
               <template #append>
                  <base-append-input
                     @confirm="doEdit()"
                     @cancel="undoEdit()"
                     :value="edit"
                  />
               </template>
            </v-text-field>
         </div>
         <span v-else @click="editing = true" :class="className">
            {{ edit }}
         </span>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      className: String,
      do: String,
      doKey: String,
      itemName: String,
      itemValue: String,
      textarea: Boolean,
      isSwitch: Boolean,
      noSwitchLabel: Boolean,
      switchOptions: {
         type: Array,
         default: () => ['on', 'off'],
      },
      type: {
         type: String,
         default: 'text',
      },
   },
   data() {
      return {
         editing: false,
         edit: '',
         switched: false,
      }
   },
   watch: {
      switched(v) {
         this.$emit('switch', v)
      },
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
         if (this.editing) {
            console.log('/ undoEdit /')
            this.edit = this.itemValue
            this.editing = false
         }
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

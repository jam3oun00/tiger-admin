<template>
   <div>
      <v-dialog
         transition="scroll-y-transition"
         :width="width"
         v-model="dialog"
      >
         <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>{{ msg }}</v-card-text>
            <v-card-actions>
               <v-spacer />
               <v-btn text @click="cancel">cancel</v-btn>
               <v-btn
                  color="primary"
                  @click="confirm"
                  :loading="loading"
                  :disabled="loading"
               >
                  {{ ConfirmTxt }}
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
export default {
   props: {
      value: {
         type: Boolean,
         default: false,
      },
      width: {
         type: [Number, String],
         default: 400,
      },
      title: {
         type: [String],
         default: 'Warning',
      },
      msg: {
         type: [String],
         default: 'Are you sure',
      },
      ConfirmTxt: {
         type: [String],
         default: 'Yes',
      },
      loading: {
         type: [Boolean],
         default: false,
      },
   },
   data() {
      return {
         dialog: false,
      }
   },
   watch: {
      dialog(v) {
         this.$emit('input', v)
      },
      value(v) {
         this.dialog = v
      },
   },
   methods: {
      confirm() {
         this.$emit('confirm')
      },
      cancel() {
         this.dialog = false
         this.$emit('cancel')
      },
   },
   beforeMount() {
      this.$nextTick(() => {
         this.dialog = this.value
      })
   },
}
</script>

<style lang="scss" scoped></style>

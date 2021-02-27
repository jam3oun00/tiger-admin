<template>
   <div>
      <v-dialog
         :fullscreen="fullscreen"
         transition="scroll-y-transition"
         :width="width"
         :max-width="maxWidth"
         v-model="dialog"
      >
         <v-card
            :color="color || 'wall'"
            :disabled="loading"
            :loading="loading"
         >
            <v-card-title class="text-capitalize" v-if="title" v-text="title" />
            <slot />
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
export default {
   props: {
      value: Boolean,
      loading: Boolean,
      maxWidth: [Number, String],
      title: String,
      fullscreen: Boolean,
      color: String,
      width: {
         type: [Number, String],
         default: 900,
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
   beforeMount() {
      this.$nextTick(() => {
         this.dialog = this.value
      })
   },
}
</script>

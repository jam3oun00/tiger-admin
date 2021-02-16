<template>
   <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      floating
      :temporary="temporary"
      :permanent="permanent"
      :hide-overlay="hideOverlay"
      :right="!left"
      class="wall"
      :width="$vuetify.breakpoint.xsOlny ? '100%' : width"
   >
      <v-card class="py-12 ma-0 transparent" tile flat :disabled="loading">
         <v-btn @click="drawer = !drawer" style="z-index: 1000" icon absolute top right>
            <v-icon>mdi-close</v-icon>
         </v-btn>
         <div class="px-6">
            <v-card-title v-if="$slots.head" class="text-capitalize px-0 pt-0">
               <slot name="head" />
            </v-card-title>
            <slot />
         </div>
      </v-card>
   </v-navigation-drawer>
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
         default: 450,
      },
      left: {
         type: Boolean,
         default: false,
      },
      temporary: {
         type: Boolean,
         default: true,
      },
      permanent: {
         type: Boolean,
         default: false,
      },
      loading: {
         type: Boolean,
         default: false,
      },
      hideOverlay: Boolean,
   },
   data() {
      return {
         drawer: !!this.value,
      }
   },
   watch: {
      drawer(v) {
         this.$emit('input', v)
      },
      value(v) {
         this.drawer = v
      },
   },
   beforeMount() {
      this.$nextTick(() => {
         this.drawer = this.value
      })
   },
}
</script>

<style lang="scss" scoped></style>

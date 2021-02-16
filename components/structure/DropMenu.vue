<template>
   <v-menu
      offset-y
      transition="slide-x-transition"
      class="spacer-menu"
      :left="right"
      :bottom="top"
      :top="bottom"
      :right="left"
   >
      <template #activator="{ on, attrs }">
         <v-btn
            style="z-index: 2"
            v-bind="attrs"
            v-on="on"
            :icon="fab || $slots.btn ? false : icon"
            :absolute="absolute"
            :right="right"
            :left="left"
            :top="top"
            :bottom="bottom"
            :color="color"
            :fab="fab"
            :small="small"
            :xSmall="xSmall"
            :class="btnClass"
         >
            <slot name="btn" v-if="$slots.btn" />
            <v-icon v-else>mdi-dots-vertical</v-icon>
         </v-btn>
      </template>
      <v-list dense color="wall" class="pa-0">
         <!-- Content will be here -->
         <slot />
         <!-- / -->
      </v-list>
   </v-menu>
</template>

<script>
export default {
   props: {
      absolute: Boolean,
      btnClass: String,
      bottom: Boolean,
      right: Boolean,
      small: Boolean,
      xSmall: Boolean,
      left: Boolean,
      top: Boolean,
      fab: Boolean,
      icon: {
         type: Boolean,
         default: true,
      },
      color: {
         type: String,
         default: 'primary',
      },
   },
}
</script>

<style lang="scss" scoped>
.v-menu__content {
   margin: 5px 0;
}
</style>

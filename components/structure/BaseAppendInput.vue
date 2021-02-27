<template>
   <v-chip color="primary" small class="px-1">
      <v-btn small icon @click="$emit('confirm')" :disabled="!value">
         <check-icon size="18" />
      </v-btn>
      <v-btn small icon @click="$emit('cancel')">
         <x-icon size="18" />
      </v-btn>
   </v-chip>
</template>

<script>
export default {
   props: {
      value: [Number, String],
   },
}
</script>

<style lang="scss" scoped></style>

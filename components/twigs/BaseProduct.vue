<template>
   <v-card class="shadow-2">
      <v-img
         height="250"
         :src="data.image"
         class="white--text align-end"
         gradient="to bottom, rgba(0,0,0,.07), rgba(0,0,0,.55)"
      >
         <v-card-title>{{ data.name }}</v-card-title>
      </v-img>
      <v-card-subtitle class="primary--text pb-0"> Review </v-card-subtitle>
      <v-card-text>
         {{ data.details.review }}
      </v-card-text>
      <v-divider />
      <v-card-subtitle class="primary--text pb-0"> Description </v-card-subtitle>
      <v-card-text>
         {{ data.details.description }}
      </v-card-text>
   </v-card>
</template>

<script>
export default {
   props: {
      data: {
         type: [Object],
         default: () => {},
      },
   },
   data() {
      return {
         show: false,
      }
   },
}
</script>

<style lang="scss" scoped></style>

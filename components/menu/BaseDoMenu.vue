<template>
   <v-card class="shadow-2">
      <v-card-title class="d-flex flex-nowrap">
         <v-text-field
            name="name"
            v-model="name"
            placeholder="Enter menu name"
            filled
            rounded
            dense
            autofocus
            clearable
            hide-details
            v-if="isInEditMode"
         />
         <span v-else @click="isInEditMode = true">
            {{ menu.name }}
         </span>
         <v-spacer />
         <div class="ml-2 d-flex">
            <!--  -->
            <template v-if="isInEditMode">
               <v-btn icon class="mt-1">
                  <check-icon />
               </v-btn>
               <v-btn icon class="mt-1" @click="isInEditMode = false">
                  <x-icon />
               </v-btn>
            </template>

            <!--  -->
            <v-btn icon class="mt-1" v-else @click="isInEditMode = true">
               <pencil-icon />
            </v-btn>
         </div>
      </v-card-title>

      <!--  -->
      <v-card-text>
         {{ menu }}
         <div class="d-flex">
            <v-spacer />
            <v-chip
               small
               label
               class="font-weight-bold text-capitalize"
               outlined
               color="primary"
            >
               {{ menu.status }}
            </v-chip>
         </div>
      </v-card-text>
   </v-card>
</template>

<script>
export default {
   props: {
      menu: {
         type: [Object],
         default: {},
      },
   },
   data() {
      return {
         name: this.menu.name,
         isInEditMode: false,
      }
   },
}
</script>

<style lang="scss" scoped></style>

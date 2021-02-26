<template>
   <div>
      <v-card flat class="transparent">
         <v-img
            :aspect-ratio="16 / 10"
            :src="product.image"
            class="white--text align-end elevation-4"
            gradient="to bottom, rgba(0,0,0,.07), rgba(0,0,0,.55)"
         >
            <v-text-field
               name="name"
               v-model="form.name"
               placeholder="Enter menu name"
               filled
               rounded
               dense
               autofocus
               hide-details
               class="fill-width"
               v-click-outside="hideTitle"
               v-if="isInEditMode.name"
            />
            <v-card-subtitle
               class="white--text"
               v-else
               @click="
                  isInEditMode.name = true
                  form.name = product.name
               "
            >
               {{ form.name || product.name }}
            </v-card-subtitle>
         </v-img>
         <div>
            <v-card-subtitle class="primary--text pb-0">
               Review
            </v-card-subtitle>
            <!--  -->
            <v-expand-transition>
               <v-textarea
                  filled
                  placeholder="Enter menu description"
                  v-model="form.description"
                  auto-grow
                  class="mt-1 mx-4"
                  hide-details
                  v-click-outside="hideRev"
                  v-if="isInEditMode.rev"
               />
            </v-expand-transition>

            <!--  -->

            <v-card-text
               v-if="!isInEditMode.rev"
               @click="
                  isInEditMode.rev = true
                  form.review = product.details.review
               "
            >
               {{ form.review || product.details.review }}
            </v-card-text>
         </div>
         <div>
            <v-card-subtitle class="primary--text pb-0">
               Description
            </v-card-subtitle>
            <v-card-text>
               {{ product.details.description }}
            </v-card-text>
         </div>

         <div class="mx-n4">
            <v-divider class="mb-5" />
         </div>
      </v-card>
   </div>
</template>

<script>
export default {
   props: {
      menuKey: String,
      product: [Object, Array],
   },
   data() {
      return {
         show: false,
         isInEditMode: {
            name: false,
            desc: false,
            rev: false,
         },
         form: {
            name: false,
            description: false,
            review: false,
         },
      }
   },
   methods: {
      inputsManager(key, originalKey) {
         this.isInEditMode[key] = false
         originalKey === 'name'
            ? (this.form[originalKey] = this.product[originalKey])
            : (this.form[originalKey] = this.product.details[originalKey])
      },
      hideTitle() {
         this.inputsManager('name', 'name')
      },
      hideRev() {
         this.inputsManager('rev', 'review')
      },
      hideDesc() {
         this.inputsManager('desc', 'description')
      },
   },
}
</script>

<style lang="scss" scoped></style>

<template>
   <div :key="linkGot">
      <!-- @click="chooseImage" -->
      <!--  -->
      <modal v-model="modal" color="back" width="500">
         <v-card-title> {{ src ? 'Edit Image' : 'Add Image' }} </v-card-title>
         <v-divider />
         <v-img
            v-if="imageData || linkGot || src"
            :src="imageData || linkGot || src"
            class="white--text align-end placeholder"
         />
         <v-btn v-else @click="chooseImage" class="placeholder">
            Choose an Image
         </v-btn>

         <v-divider />
         <v-card-actions>
            <v-btn
               text
               color="primary"
               rounded
               class="px-4 text-capitalize"
               @click="chooseImage"
               v-if="imageData || linkGot || src"
            >
               select a new one
            </v-btn>
            <v-spacer />
            <v-btn text @click="modal = !modal">cancel</v-btn>
            <v-btn
               text
               color="primary"
               @click="submit"
               :loading="loading"
               :disabled="loading || (!imageData && !linkGot)"
            >
               {{ src ? 'update image' : 'done' }}
            </v-btn>
         </v-card-actions>
      </modal>
      <!--  -->
      <!-- <span v-if="!imageData" class="placeholder"> Choose an Image </span>

      <div>
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <span> {{ linkGot }} </span>
      </div> -->
      <input
         class="file-input"
         ref="fileInput"
         accept="image/jpeg, image/jpg, image/png"
         type="file"
         @change="onSelectFile"
      />
      <v-card flat tile class="transparent">
         <v-img
            :aspect-ratio="ar || 16 / 10"
            :data-link-got="linkGot"
            :src="linkGot || imageData || src || '/thumbnail.png'"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.07), rgba(0,0,0,.55)"
         >
            <slot />
         </v-img>
         <v-btn
            absolute
            top
            left
            dark
            class="primary"
            @click="modal = !modal"
            icon
         >
            <!-- @click="doImage" -->
            <!-- cloud-upload -->
            <!-- edit image -->
            <photo-icon size="20" />
         </v-btn>
      </v-card>
   </div>
</template>

<script>
// ref: https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64

import axios from 'axios'
import FormData from 'form-data'

export default {
   props: {
      do: String,
      doKey: String,
      itemName: {
         type: String,
         default: 'image',
      },
      src: String,
      ar: [String, Number],
   },

   data() {
      return {
         imageData: null,
         apiKey: '8a370d22bbc9d264258d379b3aaede56',
         bbURL: 'https://api.imgbb.com/1/upload',
         image: 'https://pngimg.com/uploads/tiger/tiger_PNG23222.png',
         linkGot: '',
         input: '',
         files: [],
         modal: false,
         loading: false,
      }
   },
   methods: {
      doImage() {
         const data = {}
         data['key'] = this.doKey
         data[this.itemName] = this.linkGot
         const todo = this.do
         const update = { todo, data }
         // NOTE: API DO NOT YET SUPPORT UDPATE IMAGE FOR SHOP
         // FOR NOW ONLY SUPPORT IMAGE UDPATE FOR PRODUCTS-COMPONENTS-ELEMENT
         this.$store.dispatch('shop/update', update)
      },
      upload(image) {
         console.log('hi')
         try {
            var bodyFormData = new FormData()
            bodyFormData.append('key', this.apiKey)
            bodyFormData.append('image', image)
            axios({
               method: 'post',
               url: this.bbURL,
               data: bodyFormData,
            })
               .then((response) => {
                  //handle success
                  console.log(response.data.data.display_url)
                  this.linkGot = response.data.data.display_url
               })
               .catch(function (response) {
                  //handle error
                  console.log(response)
               })
               .finally(() => {
                  this.modal = false
                  this.$forceUpdate()
                  this.loading = false
               })
         } catch (error) {
            console.log(error)
         }
      },
      chooseImage() {
         this.$refs.fileInput.click()
      },
      onSelectFile() {
         this.input = this.$refs.fileInput
         this.files = this.input.files
         if (this.files && this.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
               this.imageData = e.target.result
               // const b64 = this.imageData.split(';base64,').slice(-1)[0]
               // this.upload(b64)
            }
            reader.readAsDataURL(this.files[0])
            // this.$emit('input', this.files[0])
         }
      },
      submit() {
         this.loading = true
         if (this.imageData) {
            const reader = new FileReader()
            const b64 = this.imageData.split(';base64,').slice(-1)[0]
            this.upload(b64)
            reader.readAsDataURL(this.files[0])
            this.$emit('input', this.files[0])
         }
      },
   },
}
</script>

<style scoped>
.base-image-input {
   display: block;
   width: 200px;
   height: 200px;
   cursor: pointer;
   background-size: cover;
   background-position: center center;
}
.placeholder {
   width: 100%;
   min-height: 250px;
   max-height: 450px;
}
.file-input {
   display: none;
}
</style>

<template>
   <div :key="linkGot">
      <!-- @click="chooseImage" -->
      <!--  -->
      <modal v-model="modal" color="back" width="500">
         <v-card-title> Update Image </v-card-title>
         <v-divider />
         <v-img
            v-if="imageData || linkGot || src"
            :src="imageData || linkGot || src"
            class="placeholder"
         />
         <v-divider />
         <v-card-actions>
            <v-spacer />
            <v-btn text @click="cancel">cancel</v-btn>
            <v-btn
               text
               color="primary"
               @click="submit"
               :loading="loading"
               :disabled="loading || (!imageData && !linkGot)"
            >
               update
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
            @click="chooseImage"
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
      cancel() {
         this.imageData = null
         this.linkGot = ''
         this.input = ''
         this.files = []
         this.loading = false
         this.modal = false
      },
      doImage() {
         const data = {}
         data['key'] = this.doKey
         data[this.itemName] = this.linkGot
         const todo = this.do
         const update = { todo, data }
         this.modal = false
         this.loading = false
         // NOTE: API DO NOT YET SUPPORT UDPATE IMAGE FOR SHOP
         // FOR NOW ONLY SUPPORT IMAGE UDPATE FOR PRODUCTS-COMPONENTS-ELEMENT
         this.$store.dispatch('shop/update', update)
      },
      upload(image) {
         console.log('start upload')
         this.$store.commit('structure/alert/alertMe', {
            msg: `Upload in progress...`,
            type: 'info',
         })
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
                  this.$store.commit('structure/alert/alertMe', {
                     msg: `Uploaded successfuly, proccessing...`,
                     type: 'info',
                  })
                  this.linkGot = response.data.data.display_url
                  this.doImage()
               })
               .catch(function (response) {
                  //handle error
                  console.log(response)
                  // this.modal = false
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
            console.log('____ it should open the modal ____')
            this.modal = true
            const reader = new FileReader()
            reader.onload = (e) => {
               this.imageData = e.target.result
            }
            reader.readAsDataURL(this.files[0])
         }
      },
      submit() {
         console.log('start submit')
         this.loading = true
         if (this.imageData) {
            const reader = new FileReader()
            const b64 = this.imageData.split(';base64,').slice(-1)[0]
            console.log('trigger upload')
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

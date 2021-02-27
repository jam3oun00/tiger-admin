<template>
   <div
      :key="linkGot"
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
   >
      <span v-if="!imageData" class="placeholder"> Choose an Image </span>
      <input
         class="file-input"
         ref="fileInput"
         type="file"
         @input="onSelectFile"
      />

      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <span> {{linkGot}} </span>
      <v-btn @click="doImage">Update image</v-btn>
      </div>

   </div>
</template>

<script>

// ref: https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64

import axios from 'axios'
import FormData from 'form-data'

export default {
    props: {
      do: {
         type: String,
         default: '',
      },
      doKey: {
         type: String,
         default: '',
      },
      itemName: {
         type: String,
         default: '',
      },
   },

   data() {
      return {
         imageData: null,
         apiKey: '8a370d22bbc9d264258d379b3aaede56',
         bbURL: 'https://api.imgbb.com/1/upload',
         image: 'https://pngimg.com/uploads/tiger/tiger_PNG23222.png',
         linkGot: '',
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
         } catch (error) {
            console.log(error)
         }
      },
      chooseImage() {
         this.$refs.fileInput.click()
      },
      onSelectFile() {
         const input = this.$refs.fileInput
         const files = input.files
         if (files && files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
               this.imageData = e.target.result
               const b64 = this.imageData.split(';base64,').slice(-1)[0]
               this.upload(b64)
            }
            reader.readAsDataURL(files[0])
            this.$emit('input', files[0])
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
   background: #f0f0f0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #333;
   font-size: 18px;
   font-family: Helvetica;
}
.placeholder:hover {
   background: #e0e0e0;
}
.file-input {
   display: none;
}
</style>

export default function ({ $axios, store }) {
   $axios.onError((error) => {
      console.log('axios', error)
      // store.commit('structure/alert/alertMe', {
      //    msg: error.response.data,
      //    type: 'error',
      // })
   })
}

// in the store with have all the requests and apis calls

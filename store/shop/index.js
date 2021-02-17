export const state = () => ({
   shop: {},
})
export const mutations = {
   setMenus(state, payload) {
      state.shop = payload || {}
      console.warn('._.', payload)
   },
}
export const getters = {
   getProduct: (state) => (key) => {
      let products = []
      if (key) {
         products = state.shop.products.filter((v) => (v.menuKey = key))
      }
      return products
   },
}
export const actions = {
   getShop({ commit }) {
      return new Promise((resolve, reject) => {
         try {
            const shop = JSON.parse(localStorage.getItem('shop_data')) || {}
            commit('setMenus', shop)
            resolve(shop)
         } catch (e) {
            commit('setMenus', {})
            reject(e)
         }
      })
   },
   updateShop({ commit }, data) {
      let newData = data
      //
      newData.start ? (newData.start = newData.start.replace(':', '')) : null
      newData.end ? (newData.end = newData.end.replace(':', '')) : null
      console.log('%c .__.', 'color:blue', newData)
      //
      return new Promise((resolve, reject) => {
         this.$axios
            .post('/doMenu', newData)
            .then(({ data }) => {
               if (data !== null) {
                  console.log(data ? data : false)
                  localStorage.setItem('shop_data', JSON.stringify({ ...data }))
                  console.log(JSON.parse(localStorage.getItem('shop_data')))
                  commit('setMenus', { ...data })

                  commit(
                     'structure/alert/alertMe',
                     {
                        msg: `The menu has been ${
                           newData.key ? 'updated' : 'created'
                        } successfully`,
                        type: 'success',
                     },
                     { root: true }
                  )
                  resolve({ data })
               } else {
                  commit(
                     'structure/alert/alertMe',
                     {
                        msg: 'error while creating a menu please try again',
                        type: 'error',
                     },
                     { root: true }
                  )
                  reject('error while creating a menu please try again')
               }
            })
            .catch((err) => {
               commit(
                  'structure/alert/alertMe',
                  {
                     msg: 'error while creating a menu please try again',
                     type: 'error',
                  },
                  { root: true }
               )
               reject(err)
            })
      })
   },
}

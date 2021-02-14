export const state = () => ({
   shops: {},
})
export const mutations = {
   setMenus(state, payload) {
      state.shops = payload || {}
      console.warn('._.', payload)
   },
}
export const actions = {
   getShops({ commit }) {
      return new Promise((resolve, reject) => {
         try {
            const shops = JSON.parse(localStorage.getItem('shop_data')) || {}
            commit('setMenus', shops)
            resolve(shops)
         } catch (e) {
            commit('setMenus', {})
            reject(e)
         }
      })
   },
   updateShop({ commit }, data) {
      return new Promise((resolve, reject) => {
         this.$axios
            .post('/doMenu', data)
            .then(({ data }) => {
               console.log({ data })
               localStorage.setItem('shop_data', JSON.stringify(data))
               resolve({ data })
            })
            .catch((err) => {
               reject(err)
            })
      })
   },
}

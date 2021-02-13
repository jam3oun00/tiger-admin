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
            const shops = JSON.parse(localStorage.getItem('shops')) || {}
            commit('setMenus', shops)
            resolve(shops)
         } catch (e) {
            commit('setMenus', {})
            reject(e)
         }
      })
   },
}

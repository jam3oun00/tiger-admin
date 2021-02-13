export const state = () => ({
   msg: '',
   isEnabled: false,
   type: 'succes',
})

export const mutations = {
   alert(state, { msg, type }) {
      state.msg = msg
      state.type = type
   },
   handelAlert(state, isEnabled) {
      state.isEnabled = isEnabled
   },
   alertMe(state, { msg, type }) {
      state.msg = null
      state.type = null
      state.isEnabled = false
      //
      state.msg = msg
      state.type = type
      state.isEnabled = true
      //
      console.warn(`${type} - ${msg}`)
   },
}

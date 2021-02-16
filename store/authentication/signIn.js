export const actions = {
   signin(context, data) {
      return new Promise((resolve, reject) => {
         this.$auth
            .loginWith('local', {
               data: data,
            })
            .then(({ data }) => {
               console.warn(data)
               this.$router.push('/')
               if (data.shop) {
                  localStorage.setItem('shop_data', JSON.stringify(data.shop))
               }
               context.commit(
                  'structure/alert/alertMe',
                  {
                     msg: data.message || 'succefuly loged in',
                     type: 'success',
                  },
                  { root: true }
               )
               resolve(data)
            })
            .catch((err) => {
               reject(err)
            })
      })
   },
}

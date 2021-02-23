import _ from 'lodash'

// TODO: use "vuex-persistedstate" to store state

function genMenuProducts (products) {
  // const menuKeys = ['Dinner', 'Breakfast', 'Lunch']
  // console.log('doign genMenuProducts', menuKeys, products)
  var obj = {}
  var myItems = []
  var menuKeys = []
  for (const product of products) {
    menuKeys.push(product.menuKey)
  }
  menuKeys = [...new Set(menuKeys)]
  for (const key of menuKeys) {
    for (const product of products) {
      if (product.menuKey === key) {
        myItems.push(product)
      }
    }
    if (myItems.length > 0) {
      obj[key] = myItems
    }
    myItems = []
  }
  return obj
}

function genProductComponents (components) {
  // const menuKeys = ['Dinner', 'Breakfast', 'Lunch']
  // console.log('doign genMenuProducts', menuKeys, products)
  var obj = {}
  var myItems = []
  var productKeys = []
  for (const component of components) {
    productKeys.push(component.productKey)
  }
  productKeys = [...new Set(productKeys)]
  for (const key of productKeys) {
    for (const component of components) {
      if (component.productKey === key) {
        myItems.push(component)
      }
    }
    if (myItems.length > 0) {
      obj[key] = myItems
    }
    myItems = []
  }
  return obj
}

function genComponentElements (elements) {
  // const menuKeys = ['Dinner', 'Breakfast', 'Lunch']
  // console.log('doign genMenuProducts', menuKeys, products)
  var obj = {}
  var myItems = []
  var componentKeys = []
  for (const element of elements) {
    componentKeys.push(element.componentKey)
  }
  componentKeys = [...new Set(componentKeys)]
  for (const key of componentKeys) {
    for (const element of elements) {
      if (element.componentKey === key) {
        myItems.push(element)
      }
    }
    if (myItems.length > 0) {
      obj[key] = myItems
    }
    myItems = []
  }
  return obj
}

export const state = () => ({
   shop: {},
   menus: [],
   products: {}, // menuKey as key
   components: {}, // productKey as key, e.g. {product@MenuA: [component1, component2...], product2@MenuA: [component1, ...]}
   elements: {},
})

export const mutations = {
   setShop(state, payload) {
      state.shop = payload || {}
      console.warn('._.', payload)
      state.products = genMenuProducts(payload.products)
      state.components = genProductComponents(payload.components)
      state.elements = genComponentElements(payload.elements)
   },
}
export const getters = {
   getProducts: (state) => (key) => {
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
            const shop = JSON.parse(localStorage.getItem('shop')) || {}
            commit('setShop', shop)
            resolve(shop)
         } catch (e) {
            commit('setShop', {})
            reject(e)
         }
      })
   },
   doMenu({ commit }, data) {
      const newData = data
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
                  console.log(data || false)
                  localStorage.setItem('shop', JSON.stringify({ ...data }))
                  console.log(JSON.parse(localStorage.getItem('shop')))
                  commit('setShop', { ...data })

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

<template>
   <v-app dark>
      <v-snackbar
         transition="scroll-y-transition"
         bottom
         left
         dark
         v-model="alert"
         :color="$store.state.structure.alert.type"
      >
         {{ alertMsg }}
         <!-- <template #action="{ attrs }">
            <v-btn icon v-bind="attrs" @click="alert = false">
               <v-icon>mdi-close-circle</v-icon>
            </v-btn>
         </template> -->
      </v-snackbar>

      <confirm
         v-model="logout"
         msg="are you sure you want to log out?"
         :loading="logoutLoader"
         @confirm="logOut"
      />

      <!--  -->
      <v-navigation-drawer
         v-model="drawer"
         :mini-variant="miniVariant"
         clipped
         fixed
         app
         class="wall"
      >
         <v-list nav dense>
            <v-list-item-group
               color="primary"
               v-model="group"
               active-class="primary--text"
            >
               <template v-for="(link, i) in links">
                  <v-list-item
                     v-if="!link.children"
                     class="mb-1"
                     nuxt
                     :key="i"
                     :to="link.to"
                  >
                     <v-list-item-title
                        class="text-capitalize"
                        v-text="link.title"
                     />
                  </v-list-item>
               </template>
               <template v-for="(link, i) in links">
                  <v-list-group
                     :key="i"
                     v-if="link.children"
                     :prepend-icon="link.icon"
                  >
                     <template #activator>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                     </template>

                     <v-list-item
                        v-for="(sublink, i) in link.children"
                        :key="i"
                        nuxt
                        :to="`${link.group}/${sublink.to}`"
                     >
                        <v-list-item-title v-text="sublink.title" />
                     </v-list-item>
                  </v-list-group>
               </template>
               <v-list-group prepend-icon="mdi-account">
                  <template #activator>
                     <v-list-item-title>setting</v-list-item-title>
                  </template>
                  <v-list-item>
                     <v-list-item-title>
                        <v-switch
                           class="mx-3"
                           @change="toggleMode"
                           v-model="switcher"
                           :label="switcher ? 'dark' : 'light'"
                        />
                     </v-list-item-title>
                  </v-list-item>
               </v-list-group>
            </v-list-item-group>
         </v-list>
         <template #append>
            <div class="pa-2">
               <v-btn rounded block color="primary" @click="logout = true">
                  Logout
               </v-btn>
            </div>
         </template>
      </v-navigation-drawer>

      <!--  -->
      <v-app-bar clipped-left fixed app flat class="wall">
         <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
         <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>
               mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
            </v-icon>
         </v-btn>
         <v-toolbar-title v-text="'title'" />
         <v-spacer />
         <v-btn>hi</v-btn>
      </v-app-bar>
      <v-main class="back">
         <nuxt />
      </v-main>
      <!-- <v-footer :absolute="!fixed" app>
         <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer> -->
   </v-app>
</template>

<script>
import { get } from 'lodash'
export default {
   async fetch() {
      await this.$store.dispatch('shop/getShop').then((d) => console.warn(d))
   },
   data() {
      return {
         get,
         group: false,
         logout: false,
         drawer: false,
         dialog: false,
         switcher: false,
         miniVariant: false,
         logoutLoader: false,
      }
   },
   computed: {
      links() {
         return this.$store.state.structure.links.links
      },
      user() {
         try {
            return this.$auth.user.user
         } catch (err) {
            return 'test user'
         }
      },
      alertMsg: {
         get: function () {
            return this.$store.state.structure.alert.msg
         },
         set: function (newValue) {
            this.$store.commit('structure/alert/alert', newValue)
         },
      },
      alert: {
         get: function () {
            return this.$store.state.structure.alert.isEnabled
         },
         set: function (newValue) {
            this.$store.commit('structure/alert/handelAlert', newValue)
         },
      },
   },
   methods: {
      logOut() {
         this.logoutLoader = true
         this.$auth.logout().finally(() => {
            this.logoutLoader = false
            this.logout = false
         })
         console.log('log-out')
      },
      toggleMode() {
         this.$vuetify.theme.dark = !this.$vuetify.theme.dark
         localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
      },
   },
   async mounted() {
      this.$fetch()
      const darTheme = localStorage.getItem('dark_theme')
      if (darTheme) {
         if (darTheme == 'true') {
            this.$vuetify.theme.dark = await true
            this.switcher = await true
         } else {
            this.$vuetify.theme.dark = await false
            this.switcher = await false
         }
      }
   },
}
</script>

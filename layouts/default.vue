<template>
  <v-app style="font-family: 'Kanit', sans-serif">
    <v-app-bar
      :class="`cusblue ${this.$vuetify.breakpoint.smAndDown ? 'pr-7' : ''}`"
      dark
      dense
      app
      flat
    >
      <!-- Logo -->
      <v-app-bar-nav-icon v-if="this.$vuetify.breakpoint.mdOnly" class="pa-2">
        <v-img :src="require('~/assets/logo.svg')" width="20"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-else-if="this.$vuetify.breakpoint.lgAndUp">
        <v-img :src="require('~/assets/logo.png')" width="150"></v-img>
      </v-toolbar-title>

      <!-- Tab -->
      <v-tabs
        v-if="!this.$route.params.queue"
        dark
        show-arrows
        centered
        :hide-slider="!!this.$route.params.id"
      >
        <v-tab
          v-if="permission([1, 2, 3, 4, 5, 6])"
          class="font-weight-regular"
          to="/queue"
        >
          คิว
        </v-tab>
        <v-tab
          v-if="permission([1, 2])"
          class="font-weight-regular"
          to="/record"
        >
          เวชระเบียน
        </v-tab>
        <v-tab v-if="permission([6])" class="font-weight-regular" to="/pos">
          POS
        </v-tab>
        <v-tab v-if="permission([7])" class="font-weight-regular" to="/report">
          รายงาน
        </v-tab>
        <v-tab
          v-if="$store.getters.loggedInUser.isAdmin"
          class="font-weight-regular"
          to="/setting"
        >
          ตั้งค่า
        </v-tab>
      </v-tabs>

      <v-tabs
        v-else
        dark
        show-arrows
        centered
        :hide-slider="
          $nuxt.$route.path ===
            `/queue/${this.$route.params.queue}/insertImg` ||
          $nuxt.$route.path === `/queue/${this.$route.params.queue}/appoint`
        "
      >
        <v-tab class="font-weight-regular" exact to="/queue">คิว</v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.check || !permission([2])"
          class="font-weight-regular"
          exact
          :to="'/queue/' + this.$route.params.queue + '/'"
        >
          ห้องตรวจ
        </v-tab>
        <v-tab
          :disabled="
            this.$store.state.navTab.checkList || !permission([2, 3, 4, 5])
          "
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/checklist'"
        >
          รายการสั่งตรวจ
        </v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.lab || !permission([2, 3, 4])"
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/lab'"
        >
          Lab
        </v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.xray || !permission([2, 3, 4])"
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/xray'"
        >
          X-ray
        </v-tab>
      </v-tabs>

      <!-- Name and Logout Dropdown -->
      <v-menu transition="slide-y-transition" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="hidden-md-and-up"
            icon
            depressed
            v-on="on"
          >
            <!-- Name -->
            <v-avatar size="35" style="border: 1px solid #3894b3">
              <v-img
                :src="user.avatar"
                :lazy-src="require('~/assets/profile/defaultProfile.svg')"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="text-center" dense>
          <v-list-item
            v-for="item in userDrop"
            :key="item.title"
            @click="item.link"
          >
            <v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-items class="hidden-sm-and-down" style="max-width: 250px">
        <!-- Logout Dropdown -->
        <v-menu transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" text max-width="250px" v-on="on">
              <!-- Name -->
              <v-avatar
                class="mr-3"
                size="36"
                style="border: 1px solid #3894b3"
              >
                <v-img
                  :src="user.avatar"
                  :lazy-src="require('~/assets/profile/defaultProfile.svg')"
                ></v-img>
              </v-avatar>
              <span class="text-truncate text-none" style="max-width: 170px">
                {{ user.name }}
              </span>
              <v-spacer></v-spacer>
              <v-icon v-if="attrs['aria-expanded'] == 'false'">
                mdi-menu-down
              </v-icon>
              <v-icon v-else>mdi-menu-up</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center" dense>
            <v-list-item
              v-for="item in userDrop"
              :key="item.title"
              @click="item.link"
            >
              <v-list-item-title>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Content -->
    <v-main>
      <client-only>
        <nuxt />
        <userDialog ref="userDialog" :is-admin="false" @update="updateMe" />
      </client-only>
    </v-main>
  </v-app>
</template>

<script>
import userDialog from '@/components/Setting/System/userDialog'
export default {
  components: {
    userDialog,
  },
  data() {
    return {
      userDrop: [
        { title: 'Profile', link: this.editProfile, icon: 'mdi-account' },
        { title: 'Logout', link: this.logOut, icon: 'mdi-logout' },
      ],
    }
  },
  computed: {
    // a computed getter
    user() {
      // `this` points to the vm instance
      if (this.$store.state.avatarImg === null) {
        const avatar =
          process.env.apiUrl +
          '/api/users/' +
          this.$store.getters.loggedInUser.id +
          '/avatar'

        this.$store.commit('setAvatar', avatar)
      }
      return {
        avatar: this.$store.state.avatarImg,
        name: this.$store.getters.loggedInUser.name,
      }
    },
  },
  watch: {
    '$route.params.queue'(id) {
      this.checkQueueStatus()
    },
  },
  mounted() {
    this.checkQueueStatus()
  },
  methods: {
    permission(idArray) {
      for (const id in idArray) {
        if (
          this.$store.getters.loggedInUser.roles.some(
            (role) => role.id === idArray[id]
          ) ||
          this.$store.getters.loggedInUser.isAdmin
        ) {
          return true
        }
      }
      return false
    },
    editProfile() {
      this.$refs.userDialog.open(this.$store.getters.loggedInUser.id)
    },
    logOut() {
      this.$auth.logout()
    },
    async checkQueueStatus() {
      if (this.$route.params.queue) {
        const visit = await this.$axios.$get(
          `/api/visits/${this.$route.params.queue}`,
          {
            progress: false,
          }
        )
        if (visit.visitStatus.id === 1)
          this.$store.commit('setNavTab', {
            check: false,
            checkList: true,
            lab: true,
            xray: true,
          })
        else if (visit.visitStatus.id === 6 || visit.visitStatus.id === 9)
          this.$store.commit('setNavTab', {
            check: true,
            checkList: false,
            lab: true,
            xray: true,
          })
        else
          this.$store.commit('setNavTab', {
            check: false,
            checkList: false,
            lab: false,
            xray: false,
          })
      }
    },
    updateMe(me) {
      console.log(me)
      this.$store.commit('setMe', me)
      console.log(this.$store.state.auth.user)
    },
  },
}
</script>

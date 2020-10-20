<template>
  <v-app style="font-family: 'Kanit', sans-serif">
    <v-app-bar class="cusblue" dark dense app flat>
      <!-- Logo -->
      <v-toolbar-title class="hidden-sm-and-down">
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
        <v-tab class="font-weight-regular" to="/queue">คิว</v-tab>
        <v-tab class="font-weight-regular" to="/record">เวชระเบียน</v-tab>
        <v-tab class="font-weight-regular" to="/pos">POS</v-tab>
        <v-tab class="font-weight-regular" to="/report">รายงาน</v-tab>
        <v-tab class="font-weight-regular" to="/setting">ตั้งค่า</v-tab>
      </v-tabs>
      <v-tabs v-else dark show-arrows centered>
        <v-tab class="font-weight-regular" exact to="/queue">คิว</v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.check"
          class="font-weight-regular"
          exact
          :to="'/queue/' + this.$route.params.queue + '/'"
        >
          ห้องตรวจ
        </v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.checkList"
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/checklist'"
        >
          รายการสั่งตรวจ
        </v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.lab"
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/lab'"
        >
          Lab
        </v-tab>
        <v-tab
          :disabled="this.$store.state.navTab.xray"
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/xray'"
        >
          X-ray
        </v-tab>
      </v-tabs>

      <!-- Name and Logout Dropdown -->
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
                  :src="avatarImg"
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
              @click="logOut"
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
      </client-only>
    </v-main>
  </v-app>
</template>

<script>
export default {
  // eslint-disable-next-line prettier/prettier
  data() {
    return {
      user: {
        name: this.$store.getters.loggedInUser.name,
        // avatar: (process.env.API_URI || '') + '/api/users/me/avatar',
      },
      userDrop: [{ title: 'Logout', link: this.logOut, icon: 'mdi-logout' }],
    }
  },
  computed: {
    // a computed getter
    avatarImg() {
      // `this` points to the vm instance
      const avatar =
        process.env.apiUrl +
        '/api/users/' +
        this.$store.getters.loggedInUser.id +
        '/avatar'

      return avatar
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
  },
}
</script>

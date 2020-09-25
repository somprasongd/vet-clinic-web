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
        <v-tab class="font-weight-regular" to="/queue">คิว</v-tab>
        <v-tab
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/check'"
          >ห้องตรวจ</v-tab
        >
        <v-tab
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/checklist'"
          >รายการสั่งตรวจ</v-tab
        >
        <v-tab
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/lab'"
          >Lab</v-tab
        >
        <v-tab
          class="font-weight-regular"
          :to="'/queue/' + this.$route.params.queue + '/xray'"
          >X-ray</v-tab
        >
      </v-tabs>

      <!-- Name and Logout Dropdown -->
      <v-toolbar-items class="hidden-sm-and-down" style="min-width: 250px">
        <!-- Name -->
        <v-list-item-content>
          <v-list-item-title class="text-truncate" style="font-size: 14px">
            <v-avatar class="mr-3" color="indigo" size="36">
              <span class="white--text headline">36</span>
            </v-avatar>
            {{ user.name }}
          </v-list-item-title>
          <!-- <v-list-item-subtitle
            class="font-weight-thin text-truncate"
            style="font-size: 12px"
            >{{ user.role }}</v-list-item-subtitle
          > -->
        </v-list-item-content>

        <!-- Logout Dropdown -->
        <v-menu transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center" width="220" dense>
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
  data() {
    return {
      user: {
        name: this.$auth.user.name,
        avatar: this.getRole,
      },
      userDrop: [{ title: 'Logout', link: this.logOut, icon: 'mdi-logout' }],
    }
  },
  computed: {
    getRole() {
      const myRole = 'hi'
      for (const role in this.$auth.user.roles) {
        console.log(this.$auth.user.roles[role].id)
      }
      return myRole
    },
  },
  methods: {
    async logOut() {
      await this.$auth.logout()
    },
  },
}
</script>

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
      <v-toolbar-items class="hidden-sm-and-down" style="width: 200px">
        <!-- Name -->
        <v-list-item-content>
          <v-list-item-title class="text-truncate" style="font-size: 14px">{{
            user.name
          }}</v-list-item-title>
          <v-list-item-subtitle
            class="font-weight-thin text-truncate"
            style="font-size: 12px"
            >{{ user.role }}</v-list-item-subtitle
          >
        </v-list-item-content>

        <!-- Logout Dropdown -->
        <v-menu transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center" width="220" dense>
            <v-list-item v-for="item in userDrop" :key="item.title">
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
      // navbar
      // tabs: [
      //   { name: 'คิว', link: '/queue' },
      //   { name: 'เวชระเบียน', link: '/record' },
      //   { name: 'POS', link: '/pos' },
      //   { name: 'รายงาน', link: '/report' },
      //   { name: 'ตั้งค่า', link: '/setting' },
      // ],
      // tabs2: [
      //   { name: 'คิว', link: '/queue' },
      //   { name: 'ห้องตรวจ', link: '/queue/' + this.$route.params.queue + '/check' },
      //   { name: 'รายการสั่งตรวจ', link: '/queue/' + this.$route.params.queue + '/checklist' },
      //   { name: 'Lab', link: '/queue/' + this.$route.params.queue + '/lab' },
      //   { name: 'X-ray', link: '/queue/' + this.$route.params.queue + '/xray' },
      // ],
      user: {
        name: 'สพ.บลาบลา กขคงdddddddddddddddddddddd',
        role: 'เจ้าหน้าที่',
      },
      userDrop: [{ title: 'Logout', link: '', icon: 'mdi-logout' }],
    }
  },
  // computed: {
  //   switchTab(){
  //     if(!this.$route.params.queue) return this.tabs
  //     else return this.tabs2
  //   }
  // }
}
</script>

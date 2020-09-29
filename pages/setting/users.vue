<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="4" sm="3" md="2">
          <settingTab />
        </v-col>
        <v-col class="pl-5" cols="8" sm="9" md="10">
          <userForm :alluser="allUser" />
        </v-col>
      </v-row>
    </div>
    <userDialog :alluser="allUser" />
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import userForm from '@/components/Setting/System/userForm'
import userDialog from '@/components/Setting/System/userDialog'
export default {
  components: {
    settingNav,
    settingTab,
    userForm,
    userDialog,
  },
  async fetch() {
    await this.$axios.get('/api/users').then((res) => {
      this.allUser = res.data.results
    })
  },
  data() {
    return {
      allUser: null,
    }
  },
}
</script>

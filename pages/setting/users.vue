<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="4"
          md="3"
          lg="2"
        >
          <settingTab />
        </v-col>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="8"
          md="9"
          lg="10"
        >
          <userForm
            :alluser="allUser"
            @removed="removeUser"
            @edituser="openUserDialog"
          />
        </v-col>
      </v-row>
    </div>
    <userDialog
      ref="userDialog"
      :alluser="allUser"
      @response="addRespone"
      @update="updateRespone"
    />
    <v-btn
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="openUserDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
  data() {
    return {
      allUser: [],
    }
  },
  mounted() {
    this.$axios.get('/api/users', { progress: false }).then((res) => {
      this.allUser = res.data.results
    })
  },
  methods: {
    openUserDialog(id) {
      this.$refs.userDialog.open(id)
    },
    addRespone(res) {
      this.allUser.push(res)
    },
    updateRespone(res) {
      const index = this.allUser.findIndex((user) => {
        return user.id === res.id
      })
      // console.log(index)
      this.allUser.splice(index, 1, res)
    },
    removeUser(id) {
      const index = this.allUser.findIndex((user) => {
        return user.id === id
      })
      this.allUser.splice(index, 1)
    },
  },
}
</script>

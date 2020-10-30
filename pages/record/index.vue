<template>
  <div>
    <recordNav @search="filter" />

    <div class="custom-container">
      <recordTable :dessert="member" :loading="loading" />
    </div>
    <!-- {{ this.customer }} -->
    <recordDialog ref="addMemberDialog" />

    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="addMemberDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import recordNav from '@/components/Record/recordNav'
import recordTable from '@/components/Record/recordTable'
import recordDialog from '@/components/Record/recordDialog'
export default {
  components: {
    recordNav,
    recordTable,
    recordDialog,
  },
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 1 || role.id === 2
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  // async asyncData({ $axios }) {
  //   try {
  //     const member = await $axios.$get('/api/registration')
  //     return { member: member.results }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  data() {
    return {
      member: [],
      loading: false,
      timeout: null,
    }
  },
  methods: {
    addMemberDialog() {
      this.$refs.addMemberDialog.open()
    },
    filter(val) {
      this.loading = true
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        if (val[1] !== '') {
          this.$axios
            .$get(
              `/api/registration?limit=0${
                val[1] !== '' ? '&' + val[0] + '=' + val[1] : ''
              }`,
              { progress: false }
            )
            .then((res) => {
              this.member = res.results
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        } else {
          this.member = []
          this.loading = false
        }
      }, 600)
    },
  },
}
</script>

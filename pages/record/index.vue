<template>
  <div>
    <recordNav @search="filter" />

    <div class="custom-container">
      <recordTable :dessert="member" />
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
    }
  },
  methods: {
    addMemberDialog() {
      this.$refs.addMemberDialog.open()
    },
    async filter(val) {
      if (val[1] !== '') {
        try {
          const filterMember = await this.$axios.$get(
            `/api/registration?limit=0${
              val[1] !== '' ? '&' + val[0] + '=' + val[1] : ''
            }`,
            { progress: false }
          )
          this.member = filterMember.results
        } catch (err) {
          console.log(err)
        }
      } else {
        this.member = []
      }
    },
  },
}
</script>

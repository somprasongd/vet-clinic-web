<template>
  <div>
    <recordNav
      :default-search-key="defaultSearchKey"
      :default-search-value="defaultSearchValue"
      @onSearch="search"
    />

    <div class="custom-container">
      <recordTable :dessert="members" :loading="$fetchState.pending" />
    </div>

    <recordDialog ref="addMemberDialog" />

    <v-btn
      :key="$nuxt.$route.path"
      v-shortkey="['ctrl', 'alt', 'n']"
      color="cusblue2"
      fixed
      fab
      :small="this.$vuetify.breakpoint.mobile"
      :large="!this.$vuetify.breakpoint.mobile"
      dark
      bottom
      right
      @shortkey="addMemberDialog"
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
  async fetch() {
    let query = this.filter
    if (query === null) {
      query = {
        key: this.defaultSearchKey,
        value: this.defaultSearchValue,
      }
    }

    if (query.value === '') {
      this.members = []
      return
    }

    const params = {}
    params[query.key.value] = query.value

    try {
      const res = await this.$axios.$get(`/api/registration`, { params })
      this.members = res.results
    } catch (error) {
      this.members = []
    }
  },
  fetchOnServer: false,
  data() {
    return {
      filter: null,
      members: [],
    }
  },
  computed: {
    defaultSearchKey() {
      if (localStorage.getItem('registerFilters')) {
        const { key } = JSON.parse(localStorage.getItem('registerFilters'))
        return key
      }

      return undefined
    },
    defaultSearchValue() {
      if (localStorage.getItem('registerFilters')) {
        const { value } = JSON.parse(localStorage.getItem('registerFilters'))
        return value
      }

      return ''
    },
  },
  methods: {
    addMemberDialog() {
      this.$refs.addMemberDialog.open()
    },
    search({ key, value = '' }) {
      this.filter = { key, value }
      localStorage.setItem('registerFilters', JSON.stringify(this.filter))

      this.$fetch()
    },
  },
}
</script>

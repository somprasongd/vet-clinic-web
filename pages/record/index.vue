<template>
  <div>
    <recordNav
      :default-search-key="defaultSearchKey"
      :default-search-value="defaultSearchValue"
      @onSearch="search"
    />

    <div class="custom-container">
      <recordTable :dessert="members" :loading="loading" />
    </div>

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
  data() {
    return {
      members: [],
      loading: false,
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
    async search({ key, value = '' }) {
      if (value === '') {
        this.members = []
        return
      }
      this.loading = true

      const params = {}
      params[key.value] = value

      localStorage.setItem('registerFilters', JSON.stringify({ key, value }))

      try {
        const res = await this.$axios.$get(`/api/registration`, { params })
        this.members = res.results
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

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
          <hospitalForm :hospital="hospital" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import hospitalForm from '@/components/Setting/System/hospitalForm'
export default {
  components: {
    settingNav,
    settingTab,
    hospitalForm,
  },
  validate({ store }) {
    return store.getters.loggedInUser.isAdmin
  },
  async asyncData({ $axios }) {
    const hospital = await $axios.$get('/api/config/site')
    return { hospital }
  },
}
</script>

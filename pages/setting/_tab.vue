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
          <help
            :title="titleName"
            :helper="helper"
            @editHelper="editHelper"
            @delete="delHelper"
          />
        </v-col>
      </v-row>
    </div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="addHelp"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <helpDialog
      ref="helpDialog"
      :all-helper="helper"
      @add="addHelper"
      @update="updateHelper"
    />
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import help from '@/components/Setting/Helper/helpTemplate'
import helpDialog from '@/components/Setting/Helper/helpDialog'

export default {
  components: {
    settingNav,
    settingTab,
    help,
    helpDialog,
  },
  validate({ params }) {
    if (
      params.tab === 'Chief-Complaint' ||
      params.tab === 'Differential-Diagnosis' ||
      params.tab === 'History-Ranking' ||
      params.tab === 'Physical-Examination'
    )
      return true
    else return false
  },
  async asyncData({ $axios, params }) {
    const helper = await $axios.$get(
      `/api/config/${
        params.tab === 'Chief-Complaint'
          ? 'cc'
          : params.tab === 'Differential-Diagnosis'
          ? 'dx'
          : params.tab === 'History-Ranking'
          ? 'ht'
          : 'pe'
      }`,
      { progress: false }
    )
    return { helper: helper.results }
  },
  data() {
    return {}
  },
  computed: {
    titleName() {
      if (this.$route.params.tab === 'Chief-Complaint') return 'Chief Complaint'
      else if (this.$route.params.tab === 'Differential-Diagnosis')
        return 'Differential Diagnosis'
      else if (this.$route.params.tab === 'History-Ranking')
        return 'History Ranking'
      else return 'Physical Examination'
    },
  },
  methods: {
    addHelp() {
      this.$refs.helpDialog.open(null)
    },
    editHelper(id) {
      const index = this.helper.findIndex((help) => {
        return help.id === id
      })
      this.$refs.helpDialog.open(this.helper[index])
    },
    addHelper(val) {
      this.helper.push(val)
    },
    updateHelper(val) {
      const index = this.helper.findIndex((help) => {
        return help.id === val.id
      })
      this.helper.splice(index, 1, val)
    },
    delHelper(id) {
      this.$axios
        .$delete(
          `/api/config/${
            this.$route.params.tab === 'Chief-Complaint'
              ? 'cc'
              : this.$route.params.tab === 'Differential-Diagnosis'
              ? 'dx'
              : this.$route.params.tab === 'History-Ranking'
              ? 'ht'
              : 'pe'
          }/${id}`
        )
        .then((res) => {
          const index = this.helper.findIndex((help) => {
            return help.id === id
          })
          this.helper.splice(index, 1)
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>

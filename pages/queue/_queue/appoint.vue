<template>
  <div>
    <appointNav @updateDate="updateDate" />

    <div class="custom-container">
      <appointTable :appoint="appoint" />
    </div>

    <appointDialog ref="appDialog" @updateAppoint="updateAppoint" />
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="openAppoint(visit.pet.id)"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import appointNav from '@/components/Queue/appoint/appointNav'
import appointTable from '@/components/Queue/appoint/appointTable'
// import appointDialog from '@/components/Queue/appoint/appointDialog'
import appointDialog from '@/components/Record/UserRecord/appointDialog'
import moment from 'moment'
export default {
  components: {
    appointNav,
    appointTable,
    appointDialog,
  },
  async asyncData({ $axios, params }) {
    const visits = await $axios.$get(`/api/visits/${params.queue}`, {
      progress: false,
    })
    const appoint = await $axios.$get(
      `/api/appoints?petId=${visits.pet.id}&dateRange0=${moment()
        .subtract(3, 'months')
        .format('YYYY-MM-DD')}&dateRange1=${moment().format('YYYY-MM-DD')}`,
      { progress: false }
    )
    return { appoint: appoint.results, visit: visits }
  },
  data() {
    return {
      defaultSelect: {
        doctor: '',
        endDate: moment().format('YYYY-MM-DD'),
        startDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
      },
    }
  },
  methods: {
    openAppoint(id) {
      this.$refs.appDialog.open(id)
    },
    async updateDate(val) {
      this.defaultSelect = val
      const appoint = await this.$axios.$get(
        `/api/appoints?petId=${this.visit.pet.id}&dateRange0=${
          val.startDate
        }&dateRange1=${val.endDate}&${
          val.doctor !== '' ? `doctorId=${val.doctor}` : ''
        }`,
        { progress: false }
      )
      this.appoint = appoint.results
    },
    updateAppoint(val) {
      this.updateDate(this.defaultSelect)
    },
  },
}
</script>

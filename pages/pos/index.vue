<template>
  <div>
    <posQueueNav @updateStatus="updateStatus" />

    <div class="custom-container">
      <posQueue :pos-queue="pos" :state="select" @deletePOS="deletePOS" />
    </div>

    <v-btn
      color="cusblue2"
      fixed
      fab
      :small="this.$vuetify.breakpoint.mobile"
      :large="!this.$vuetify.breakpoint.mobile"
      dark
      bottom
      right
      @click.stop="addPosQueue"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import posQueueNav from '@/components/POS/posQueueNav'
import posQueue from '@/components/POS/posQueue'

import moment from 'moment'
export default {
  components: {
    posQueueNav,
    posQueue,
  },
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 6
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  async asyncData({ $axios, params }) {
    const pos = await $axios.$get(
      `/api/pos?state=pending&dateRange0=${moment()
        .subtract(3, 'months')
        .toISOString()}&dateRange1=${moment().toISOString()}`,
      {
        progress: false,
      }
    )
    return { pos: pos.results }
  },
  data() {
    return {
      select: 'pending',
    }
  },
  methods: {
    addPosQueue() {
      this.$axios
        .$post('/api/pos', null, { progress: false })
        .then((res) => {
          this.$router.push('/pos/' + res.id)
        })
        .catch((error) => {
          alert(error)
        })
    },
    async updateStatus(val) {
      this.select = val.state
      const start = moment(val.startDate).add(1, 'days').toISOString()
      const end = moment(val.endDate).add(1, 'days').toISOString()
      const pos = await this.$axios.$get(
        `/api/pos?${
          val.state !== ''
            ? `state=${val.state}&dateRange0=${start}&dateRange1=${end}`
            : `states=pending&states=success&states=cancel&dateRange0=${start}&dateRange1=${end}`
        }`,
        {
          progress: false,
        }
      )
      this.pos = pos.results
    },
    deletePOS(id) {
      const index = this.pos.findIndex((pos) => pos.id === id)
      this.pos.splice(index, 1)
    },
  },
}
</script>

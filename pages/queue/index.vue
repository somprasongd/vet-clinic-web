<template>
  <div>
    <queueNav @selectType="Type" @selectDoctor="Doctor" />

    <div class="custom-container">
      <queueTable :dessert="visitor" @update="updateVisit" />
    </div>
    <queueDialog @updateVisit="updateVisit" />
  </div>
</template>

<script>
import queueNav from '@/components/Queue/queueNav'
import queueTable from '@/components/Queue/queueTable'
import queueDialog from '@/components/Queue/queueDialog'
export default {
  components: {
    queueNav,
    queueTable,
    queueDialog,
  },
  data() {
    return {
      vsType: 1,
      doctor: this.defaultDoctor(),
    }
  },
  async asyncData({ $axios }) {
    const visit = await $axios.$get('/api/visits')
    return { visit: visit.results }
  },
  computed: {
    // customer() {
    //   return this.$store.state.queue.customerQueue
    // },
    visitor() {
      return this.visit.filter((visit) => {
        if (this.doctor !== '') {
          if (visit.doctor !== null) {
            return (
              visit.visitType.id === this.vsType &&
              visit.doctor.id === this.doctor
            )
          }
        } else {
          return visit.visitType.id === this.vsType
        }
      })
    },
  },

  methods: {
    defaultDoctor() {
      if (
        this.$store.getters.loggedInUser.roles.some((role) => {
          return role.id === 2
        })
      )
        return this.$store.getters.loggedInUser.id
      else return ''
    },
    Type(select) {
      this.vsType = select
    },
    Doctor(select) {
      this.doctor = select
    },
    async updateVisit(val) {
      const visit = await this.$axios.$get('/api/visits', { progress: false })
      this.visit = visit.results
    },
  },
}
</script>

<template>
  <div>
    <queueNav
      :queue-count="visit.length"
      @selectType="Type"
      @selectDoctor="Doctor"
    />

    <div class="custom-container">
      <queueTable
        :dessert="visitor"
        @update="updateVisit"
        @delete="deleteQueue"
        @updateStatus="updateVisit"
      />
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
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return (
          role.id === 1 ||
          role.id === 2 ||
          role.id === 3 ||
          role.id === 4 ||
          role.id === 5 ||
          role.id === 6
        )
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  async asyncData({ $axios }) {
    const visit = await $axios.$get('/api/visits', { progress: false })
    return { visit: visit.results }
  },
  data() {
    return {
      vsType: 1,
      doctor: this.defaultDoctor(),
    }
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
    deleteQueue(id) {
      const index = this.visit.findIndex((queue) => {
        return queue.id === id
      })
      setTimeout(() => {
        this.visit.splice(index, 1)
      }, 200)
    },
    // updateStatus(val) {
    //   const index = this.visit.findIndex((queue) => {
    //     return queue.id === val.visitId
    //   })
    //   setTimeout(() => {
    //     this.visit[index].visitStatus.id = val.visitStatusId
    //   }, 200)
    // },
  },
}
</script>

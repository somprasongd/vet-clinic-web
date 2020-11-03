<template>
  <div>
    <queueNav
      :queue-count="queues.length"
      :default-visit-type-id="defaultVisitTypeId"
      :default-doctor-id="defaultDoctorId"
      @onSearch="refresh"
    />

    <div class="custom-container">
      <queueTable
        :dessert="queues"
        :loading="$fetchState.pending"
        @update="refresh"
        @delete="deleteQueue"
        @updateStatus="refresh"
      />
    </div>
    <queueDialog @updateVisit="refresh" />
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
  async fetch() {
    let query = this.filter
    if (query === null) {
      query = {
        visitTypeId: this.defaultVisitTypeId,
        doctorId: this.defaultDoctorId,
      }
    }

    if (query.doctorId === 0) {
      delete query.doctorId
    }

    try {
      const res = await this.$axios.$get(`/api/visits`, { params: query })
      this.queues = res.results
    } catch (error) {
      this.queues = []
    }
  },
  fetchOnServer: false,
  data() {
    return {
      filter: null,
      queues: [],
      polling: null,
    }
  },
  computed: {
    defaultVisitTypeId() {
      if (localStorage.getItem('queueFilters')) {
        const { visitTypeId } = JSON.parse(localStorage.getItem('queueFilters'))
        return visitTypeId
      }

      return 1
    },
    defaultDoctorId() {
      if (localStorage.getItem('queueFilters')) {
        const { doctorId } = JSON.parse(localStorage.getItem('queueFilters'))
        return doctorId
      }

      const isDoctor = this.$store.getters.loggedInUser.roles.some((role) => {
        return role.id === 2
      })

      if (isDoctor) return this.$store.getters.loggedInUser.id
      else return 0
    },
  },
  mounted() {
    this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    refresh({ visitTypeId, doctorId }) {
      this.filter = { visitTypeId, doctorId }
      localStorage.setItem('queueFilters', JSON.stringify(this.filter))

      this.$fetch()
    },
    pollData() {
      this.polling = setInterval(() => {
        this.$fetch()
      }, process.env.pollingQueueDelay)
    },
    deleteQueue(id) {
      const index = this.queues.findIndex((queue) => queue.id === id)
      this.queues.splice(index, 1)
    },
  },
}
</script>

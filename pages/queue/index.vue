<template>
  <div>
    <queueNav
      :queue-count="queues.length"
      :default-visit-type-id="defaultVisitTypeId"
      :default-doctor-id="defaultDoctorId"
      @selectedVisitType="onChangeVisitType"
      @selectedDoctor="onChangeDoctor"
    />

    <div class="custom-container">
      <queueTable
        :dessert="queues"
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
    const params = {
      visitTypeId: this.selectedVisitTypeId || this.defaultVisitTypeId,
      doctorId:
        this.selectedDoctorId === null
          ? this.defaultDoctorId
          : this.selectedDoctorId,
    }

    localStorage.setItem('queueFilters', JSON.stringify(params))

    if (params.doctorId === '') {
      delete params.doctorId
    }

    const { results = [] } = await this.$axios.$get('/api/visits', { params })
    this.queues = results
  },
  data() {
    return {
      selectedVisitTypeId: null,
      selectedDoctorId: null,
      queues: [],
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
      else return ''
    },
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  fetchOnServer: false,
  methods: {
    onChangeVisitType(selectedId) {
      this.selectedVisitTypeId = selectedId
      localStorage.queue_filters_visitType = this.selectedVisitTypeId
      this.refresh()
    },
    onChangeDoctor(selectedId) {
      this.selectedDoctorId = selectedId

      localStorage.queue_filters_selectedDoctor = this.selectedDoctorId
      this.refresh()
    },
    refresh() {
      this.$fetch()
    },
    // async updateVisit(val) {
    //   const visit = await this.$axios.$get('/api/visits', { progress: false })
    //   this.visit = visit.results
    // },
    deleteQueue(id) {
      const index = this.queues.findIndex((queue) => queue.id === id)
      this.queues.splice(index, 1)
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

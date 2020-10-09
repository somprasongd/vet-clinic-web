<template>
  <div>
    <queueNav @selectType="Type" @selectDoctor="Doctor" />

    <div class="custom-container">
      <queueTable :dessert="visitor" />
    </div>
    <queueDialog />
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
      doctor: '',
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
      // ยังไม่เสร็จ
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
    Type(select) {
      this.vsType = select
    },
    Doctor(select) {
      this.doctor = select
    },
  },
}
</script>

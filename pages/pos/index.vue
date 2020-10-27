<template>
  <div>
    <posQueueNav @updateStatus="updateStatus" />

    <div class="custom-container">
      <posQueue
        :pos-queue="pos"
        :state="select"
        @addPosQueue="addPosQueue"
        @deletePOS="deletePOS"
      />
    </div>
  </div>
</template>

<script>
import posQueueNav from '@/components/POS/posQueueNav'
import posQueue from '@/components/POS/posQueue'
export default {
  components: {
    posQueueNav,
    posQueue,
  },

  async asyncData({ $axios, params }) {
    const pos = await $axios.$get(`/api/pos?state=active`, {
      progress: false,
    })
    return { pos: pos.results }
  },
  data() {
    return {
      select: 'active',
    }
  },
  methods: {
    addPosQueue(val) {
      this.pos.push(val)
    },
    async updateStatus(val) {
      this.select = val
      const pos = await this.$axios.$get(`/api/pos?state=${val}`, {
        progress: false,
      })
      this.pos = pos.results
    },
    deletePOS(id) {
      const index = this.pos.findIndex((pos) => pos.id === id)
      this.pos.splice(index, 1)
    },
  },
}
</script>

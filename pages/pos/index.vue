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
      large
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

export default {
  components: {
    posQueueNav,
    posQueue,
  },

  async asyncData({ $axios, params }) {
    const pos = await $axios.$get(`/api/pos?state=pending`, {
      progress: false,
    })
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
      this.select = val
      const pos = await this.$axios.$get(
        `/api/pos?${
          val !== ''
            ? `state=${val}`
            : 'states=pending&states=success&states=cancel'
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

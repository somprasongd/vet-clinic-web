<template>
  <div>
    <!-- <posNav /> -->

    <div class="custom-container">
      <!-- <posTable :order-item="order" /> -->
      <checklistCard
        :order-item="order"
        :pos-data="pos"
        @add="addOrder"
        @delete="delOrder"
      />
    </div>
  </div>
</template>

<script>
// import posNav from '@/components/POS/posNav'
import checklistCard from '@/components/Queue/Checklist/checklistCard'
// import posTable from '@/components/POS/posTable'
export default {
  components: {
    // posNav,
    checklistCard,
    // posTable,
  },
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 6
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  async asyncData({ $axios, params }) {
    const order = await $axios.$get(`/api/orders?posId=${params.posid}`, {
      progress: false,
    })
    const post = await $axios.$get(`/api/pos/${params.posid}`, {
      progress: false,
    })
    return { order: order.results, pos: post }
  },
  beforeDestroy() {
    if (this.pos.state === 'active') {
      this.$axios
        .$patch(
          `/api/pos/${this.pos.id}`,
          {
            state: 'pending',
          },
          { progress: false }
        )
        .catch((error) => alert(error))
    }
  },
  methods: {
    async addOrder(data) {
      // this.order.push(data)
      const order = await this.$axios.$get(
        `/api/orders?posId=${this.$route.params.posid}`,
        {
          progress: false,
        }
      )
      this.order = order.results
    },
    delOrder(id) {
      const index = this.order.findIndex((order) => {
        return order.id === id
      })
      this.order.splice(index, 1)
    },
  },
}
</script>

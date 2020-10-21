<template>
  <div>
    <div class="custom-container">
      <v-row dense>
        <v-col
          v-if="!this.$vuetify.breakpoint.smAndDown"
          cols="12"
          md="4"
          lg="3"
        >
          <OwnerPetCard
            :show-vs-dx="true"
            :visit-data="oneVisit"
            :owner-data="oneOwner"
            :pet-data="onePet"
          />
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <checklistCard
            :visit-data="oneVisit"
            :order-item="order"
            @add="addOrder"
            @delete="delOrder"
          />
        </v-col>
      </v-row>
      <!-- <OwnerPetCard v-if="$route.params.page == 'check'" /> -->
    </div>
  </div>
</template>

<script>
// import checkroomNav from '@/components/Queue/Check/checkroomNav'
import OwnerPetCard from '@/components/Queue/OwnerPetCard'
import checklistCard from '@/components/Queue/Checklist/checklistCard'

export default {
  components: {
    // checkroomNav,
    OwnerPetCard,
    checklistCard,
  },
  async validate({ $axios, params, query, store }) {
    const visit = await $axios.$get(`/api/visits/${params.queue}`, {
      progress: false,
    })
    if (
      visit.visitStatus.id === 1 ||
      visit.visitStatus.id === 2 ||
      visit.visitStatus.id === 3 ||
      visit.visitStatus.id === 4 ||
      visit.visitStatus.id === 6 ||
      visit.visitStatus.id === 9
    )
      return true
    else return false
  },
  async asyncData({ $axios, params }) {
    try {
      const visit = await $axios.$get(`/api/visits/${params.queue}`, {
        progress: false,
      })
      const owner = await $axios.$get(
        `/api/members?code=${visit.pet.owner.code}`,
        { progress: false }
      )
      const pet = await $axios.$get(`/api/pets?code=${visit.pet.code}`, {
        progress: false,
      })
      const order = await $axios.$get(`/api/visits/${params.queue}/orders`, {
        progress: false,
      })
      return {
        oneVisit: visit,
        oneOwner: owner.results[0],
        onePet: pet.results[0],
        order: order.results,
      }
    } catch (error) {
      alert(error)
    }
  },
  data() {
    return {}
  },
  methods: {
    async addOrder(data) {
      // this.order.push(data)
      const order = await this.$axios.$get(
        `/api/visits/${this.$route.params.queue}/orders`,
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

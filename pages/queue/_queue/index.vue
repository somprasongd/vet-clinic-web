<template>
  <div>
    <div class="custom-container">
      <v-row dense>
        <v-col cols="12" md="4" lg="3">
          <OwnerPetCard
            :visit-data="oneVisit"
            :owner-data="oneOwner"
            :pet-data="onePet"
            :showbtn="true"
          />
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <checkCard :visit-data="oneVisit" />
        </v-col>
      </v-row>
      <!-- <OwnerPetCard v-if="$route.params.page == 'check'" /> -->
    </div>
  </div>
</template>

<script>
// import checkroomNav from '@/components/Queue/Check/checkroomNav'
import OwnerPetCard from '@/components/Queue/OwnerPetCard'
import checkCard from '@/components/Queue/Check/checkCard'

export default {
  components: {
    // checkroomNav,
    OwnerPetCard,
    checkCard,
  },
  async validate({ $axios, params, query, store }) {
    const visit = await $axios.$get(`/api/visits/${params.queue}`, {
      progress: false,
    })
    if (
      visit.visitStatus.id === 1 ||
      visit.visitStatus.id === 2 ||
      visit.visitStatus.id === 3 ||
      visit.visitStatus.id === 4
    )
      return true
    else return false
  },
  async asyncData({ $axios, params }) {
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
    return {
      oneVisit: visit,
      oneOwner: owner.results[0],
      onePet: pet.results[0],
    }
  },
  data() {
    return {}
  },
}
</script>

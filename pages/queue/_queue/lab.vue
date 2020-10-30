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
            :show-report-btn="true"
            :visit-data="oneVisit"
            :owner-data="oneOwner"
            :pet-data="onePet"
          />
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <labCard :lab-item="lab" />
        </v-col>
      </v-row>
      <!-- <OwnerPetCard v-if="$route.params.page == 'check'" /> -->
    </div>
  </div>
</template>

<script>
// import checkroomNav from '@/components/Queue/Check/checkroomNav'
import OwnerPetCard from '@/components/Queue/OwnerPetCard'
import labCard from '@/components/Queue/Lab/labCard'

export default {
  components: {
    // checkroomNav,
    OwnerPetCard,
    labCard,
  },
  async validate({ $axios, params, query, store }) {
    if (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 2 || role.id === 3 || role.id === 4
      }) ||
      store.getters.loggedInUser.isAdmin
    ) {
      const visit = await $axios.$get(`/api/visits/${params.queue}`, {
        progress: false,
      })
      if (
        visit.visitStatus.id === 2 ||
        visit.visitStatus.id === 3 ||
        visit.visitStatus.id === 4
      )
        return true
      else return false
    } else return false
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
    const lab = await $axios.$get(`/api/visits/${params.queue}/results/lab`, {
      progress: false,
    })
    return {
      oneVisit: visit,
      oneOwner: owner.results[0],
      onePet: pet.results[0],
      lab: lab.datas,
    }
  },
  data() {
    return {}
  },
}
</script>

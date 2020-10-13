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
          <OwnerPetCard :data-table="oneVisit" />
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <checklistCard />
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
  async asyncData({ $axios, params }) {
    const visit = await $axios.$get(`/api/visits/${params.queue}`, {
      progress: false,
    })
    return { oneVisit: visit }
  },
  data() {
    return {}
  },
}
</script>

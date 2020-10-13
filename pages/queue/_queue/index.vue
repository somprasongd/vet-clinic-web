<template>
  <div>
    <div class="custom-container">
      <v-row dense>
        <v-col cols="12" md="4" lg="3">
          <OwnerPetCard :data-table="oneVisit" :showbtn="true" />
        </v-col>

        <v-col cols="12" md="8" lg="9">
          <checkCard :data-table="oneVisit" />
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

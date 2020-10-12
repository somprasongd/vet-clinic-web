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
          <OwnerPetCard :data-table="data" />
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
  data() {
    return {
      data: {
        VS: [
          {
            Date: '26/12/2020',
            Time: '02.07',
            Temp: '',
            R: '',
            SysBp: '120',
            DiaBp: '50',
            Weight: '90',
            PainScr: '33',
            BCS: '44',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '200',
            R: '80',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
          {
            Date: '03/09/2020',
            Time: '12.07',
            Temp: '100',
            R: '555',
            SysBp: '120',
            DiaBp: '99',
            Weight: '10',
            PainScr: '50',
            BCS: '555',
          },
        ],
        CC: 'YYYYYYYYYYYYYYYYYYYYYYY',
        HT:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. \nThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
        PE: 'YYYYYYYYYYYYYYYYYYYYYYY',
        DX:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry standard',
      },
    }
  },
}
</script>

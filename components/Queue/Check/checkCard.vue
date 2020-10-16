<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-card class="my-1 mx-1" max-height="100%">
          <v-card-title class="pb-1 pt-3">
            ข้อมูลการเข้าตรวจ
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" icon @click="checkInfo = !checkInfo">
              <v-icon v-show="checkInfo == false">mdi-chevron-down</v-icon>
              <v-icon v-show="checkInfo == true">mdi-chevron-up</v-icon>
            </v-btn>
          </v-card-title>

          <v-expand-transition>
            <div v-show="checkInfo">
              <v-divider class="darker-divider"></v-divider>

              <div class="pa-4 pt-1 card-content overflow-auto">
                <v-row justify="center" align="center" dense>
                  <v-col cols="12">
                    <v-row dense>
                      <v-col cols="6">ความสำคัญ</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5">{{
                        visitData.visitPriority.label
                      }}</v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">สาเหตุการเข้าตรวจ</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5">{{ visitData.visitCause }}</v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">รายละเอียดเพิ่มเติม</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5">{{ visitData.note }}</v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">นัดหมายครั้งถัดไป</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5">{{ getAppoint(visitData.pet.id) }}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <vsCard
          :visit-id="visitData.id"
          :disable="visitData.visitStatus.id === 1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.CC.title"
          :is-table="cardDetail.CC.table"
          :text-content="visitData.cc"
          :disable="visitData.visitStatus.id === 1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.HT.title"
          :is-table="cardDetail.HT.table"
          :text-content="visitData.ht"
          :disable="visitData.visitStatus.id === 1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.PE.title"
          :is-table="cardDetail.PE.table"
          :text-content="visitData.pe"
          :disable="visitData.visitStatus.id === 1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.DX.title"
          :is-table="cardDetail.DX.table"
          :text-content="visitData.dx"
          :disable="visitData.visitStatus.id === 1"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import cardView from '@/components/Queue/Check/Card/cardView'
import vsCard from '@/components/Queue/Check/Card/vsCard'

export default {
  components: {
    cardView,
    vsCard,
  },
  props: {
    visitData: {
      default: null,
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      // petCardHeight: '648',
      checkInfo: !this.$vuetify.breakpoint.smAndDown,

      nextAppoint: '',
      vs: [],
      cardDetail: {
        VS: {
          title: 'Vital Sign',
          table: true,
        },
        CC: {
          title: 'CC (Chief Complaint)',
          table: false,
        },
        HT: {
          title: 'HT (History Ranking)',
          table: false,
        },
        PE: {
          title: 'PE (Physical Examination)',
          table: false,
        },
        DX: {
          title: 'DX (Differential Diagnosis)',
          table: false,
        },
      },
    }
  },
  computed: {},
  methods: {
    getAppoint(id) {
      this.findNextAppoint(id)
      return this.nextAppoint
    },
    async findNextAppoint(id) {
      try {
        const date = await this.$axios.$get(
          `/api/appoints?petId=${id}&limit=1`,
          { progress: false }
        )
        this.nextAppoint =
          date.count === 0
            ? ''
            : moment(date.results[0].appointDate).format('DD/MM/YYYY')
      } catch (e) {
        console.log(e)
      }
    },
    getVitalSign(id) {
      this.findVitalSign(id)
      return this.vs
    },
    async findVitalSign(id) {
      const vs = await this.$axios.$get(`/api/visits/${id}/vs`, {
        progress: false,
      })
      this.vs = vs
    },
  },
}
</script>

<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-card class="my-1 mx-1" max-height="100%">
          <v-card-title
            v-ripple
            class="pb-1 pt-3 custom-cardTitle"
            @click="checkInfo = !checkInfo"
          >
            ข้อมูลการเข้าตรวจ
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" icon>
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
          :text-content="visitData.cc"
          :disable="visitData.visitStatus.id === 1"
          :helper="cardDetail.CC.helper"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.HT.title"
          :text-content="visitData.ht"
          :disable="visitData.visitStatus.id === 1"
          :helper="cardDetail.HT.helper"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.PE.title"
          :text-content="visitData.pe"
          :disable="visitData.visitStatus.id === 1"
          :helper="cardDetail.PE.helper"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.DX.title"
          :text-content="visitData.dx"
          :disable="visitData.visitStatus.id === 1"
          :helper="cardDetail.DX.helper"
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
        CC: {
          title: 'CC (Chief Complaint)',
          helper:
            this.$store.state.form.helper === null
              ? []
              : this.$store.state.form.helper.cc,
        },
        HT: {
          title: 'HT (History Ranking)',
          helper:
            this.$store.state.form.helper === null
              ? []
              : this.$store.state.form.helper.ht,
        },
        PE: {
          title: 'PE (Physical Examination)',
          helper:
            this.$store.state.form.helper === null
              ? []
              : this.$store.state.form.helper.pe,
        },
        DX: {
          title: 'DX (Differential Diagnosis)',
          helper:
            this.$store.state.form.helper === null
              ? []
              : this.$store.state.form.helper.dx,
        },
      },
    }
  },
  async mounted() {
    if (this.$store.state.form.helper === null) {
      const cc = await this.$axios.$get('/api/config/cc', { progress: false })
      const ht = await this.$axios.$get('/api/config/ht', { progress: false })
      const pe = await this.$axios.$get('/api/config/pe', { progress: false })
      const dx = await this.$axios.$get('/api/config/dx', { progress: false })
      this.$store.commit('form/setHelper', {
        cc: this.formatArray(cc.results),
        ht: this.formatArray(ht.results),
        pe: this.formatArray(pe.results),
        dx: this.formatArray(dx.results),
      })
      this.cardDetail.CC.helper = this.$store.state.form.helper.cc
      this.cardDetail.HT.helper = this.$store.state.form.helper.ht
      this.cardDetail.PE.helper = this.$store.state.form.helper.pe
      this.cardDetail.DX.helper = this.$store.state.form.helper.dx
    }
  },
  methods: {
    formatArray(array) {
      return array.map((item) => {
        return {
          code: item.code,
          value: item.label,
        }
      })
    },
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
      } catch (error) {
        alert(error)
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

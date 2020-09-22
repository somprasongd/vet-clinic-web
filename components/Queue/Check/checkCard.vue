<template>
  <div>
    <v-row no-gutters>
      <v-col>
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
            <div v-show="checkInfo" class="card-content">
              <v-divider class="darker-divider"></v-divider>

              <div class="pa-4 pt-1">
                <v-row justify="center" align="center" dense>
                  <v-col cols="12">
                    <v-row dense>
                      <v-col cols="6">ความสำคัญ</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5"></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">สาเหตุการเข้าตรวจ</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5"></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">รายละเอียดเพิ่มเติม</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5"></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="6">นัดหมายครั้งถัดไป</v-col>
                      <v-col cols="1">:</v-col>
                      <v-col cols="5"></v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.VS.title"
          :is-table="cardDetail.VS.table"
          :data-table="dataTable.VS"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.CC.title"
          :is-table="cardDetail.CC.table"
          :text-content="dataTable.CC"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.HT.title"
          :is-table="cardDetail.HT.table"
          :text-content="dataTable.HT"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.PE.title"
          :is-table="cardDetail.PE.table"
          :text-content="dataTable.PE"
        />
      </v-col>
      <v-col cols="12" md="6">
        <cardView
          :card-title="cardDetail.DX.title"
          :is-table="cardDetail.DX.table"
          :text-content="dataTable.DX"
        />
      </v-col>
    </v-row>
    <v-speed-dial
      v-model="fab"
      class="hidden-md-and-up"
      bottom
      right
      direction="top"
      open-on-hover
      fixed
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="cusblue2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="btn in actionBtn"
        :key="btn.index"
        :to="btn.path"
        class="px-1"
        rounded
        left
        depressed
        dark
        small
        color="cusblue"
      >
        {{ btn.text }}
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import cardView from '@/components/Queue/Check/Card/cardView'

export default {
  components: {
    cardView,
  },
  props: {
    dataTable: {
      default: null,
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      // petCardHeight: '648',
      fab: false,
      checkInfo: !this.$vuetify.breakpoint.smAndDown,

      actionBtn: [
        {
          text: 'ประวัติการรักษา',
          path: '/history/' + this.$route.params.queue,
        },
        { text: 'ทำนัด', path: '/appoint/' + this.$route.params.queue },
        { text: 'Admit', path: '/history/' + this.$route.params.queue },
        { text: 'แจ้งตาย', path: '/history/' + this.$route.params.queue },
        { text: 'แนบไฟล์ภาพ', path: '/insertImg/' + this.$route.params.queue },
        { text: 'จบการรักษา', path: '/history/' + this.$route.params.queue },
      ],
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
}
</script>

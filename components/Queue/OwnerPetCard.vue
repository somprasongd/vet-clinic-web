<template>
  <v-card class="elevation-4" max-height="100%">
    <v-card-title class="pb-1 pt-3">
      ข้อมูลเจ้าของสัตว์ และสัตว์เลี้ยง
    </v-card-title>

    <v-divider class="darker-divider"></v-divider>

    <div class="pa-4">
      <v-row justify="center" align="center" dense>
        <v-col cols="4"
          ><v-img
            :src="require('~/assets/profile/003-dog-1.svg')"
            width="100"
          ></v-img
        ></v-col>
        <v-col cols="8">
          <v-row no-gutters class="font-weight-bold">
            <v-col cols="5">ชื่อสัตว์เลี้ยง</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6">Snow</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="5">ประเภท</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6">หมา</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="5">เพศ</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6">เมีย</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="5">อายุ</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6">5 ปี 8 เดือน</v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <v-expand-transition>
      <div v-show="petCardHidden">
        <v-divider class="dash-divider"></v-divider>

        <div class="pa-4">
          <v-row justify="center" align="center" dense>
            <v-col cols="4"
              ><v-img
                :src="require('~/assets/profile/001-user.svg')"
                width="100"
              ></v-img
            ></v-col>
            <v-col cols="8">
              <span class="font-weight-bold">คุณสมประสงค์ ดำยศ</span><br />
              <span>เบอร์ติดต่อ : 098-112-4456</span>
            </v-col>
          </v-row>
        </div>
        <div v-if="showbtn">
          <v-divider class="dash-divider hidden-md-and-down"></v-divider>

          <div class="px-3 pt-1 hidden-sm-and-down">
            <v-btn
              v-for="btn in actionBtn"
              :key="btn.index"
              :to="btn.path"
              class="cusblue3 font-weight-regular text-capitalize my-2"
              block
              depressed
              dark
              >{{ btn.text }}</v-btn
            >
          </div>
        </div>
        <div v-else>
          <v-divider class="dash-divider hidden-sm-and-down"></v-divider>

          <div class="hidden-sm-and-down">
            <div class="pa-3">
              <span class="font-weight-bold">Vital Sign</span>
              <v-row
                v-for="cardTb in loopOnce"
                :key="cardTb.index"
                class="text-left"
                align="center"
                justify="center"
                no-gutters
              >
                <v-col class="font-weight-medium" cols="5">{{
                  cardTb.header
                }}</v-col>
                <v-col cols="5">{{ cardTb.value }}</v-col>
                <v-col cols="2">{{ cardTb.unit }}</v-col>
              </v-row>
            </div>

            <v-divider class="dash-divider hidden-sm-and-down"></v-divider>

            <div class="pa-3">
              <span class="font-weight-bold">DX (Differential Diagnosis)</span>
              <div>
                <textarea
                  v-model="dataTable.DX"
                  class="custom-textarea"
                  :readonly="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-expand-transition>
    <v-divider class="dash-divider"></v-divider>
    <v-btn color="cusblue2" block text @click="petCardHidden = !petCardHidden">
      <v-icon v-show="petCardHidden == false">mdi-dots-horizontal</v-icon>
      <v-icon v-show="petCardHidden == true">mdi-chevron-up</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    dataTable: {
      default: null,
      type: Object,
      required: false,
    },
    showbtn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      // petCardHeight: '648',
      petCardHidden: !this.$vuetify.breakpoint.smAndDown,
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
    }
  },
  computed: {
    loopOnce() {
      const detail = {
        weight: { header: 'Weight', value: '', unit: 'Kg' },
        temp: { header: 'Temp.', value: '', unit: 'F' },
        bp: { header: 'BP', value: '', unit: 'bpm' },
        r: { header: 'RR', value: '', unit: '' },
      }

      // this.findNotBlank(this.cardDetail)
      detail.temp.value = this.TempNotBlank(this.dataTable.VS)
      detail.r.value = this.RRNotBlank(this.dataTable.VS)
      detail.bp.value =
        this.SysNotBlank(this.dataTable.VS) +
        '/' +
        this.DiaNotBlank(this.dataTable.VS)
      detail.weight.value = this.WeightNotBlank(this.dataTable.VS)

      return detail
    },
  },
  methods: {
    TempNotBlank(data) {
      for (const num in data) {
        if (data[num].Temp !== '') {
          return data[num].Temp
        }
      }
    },
    RRNotBlank(data) {
      for (const num in data) {
        if (data[num].R !== '') {
          return data[num].R
        }
      }
    },
    SysNotBlank(data) {
      for (const num in data) {
        if (data[num].SysBp !== '') {
          return data[num].SysBp
        }
      }
    },
    DiaNotBlank(data) {
      for (const num in data) {
        if (data[num].DiaBp !== '') {
          return data[num].DiaBp
        }
      }
    },
    WeightNotBlank(data) {
      for (const num in data) {
        if (data[num].Weight !== '') {
          return data[num].Weight
        }
      }
    },
  },
}
</script>

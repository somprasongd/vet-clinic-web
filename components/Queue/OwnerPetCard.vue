<template>
  <div>
    <v-card class="elevation-4" max-height="100%">
      <v-card-title class="pb-1 pt-3">
        ข้อมูลเจ้าของสัตว์ และสัตว์เลี้ยง
        <v-spacer></v-spacer>
        <v-btn
          v-if="dataTable.visitStatus.id === 1"
          color="cusblue3"
          icon
          @click="startCheck(dataTable.id)"
        >
          <v-icon>mdi-check-circle</v-icon>
        </v-btn>
        <v-btn
          v-if="dataTable.visitStatus.id === 1"
          color="cusblue3"
          icon
          @click="openSendDocs(dataTable.doctor.name, dataTable.id)"
        >
          <v-icon>mdi-share-circle</v-icon>
        </v-btn>
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
              <v-col cols="6">{{ onePet.name }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">ประเภท</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                onePet.type === undefined ? '' : onePet.type.label
              }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">เพศ</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                onePet.gender === undefined ? '' : onePet.gender.label
              }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">อายุ</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                onePet.birthDate === undefined ? '' : calcAge(onePet.birthDate)
              }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-expand-transition>
        <div v-show="petCardHidden">
          <v-divider class="dash-divider"></v-divider>

          <div class="pa-4">
            <v-row justify="center" align="center" dense>
              <v-col cols="4">
                <v-img
                  :src="require('~/assets/profile/001-user.svg')"
                  width="100"
                >
                </v-img>
              </v-col>
              <v-col cols="8">
                <span class="font-weight-bold">{{
                  oneOwner.fullName === undefined ? '' : oneOwner.fullName
                }}</span>
                <br />
                <span>
                  เบอร์ติดต่อ :
                  {{ oneOwner.tels === undefined ? '' : oneOwner.tels[0] }}
                </span>
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
              >
                {{ btn.text }}
              </v-btn>
            </div>
          </div>
          <div v-else>
            <v-divider class="dash-divider hidden-sm-and-down"></v-divider>

            <div class="hidden-sm-and-down">
              <vsCard :visit-id="dataTable.id" :no-card="true" />

              <v-divider class="dash-divider hidden-sm-and-down"></v-divider>

              <div class="pa-3">
                <span class="font-weight-bold"
                  >DX (Differential Diagnosis)</span
                >
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
      <v-btn
        color="cusblue2"
        block
        text
        @click="petCardHidden = !petCardHidden"
      >
        <v-icon v-show="petCardHidden == false">mdi-dots-horizontal</v-icon>
        <v-icon v-show="petCardHidden == true">mdi-chevron-up</v-icon>
      </v-btn>
    </v-card>
    <sendDoctorDialog ref="sendDoctor" @updateDoctor="updateSend" />
  </div>
</template>

<script>
import moment from 'moment'
import vsCard from '@/components/Queue/Check/Card/vsCard'
import sendDoctorDialog from '@/components/Queue/sendDoctorDialog'
export default {
  components: {
    vsCard,
    sendDoctorDialog,
  },
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
      oneOwner: '',
      onePet: '',
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
  async created() {
    const owner = await this.$axios.$get(
      `/api/members?code=${this.dataTable.pet.owner.code}`,
      { progress: false }
    )
    const pet = await this.$axios.$get(
      `/api/pets?code=${this.dataTable.pet.code}`,
      { progress: false }
    )
    this.oneOwner = owner.results[0]
    this.onePet = pet.results[0]
  },
  methods: {
    calcAge(date) {
      const nowDate = moment()
      const pickDate = moment(date, 'YYYY-MM-DD')
      const dateDiff = moment.duration(nowDate.diff(pickDate))
      return dateDiff.years() + ' ปี ' + dateDiff.months() + ' เดือน '
    },
    openSendDocs(name, id) {
      this.$refs.sendDoctor.open(name, id)
    },
    startCheck(id) {
      this.$axios
        .$patch(`/api/visits/${id}`, { visitStatusId: 2 }, { progress: false })
        .then((res) => {
          this.dataTable.visitStatus.id = 2
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateSend() {
      this.$router.push('/queue')
    },
  },
}
</script>

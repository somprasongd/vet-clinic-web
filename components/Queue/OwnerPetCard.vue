<template>
  <div>
    <v-card class="elevation-4" max-height="100%">
      <v-card-title class="pb-1 pt-3">
        เจ้าของสัตว์ และสัตว์เลี้ยง
        <v-spacer></v-spacer>
        <!-- for mobile -->
        <v-speed-dial
          v-model="fab"
          class="hidden-md-and-up"
          top
          right
          direction="bottom"
          open-on-hover
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="cusblue2" dark fab x-small>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-btn
            :to="'/history/' + petData.id"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
          >
            ประวัติการรักษา
          </v-btn>
          <v-btn
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="
              openSendDocs(
                visitData.doctor === null ? '' : visitData.doctor.name,
                visitData.id
              )
            "
          >
            ส่งต่อ
          </v-btn>
          <v-btn
            v-if="!isStatusWaiting"
            :to="'/queue/' + this.$route.params.queue + '/appoint'"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
          >
            ทำนัด
          </v-btn>
          <v-btn
            v-if="!isStatusWaiting"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="admit($route.params.queue)"
          >
            Admit
          </v-btn>
          <v-btn
            v-if="!isStatusWaiting"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="petDead(petData.id, !petData.death)"
          >
            {{ petData.death ? 'ยกเลิกแจ้งตาย' : 'แจ้งตาย' }}
          </v-btn>
          <v-btn
            v-if="!isStatusWaiting"
            :to="'/queue/' + this.$route.params.queue + '/insertImg'"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
          >
            แนบไฟล์ภาพ
          </v-btn>
          <v-btn
            v-if="isShowReceive"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="endCheck($route.params.queue, getVisitStatus(2))"
          >
            เข้ารับการตรวจ
          </v-btn>
          <v-btn
            v-if="isStatusTreament"
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="endCheck($route.params.queue, getVisitStatus(3))"
          >
            รอผลตรวจ
          </v-btn>
          <v-btn
            class="px-1"
            rounded
            left
            depressed
            dark
            small
            color="cusblue"
            @click="
              endCheck(
                $route.params.queue,
                getVisitStatus(isStatusWaiting ? 8 : 6)
              )
            "
          >
            {{ isStatusWaiting ? 'ยกเลิกการรักษา' : 'จบการรักษา' }}
          </v-btn>
        </v-speed-dial>
      </v-card-title>

      <v-divider class="darker-divider"></v-divider>

      <div class="pa-4">
        <v-row justify="center" align="center" dense>
          <v-col cols="4">
            <v-avatar size="100">
              <v-img :src="getPetAvartar(petData.id)" width="100"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <v-row no-gutters class="font-weight-bold">
              <v-col cols="5">ชื่อสัตว์เลี้ยง</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{ petData.name }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">ประเภท</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                petData.type === undefined ? '' : petData.type.label
              }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">เพศ</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                petData.gender === undefined ? '' : petData.gender.label
              }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="5">อายุ</v-col>
              <v-col cols="1">:</v-col>
              <v-col cols="6">{{
                petData.birthDate === undefined
                  ? ''
                  : calcAge(petData.birthDate)
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
                <v-avatar size="100">
                  <v-img
                    :src="getOwnerAvartar(ownerData.id)"
                    width="100"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <span class="font-weight-bold">{{
                  ownerData.fullName === undefined ? '' : ownerData.fullName
                }}</span>
                <br />
                <span>
                  เบอร์ติดต่อ :
                  {{ ownerData.tels === undefined ? '' : ownerData.tels[0] }}
                </span>
              </v-col>
            </v-row>
          </div>
          <div v-if="showbtn">
            <v-divider class="dash-divider hidden-sm-and-down"></v-divider>
            <div class="px-3 pt-1 hidden-sm-and-down">
              <v-btn
                :to="'/history/' + petData.id"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
              >
                ประวัติการรักษา
              </v-btn>
              <v-btn
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="
                  openSendDocs(
                    visitData.doctor === null ? '' : visitData.doctor.name,
                    visitData.id
                  )
                "
              >
                ส่งต่อ
              </v-btn>
              <v-btn
                v-if="!isStatusWaiting"
                :to="'/queue/' + this.$route.params.queue + '/appoint'"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
              >
                ทำนัด
              </v-btn>
              <v-btn
                v-if="!isStatusWaiting"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="admit($route.params.queue)"
              >
                Admit
              </v-btn>
              <v-btn
                v-if="!isStatusWaiting"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="petDead(petData.id, !petData.death)"
              >
                {{ petData.death ? 'ยกเลิกแจ้งตาย' : 'แจ้งตาย' }}
              </v-btn>
              <v-btn
                v-if="!isStatusWaiting"
                :to="'/queue/' + this.$route.params.queue + '/insertImg'"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
              >
                แนบไฟล์ภาพ
              </v-btn>
              <v-btn
                v-if="isShowReceive"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="endCheck($route.params.queue, getVisitStatus(2))"
              >
                เข้ารับการตรวจ
              </v-btn>
              <v-btn
                v-if="isStatusTreament"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="endCheck($route.params.queue, getVisitStatus(3))"
              >
                รอผลตรวจ
              </v-btn>
              <v-btn
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="
                  endCheck(
                    $route.params.queue,
                    getVisitStatus(isStatusWaiting ? 8 : 6)
                  )
                "
              >
                {{ isStatusWaiting ? 'ยกเลิกการรักษา' : 'จบการรักษา' }}
              </v-btn>
            </div>
          </div>
          <div v-if="showVsDx && !isStatusWaitingReport">
            <v-divider class="dash-divider hidden-sm-and-down"></v-divider>

            <div class="hidden-sm-and-down">
              <vsCard :visit-id="visitData.id" :no-card="true" />

              <v-divider
                v-if="visitData.dx !== ''"
                class="dash-divider hidden-sm-and-down"
              ></v-divider>

              <div v-if="visitData.dx !== ''" class="pa-3">
                <span class="font-weight-bold">
                  DX (Differential Diagnosis)
                </span>
                <div>
                  <textarea
                    v-model="visitData.dx"
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
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import moment from 'moment'
import vsCard from '@/components/Queue/Check/Card/vsCard'
import sendDoctorDialog from '@/components/Queue/sendDoctorDialog'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    vsCard,
    sendDoctorDialog,
    confirmDialog,
  },
  props: {
    visitData: {
      default: null,
      type: Object,
      required: false,
    },
    ownerData: {
      default: null,
      type: Object,
      required: false,
    },
    petData: {
      default: null,
      type: Object,
      required: false,
    },
    showbtn: {
      type: Boolean,
      default: false,
      required: false,
    },
    showVsDx: {
      type: Boolean,
      default: false,
      required: false,
    },
    showReportBtn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      petCardHidden: !this.$vuetify.breakpoint.smAndDown,
      fab: false,
    }
  },
  computed: {
    isStatusWaiting() {
      return this.visitData.visitStatus.id === 1
    },
    isStatusTreament() {
      return this.visitData.visitStatus.id === 2
    },
    isStatusWaitingReport() {
      return this.visitData.visitStatus.id === 3
    },
    isStatusReported() {
      return this.visitData.visitStatus.id === 4
    },
    isShowReceive() {
      return (
        this.visitData.visitStatus.id === 1 &&
        this.$store.getters.loggedInUser.roles &&
        this.$store.getters.loggedInUser.roles.some((role) => {
          return role.id === 2 // only doctor
        })
      )
    },
  },
  methods: {
    getPetAvartar(id) {
      return `${process.env.apiUrl}/api/pets/${id}/avatar`
    },
    getOwnerAvartar(id) {
      return `${process.env.apiUrl}/api/members/${id}/avatar`
    },
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
          this.visitData.visitStatus.id = 2
          this.$store.commit('setNavTab', {
            check: false,
            checkList: false,
            lab: false,
            xray: false,
          })
        })
        .catch((error) => {
          alert(error)
        })
    },
    updateSend() {
      this.$router.push('/queue')
    },
    admit(id) {
      this.$axios
        .$patch(`/api/visits/${id}`, { visitTypeId: 2 }, { progress: false })
        .then((res) => {
          this.$router.push(`/queue`)
        })
        .catch((error) => {
          alert(error)
        })
    },
    async endCheck(id, status) {
      const confirm = await this.$refs.confirm.open(
        `ยืนยัน${
          status === 2
            ? 'เข้ารับการตรวจ'
            : status === 3
            ? 'การรอผลตรวจ'
            : status === 4
            ? 'การรายงานผล'
            : status === 7
            ? 'การจบการรับบริการ'
            : status === 8
            ? 'ยกเลิกการรักษา'
            : 'การจบการรักษา'
        }?`,
        `ต้องการยืนยัน${
          status === 2
            ? 'เข้ารับการตรวจ'
            : status === 3
            ? 'การรอผลตรวจ'
            : status === 4
            ? 'การรายงานผล'
            : status === 7
            ? 'การจบการรับบริการ'
            : status === 8
            ? 'ยกเลิกการรักษา'
            : 'การจบการรักษา'
        }ใช่หรือไม่`,
        {
          width: 290,
          color:
            status === 8
              ? 'red'
              : status === 3
              ? 'primary'
              : status === 4
              ? 'rgb(214, 185, 81)'
              : 'green',
        }
      )

      if (!confirm) {
        return
      }
      await this.$axios
        .$patch(`/api/visits/${id}/status/${status}`, { progress: false })
        .then((res) => {
          this.$router.push(`/queue`)
        })
        .catch((error) => {
          alert(error)
        })
    },
    getVisitStatus(id) {
      return this.$store.getters.getVisitStatus(id)
    },
    petDead(id, isDeath) {
      this.$refs.confirm
        .open(
          'คุณแน่ใจหรือไม่?',
          `คุณแน่ใจหรือไม่ที่จะ${isDeath ? 'แจ้งตาย' : 'ยกเลิกแจ้งตาย'}`,
          {
            width: 290,
            color: 'red',
          }
        )
        .then((confirm) => {
          this.$axios
            .$patch(`/api/pets/${id}`, { death: isDeath }, { progress: false })
            .then((res) => {
              this.petData.death = isDeath
            })
            .catch((err) => {
              alert(err)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

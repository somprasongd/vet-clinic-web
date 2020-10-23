<template>
  <div>
    <v-card class="elevation-4" max-height="100%">
      <v-card-title class="pb-1 pt-3">
        ข้อมูลเจ้าของสัตว์ และสัตว์เลี้ยง
        <v-spacer></v-spacer>
        <v-menu v-if="visitData.visitStatus.id === 1" offset-y nudge-left="65">
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  class="mx-1"
                  color="cusblue3"
                  width="20"
                  height="20"
                  v-bind="attrs"
                  icon
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-icon>mdi-check-circle</v-icon>
                </v-btn>
              </template>
              <span>เข้ารับการตรวจ</span>
            </v-tooltip>
          </template>
          <v-list class="pa-0">
            <div class="px-2 pt-3">
              <h3>เข้ารับการตรวจ?</h3>
              <v-divider></v-divider>
              <v-card-actions class="pa-0 pt-2">
                <v-spacer></v-spacer>
                <v-btn color="cusblue2" text> ยกเลิก </v-btn>
                <v-btn color="cusblue2" text @click="startCheck(visitData.id)">
                  ตกลง
                </v-btn>
              </v-card-actions>
            </div>
          </v-list>
        </v-menu>
        <v-tooltip v-if="visitData.visitStatus.id === 1" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-1"
              color="cusblue3"
              width="20"
              height="20"
              icon
              v-bind="attrs"
              v-on="on"
              @click="
                openSendDocs(
                  visitData.doctor === null ? '' : visitData.doctor.name,
                  visitData.id
                )
              "
            >
              <v-icon>mdi-share-circle</v-icon>
            </v-btn>
          </template>
          <span>ส่งต่อ</span>
        </v-tooltip>
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
                <v-img
                  :src="require('~/assets/profile/001-user.svg')"
                  width="100"
                >
                </v-img>
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
            <v-divider class="dash-divider hidden-md-and-down"></v-divider>

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
                :to="'/appoint/' + this.$route.params.queue"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
              >
                ทำนัด
              </v-btn>
              <v-btn
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="admit($route.params.queue)"
              >
                Admit
              </v-btn>
              <v-btn
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="petDead(petData.id, !petData.death)"
              >
                {{ petData.death ? 'ยกเลิกแจ้งตาย' : 'แจ้งตาย' }}
              </v-btn>
              <v-btn
                :to="'/queue/' + this.$route.params.queue + '/insertImg'"
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
              >
                แนบไฟล์ภาพ
              </v-btn>
              <div v-if="visitData.visitStatus.id === 2" class="mb-2">
                <v-btn
                  class="cusblue3 font-weight-regular text-capitalize"
                  depressed
                  width="49.25%"
                  dark
                  @click="endCheck($route.params.queue, 3)"
                >
                  รอผลตรวจ
                </v-btn>
                <v-btn
                  class="cusblue3 font-weight-regular text-capitalize"
                  depressed
                  width="49.25%"
                  dark
                  @click="endCheck($route.params.queue, 6)"
                >
                  จบการรักษา
                </v-btn>
              </div>
              <v-btn
                v-else
                class="cusblue3 font-weight-regular text-capitalize my-2"
                block
                depressed
                dark
                @click="
                  endCheck(
                    $route.params.queue,
                    visitData.visitStatus.id === 1 ? 8 : 6
                  )
                "
              >
                {{
                  visitData.visitStatus.id === 1
                    ? 'ยกเลิกการรักษา'
                    : 'จบการรักษา'
                }}
              </v-btn>
            </div>
          </div>
          <div v-else-if="showVsDx">
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
          <div v-else-if="showReportBtn && visitData.visitStatus.id === 3">
            <v-divider class="dash-divider hidden-sm-and-down"></v-divider>
            <div class="px-3 my-2">
              <v-btn
                class="cusblue3 font-weight-regular text-capitalize"
                depressed
                block
                dark
                @click="endCheck($route.params.queue, 4)"
              >
                รายงานผล
              </v-btn>
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

    <!-- for mobile -->
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
        :to="'/appoint/' + this.$route.params.queue"
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
        class="px-1"
        rounded
        left
        depressed
        dark
        small
        color="cusblue"
        @click="
          endCheck($route.params.queue, visitData.visitStatus.id === 1 ? 8 : 6)
        "
      >
        {{ visitData.visitStatus.id === 1 ? 'ยกเลิกการรักษา' : 'จบการรักษา' }}
      </v-btn>
    </v-speed-dial>
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
    endCheck(id, status) {
      this.$refs.confirm
        .open(
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
        .then((confirm) => {
          this.$axios
            .$patch(
              `/api/visits/${id}`,
              { visitStatusId: status },
              { progress: false }
            )
            .then((res) => {
              this.$router.push(`/queue`)
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
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

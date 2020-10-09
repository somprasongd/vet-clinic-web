<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-calendar-month</v-icon>
    </v-btn>

    <v-dialog
      v-model="assignModal"
      max-width="450"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <h2 class="pa-5 pb-2">ตารางนัดหมาย</h2>
        <v-btn class="mt-4" icon absolute right @click="assignModal = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-divider></v-divider>

        <div class="px-10 pb-10">
          <v-row align="center" justify="center" dense>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menuDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    color="cusblue"
                    append-icon="mdi-calendar-month"
                    background-color="white"
                    v-bind="attrs"
                    label="วันที่นัดหมาย"
                    readonly
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  color="cusblue"
                  min="1950-01-01"
                  locale="th"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="ownerName"
                color="cusblue"
                background-color="white"
                label="ชื่อ"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-divider class="darker-divider"></v-divider>

        <v-card-text class="pa-0" style="height: 350px">
          <div v-if="appointQueue.length !== 0 && appointQueue !== []">
            <v-menu
              v-for="appoint in appointFilter"
              :key="appoint.id"
              :offset-x="offset"
              max-width="200"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  class="py-5 px-10"
                  link
                  v-bind="attrs"
                  style="border-bottom: 1px solid rgb(204, 204, 204)"
                  v-on="on"
                >
                  <v-row align="center" justify="center" no-gutters>
                    <v-col cols="3" class="font-weight-medium">เจ้าของ</v-col>
                    <v-col cols="1" class="font-weight-medium text-center"
                      >:</v-col
                    >
                    <v-col cols="8" class="font-weight-medium">
                      {{ appoint.pet.owner.name }}
                    </v-col>

                    <v-col cols="3">แพทย์</v-col>
                    <v-col cols="1" class="text-center">:</v-col>
                    <v-col cols="8">
                      {{ appoint.doctor !== null ? appoint.doctor.name : '' }}
                    </v-col>

                    <v-col cols="3">สัตว์เลี้ยง</v-col>
                    <v-col cols="1" class="text-center">:</v-col>
                    <v-col cols="8">
                      {{ appoint.pet.name + '(' + appoint.pet.type + ')' }}
                    </v-col>

                    <v-col cols="3">นัดเพื่อ</v-col>
                    <v-col cols="1" class="text-center">:</v-col>
                    <v-col cols="8">{{ appoint.cause }}</v-col>

                    <v-col cols="3">เวลา</v-col>
                    <v-col cols="1" class="text-center">:</v-col>
                    <v-col cols="8">{{ appoint.appointTime }} น.</v-col>
                  </v-row>
                </v-list-item>
              </template>

              <v-list class="pa-0">
                <div class="px-2 pt-3">
                  <h3>ยืนยันเข้ารับบริการ?</h3>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-0 pt-2">
                    <v-spacer></v-spacer>
                    <v-btn color="cusblue2" text @click="dialog = false">
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      color="cusblue2"
                      text
                      @click="
                        sendCheck(appoint.pet.id, appoint.doctor.id, appoint.id)
                      "
                    >
                      ตกลง
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-list>
            </v-menu>
          </div>

          <v-sheet v-else height="100%" tile>
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              no-gutters
            >
              <span class="grey--text">Not Found Appoint</span>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
    <sendcheckDialog ref="checkDialog" />
  </div>
</template>

<script>
import sendcheckDialog from '@/components/Record/UserRecord/sendcheckDialog'
export default {
  components: {
    sendcheckDialog,
  },
  data() {
    return {
      assignModal: false,
      menuDate: false,
      offset: true,
      date: null,
      appointQueue: [],
      ownerName: '',
    }
  },
  computed: {
    appointFilter() {
      return this.appointQueue.filter((appoint) => {
        return appoint.pet.owner.name
          .toLowerCase()
          .includes(this.ownerName.toLowerCase())
      })
    },
  },
  watch: {
    async date() {
      const appoint = await this.$axios.$get(
        `/api/appoints?date=${this.date}`,
        { progress: false }
      )
      this.appointQueue = appoint.results
    },
  },
  mounted() {
    this.date = new Date().toISOString().substr(0, 10)
  },
  methods: {
    sendCheck(id, doctor, appointId) {
      this.assignModal = false
      setTimeout(() => {
        this.$refs.checkDialog.open1(id, doctor, appointId)
      }, 150)
    },
  },
}
</script>

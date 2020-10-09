<template>
  <div>
    <v-dialog
      v-model="appointDialog"
      max-width="800"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <h2 class="pa-5 pb-2">ทำนัด</h2>
        <v-btn class="mt-4" icon absolute right @click="appointDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-select
                  v-model="sendAppoint.doctor"
                  :disabled="loading"
                  :items="doctor"
                  item-text="name"
                  item-value="id"
                  color="cusblue"
                  item-color="cusblue"
                  label="แพทย์ผู้ตรวจ"
                  :menu-props="{ closeOnContentClick: true }"
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      :style="
                        sendAppoint.doctor === ''
                          ? 'background-color: #e2f5fc'
                          : ''
                      "
                      ripple
                      @click="sendAppoint.doctor = ''"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          :class="
                            sendAppoint.doctor === '' ? 'cusblue--text' : ''
                          "
                        >
                          ไม่ระบุแพทย์
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
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
                      ref="bd"
                      v-model="selectDate"
                      :disabled="loading"
                      :rules="rules.selectDate"
                      label="วันที่นัด"
                      color="cusblue"
                      append-icon="mdi-calendar-month"
                      v-bind="attrs"
                      readonly
                      v-on="on"
                    >
                      <template v-slot:append>
                        <v-btn
                          v-for="btn in plusBtn"
                          :key="btn.value"
                          class="mb-1 ml-1"
                          color="cusblue3 white--text"
                          depressed
                          icon
                          small
                          outlined
                          @click="plusDate(btn.value)"
                        >
                          {{ btn.text }}
                        </v-btn>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="sendAppoint.appointDate"
                    color="cusblue"
                    :min="new Date().toISOString().substr(0, 10)"
                    value="YYYY-mm"
                    locale="th"
                    :show-current="false"
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="AppointTime"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="sendAppoint.appointTime"
                      :disabled="loading"
                      :rules="rules.appointTime"
                      color="cusblue"
                      append-icon="mdi-clock-outline"
                      background-color="white"
                      v-bind="attrs"
                      label="เวลา"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ref="picker"
                    v-model="sendAppoint.appointTime"
                    color="cusblue"
                    format="24hr"
                    scrollable
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="sendAppoint.cause"
                  :disabled="loading"
                  :rules="rules.cause"
                  label="สาเหตุการนัด"
                  color="cusblue"
                  auto-grow
                  row-height="24"
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="sendAppoint.remark"
                  :disabled="loading"
                  :rules="rules.remark"
                  label="หมายเหตุ"
                  color="cusblue"
                  auto-grow
                  row-height="24"
                  rows="1"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-alert
              v-model="alert"
              dense
              text
              color="red"
              transition="scroll-y-transition"
              dismissible
            >
              {{ error }}
            </v-alert>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="loading"
            class="cusblue2--text text-none"
            text
            @click="appointDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            :disabled="!valid || loading"
            class="cusblue2--text text-none"
            text
            @click="submitAppoint"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="oldAppointDialog"
      max-width="500"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <h2 class="pa-5 pb-2">นัดหมายเก่า</h2>
        <v-btn
          class="mt-4"
          icon
          absolute
          right
          @click="oldAppointDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-tabs class="pb-5" show-arrows grow hide-slider color="cusblue">
          <v-tab v-for="item in oldAppoint" :key="item.id">
            <v-icon left>mdi-calendar-month</v-icon>
            {{ $moment(item.appointDate).format('DD/MM/YYYY') }}
          </v-tab>

          <v-tab-item v-for="item in oldAppoint" :key="item.id">
            <v-card flat>
              <v-card-text>
                <v-text-field
                  label="เจ้าของ"
                  :value="item.pet.owner.name"
                  disabled
                ></v-text-field>
                <v-text-field
                  label="แพทย์"
                  :value="
                    item.doctor !== null ? item.doctor.name : 'ไม่ระบุแพทย์'
                  "
                  disabled
                ></v-text-field>
                <v-text-field
                  label="สัตว์เลี้ยง"
                  :value="item.pet.name + '(' + item.pet.type + ')'"
                  disabled
                ></v-text-field>
                <v-text-field
                  label="นัดเพื่อ"
                  :value="item.cause"
                  disabled
                ></v-text-field>
                <v-text-field
                  label="เวลา"
                  :value="item.appointTime"
                  disabled
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="oldAppointDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="cusblue2" text @click="showAddDialog"> เพิ่ม </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      petId: '',
      appointDialog: false,
      valid: false,
      loading: false,
      alert: false,
      error: '',

      oldAppointDialog: false,
      oldAppoint: [],

      menuDate: false,
      AppointDate: false,
      AppointTime: false,
      doctor: this.$store.state.form.doctor,
      plusBtn: [
        { text: '+3', value: 3 },
        { text: '+5', value: 5 },
        { text: '+7', value: 7 },
        { text: '+30', value: 30 },
      ],
      sendAppoint: {
        petId: '',
        appointDate: '',
        appointTime: '',
        doctor: '',
        cause: '',
        remark: '',
        fromVisitId: '',
      },

      rules: {
        appointDate: [(v) => !!v || 'กรุณาเลือกวันที่นัด'],
        appointTime: [(v) => !!v || 'กรุณาเลือกเวลานัด'],
        cause: [
          (v) => !!v || 'กรุณากรอกสาเหตุการนัด',
          (v) => v.length <= 1000 || 'ไม่ควรกรอกสาเหตุการนัด 1000 ตัวอักษร',
        ],
        remark: [
          (v) => v.length <= 1000 || 'ไม่ควรกรอกหมายเหตุเกิน 1000 ตัวอักษร',
        ],
      },
    }
  },
  computed: {
    selectDate() {
      if (!this.sendAppoint.appointDate) return null
      else return moment(this.sendAppoint.appointDate).format('DD/MM/YYYY')
    },
  },
  mounted() {
    if (this.$store.state.form.doctor.length === 0) {
      this.$store.dispatch('form/addDoctor').then((res) => {
        this.doctor = res
      })
    }
  },
  methods: {
    async open(id) {
      this.sendAppoint.petId = id
      this.sendAppoint.appointDate = new Date().toISOString().substr(0, 10)
      this.sendAppoint.appointTime = moment().format('HH:mm')

      const oldAppoint = await this.$axios.$get(`/api/appoints?petId=${id}`, {
        progress: false,
      })

      if (oldAppoint.results.length !== 0) {
        this.oldAppoint = oldAppoint.results
        this.oldAppointDialog = true
      } else {
        this.appointDialog = true
      }
    },
    showAddDialog() {
      this.oldAppointDialog = false
      setTimeout(() => {
        this.appointDialog = true
      }, 150)
    },
    plusDate(num) {
      this.sendAppoint.appointDate = moment(this.sendAppoint.appointDate)
        .add(num, 'days')
        .format('YYYY-MM-DD')
    },
    submitAppoint() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const appoint = { ...this.sendAppoint }
        const sendAppoint = {
          petId: appoint.petId,
          doctorId: appoint.doctor === '' ? null : appoint.doctor,
          appointDate: appoint.appointDate,
          appointTime: appoint.appointTime,
          cause: appoint.cause,
          remark: appoint.remark,
          fromVisitId: null,
        }
        this.$axios
          .$post('/api/appoints', sendAppoint)
          .then((res) => {
            this.successSubmit(res)
          })
          .catch((error) => {
            this.errorSubmit(error)
          })
      }
    },
    successSubmit(res) {
      setTimeout(() => {
        this.loading = false
        this.alert = false
        this.appointDialog = false

        this.sendAppoint.cause = ''
        this.sendAppoint.remark = ''
        this.$refs.form.resetValidation()
      }, 500)
    },
    errorSubmit(error) {
      this.loading = false
      this.alert = true
      this.error = error.response.data.error.message
    },
  },
}
</script>

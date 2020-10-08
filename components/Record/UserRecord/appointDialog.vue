<template>
  <v-dialog v-model="appointDialog" max-width="800" scrollable>
    <v-card>
      <h2 class="pa-5 pb-2">ทำนัด</h2>
      <v-divider class="darker-divider"></v-divider>
      <v-card-text class="px-7">
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <v-row align="center" justify="center">
            <v-col cols="6">
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
                    label="วันเกิด"
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
            <v-col cols="6">
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
        <v-btn :disabled="loading" class="cusblue2--text text-none" text>
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

      menuDate: false,
      AppointDate: false,
      AppointTime: false,

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
  methods: {
    open(id) {
      this.sendAppoint.petId = id
      this.appointDialog = true
      this.sendAppoint.appointDate = new Date().toISOString().substr(0, 10)
      this.sendAppoint.appointTime = moment().format('HH:mm')
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

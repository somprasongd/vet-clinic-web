<template>
  <v-dialog
    v-model="depositDialog"
    max-width="800"
    scrollable
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <h2 class="pa-5 pb-2">ฝากเลี้ยง</h2>
      <v-btn class="mt-4" icon absolute right @click="depositDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-divider class="darker-divider"></v-divider>
      <v-card-text class="px-7">
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <v-row align="center" justify="center">
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
                    label="วันเกิด"
                    color="cusblue"
                    append-icon="mdi-calendar-month"
                    v-bind="attrs"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="sendDeposit.DepositDate"
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
                v-model="DepositTime"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="sendDeposit.DepositTime"
                    :disabled="loading"
                    :rules="rules.DepositTime"
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
                  v-model="sendDeposit.DepositTime"
                  color="cusblue"
                  format="24hr"
                  use-seconds
                  scrollable
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="sendDeposit.note"
                :disabled="loading"
                :rules="rules.note"
                label="Note"
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
          @click="submitDeposit"
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
      depositDialog: false,
      valid: false,
      loading: false,
      alert: false,
      error: '',

      menuDate: false,
      DepositDate: false,
      DepositTime: false,

      sendDeposit: {
        petId: '',
        DepositDate: '',
        DepositTime: '',
        note: '',
      },

      rules: {
        DepositDate: [(v) => !!v || 'กรุณาเลือกวันที่นัด'],
        DepositTime: [(v) => !!v || 'กรุณาเลือกเวลานัด'],
        note: [
          (v) => v.length <= 1000 || 'ไม่ควรกรอกสาเหตุการนัด 1000 ตัวอักษร',
        ],
      },
    }
  },
  computed: {
    selectDate() {
      if (!this.sendDeposit.DepositDate) return null
      else return moment(this.sendDeposit.DepositDate).format('DD/MM/YYYY')
    },
  },
  methods: {
    open(id) {
      this.sendDeposit.petId = id
      this.depositDialog = true
      this.sendDeposit.DepositDate = new Date().toISOString().substr(0, 10)
      this.sendDeposit.DepositTime = moment().format('HH:mm:ss')
    },
    plusDate(num) {
      this.sendDeposit.DepositDate = moment(this.sendDeposit.DepositDate)
        .add(num, 'days')
        .format('YYYY-MM-DD')
    },
    submitDeposit() {
      if (this.$refs.form.validate()) {
        // this.loading = true
        const deposit = { ...this.sendDeposit }
        const date = moment(
          deposit.DepositDate + ' ' + deposit.DepositTime,
          'YYYY-MM-DD HH:mm:ss'
        )
        const sendDeposit = {
          petId: deposit.petId,
          visitAt: date.toISOString(),
          note: deposit.note,
        }
        // console.log(sendDeposit)
        this.$axios
          .$post('/api/visits/daycare', sendDeposit)
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
        this.depositDialog = false
        console.log(res)
        this.sendDeposit.note = ''
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

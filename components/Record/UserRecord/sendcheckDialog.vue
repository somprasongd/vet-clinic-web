<template>
  <div>
    <v-btn
      class="ma-2 px-0"
      color="cusblue3"
      dark
      block
      depressed
      @click.stop="checkDialog = true"
      >ส่งตรวจ</v-btn
    >
    <v-btn
      class="ma-2 px-0"
      color="cusblue3"
      dark
      block
      depressed
      @click="UpdateTime"
      >ฝากเลี้ยง</v-btn
    >
    <v-btn class="ma-2 px-0" color="cusblue3" dark block depressed>ทำนัด</v-btn>
    <v-btn class="ma-2 px-0" color="cusblue3" dark block depressed
      >ประวัติการรักษา</v-btn
    >

    <v-dialog v-model="checkDialog" max-width="700">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <h2 class="pa-5 pb-2">ส่งตรวจ</h2>
          <v-divider class="darker-divider"></v-divider>
          <div class="py-5 px-10">
            <v-row dense>
              <v-col cols="6">
                <v-select
                  v-model="sendCheck.doctor"
                  :items="this.$store.state.doctor.doctors"
                  label="แพทย์ผู้ตรวจ"
                  :rules="rules.doctor"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="sendCheck.important"
                  color="cusblue"
                  label="ความสำคัญ"
                  :rules="rules.important"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="sendCheck.weight"
                  color="cusblue"
                  label="นำหนัก / kg"
                  :rules="rules.weight"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="sendCheck.temp"
                  color="cusblue"
                  label="อุณหภูมิ / C°"
                  :rules="rules.temp"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="ดูอาการ"
                  label="ดูอาการ"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="ทำแผล"
                  label="ทำแผล"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="ฟังผลตรวจ"
                  label="ฟังผลตรวจ Lab"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="ฉีดยา"
                  label="ฉีดยา"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="ให้น้ำเกลือ"
                  label="ให้น้ำเกลือ"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  class="mx-2"
                  value="Xray / Ultrasound"
                  label="Xray / Ultrasound"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="px-3">
                <v-row align="center" no-gutters>
                  <v-checkbox
                    v-model="enabled"
                    hide-details
                    class="shrink mr-2 mt-0"
                    label="อื่นๆ"
                  ></v-checkbox>
                  <v-text-field
                    v-model="sendCheck.do.other"
                    dense
                    :disabled="!enabled"
                    class="mt-5"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="sendCheck.problem"
                  color="cusblue"
                  label="สาเหตุการเข้ารับบริการ"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" text @click="checkDialog = false"
              >ไม่ส่ง</v-btn
            >
            <v-btn color="cusblue2" :disabled="!valid" text @click="submitCheck"
              >ส่ง</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="depositDialog" max-width="800" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">ฝากเลี้ยง</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="DepositDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateDepo"
                    color="cusblue"
                    append-icon="mdi-calendar-month"
                    background-color="white"
                    v-bind="attrs"
                    label="วันที่วัด"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="dateDepo"
                  color="cusblue"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
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
                    v-model="TimeDepo"
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
                  v-model="TimeDepo"
                  color="cusblue"
                  format="24hr"
                  scrollable
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field color="cusblue" label="รายละเอียด"></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>ยกเลิก</v-btn>
          <v-btn class="cusblue2--text text-none" text>บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    userDetail: {
      default: null,
      type: Object,
      required: false,
    },
    petId: {
      default: null,
      type: String,
      required: false,
    },
  },
  data() {
    return {
      depositDialog: false,
      DepositDate: false,
      dateDepo: '',
      DepositTime: false,
      TimeDepo: '',

      enabled: false,
      checkDialog: false,
      valid: true,
      doctor: ['Doctor', 'Doctor1', 'Doctor2'],
      nameTitle: ['คุณ', 'นาย', 'นาง', 'นางสาว'],
      userDetails: this.userDetail,
      sendCheck: {
        type: '',
        time: '',
        status: '',
        doctor: '',
        important: '',
        weight: '',
        temp: '',
        do: {
          check: [],
          other: '',
        },
        problem: '',
      },
      rules: {
        doctor: [(v) => !!v || 'กรุณาเลือกแพทย์ผู้ตรวจ'],
        important: [
          (v) => !!v || 'กรุณากรอกความสำคัญ',
          (v) =>
            (v && v.length <= 100) || 'ไม่ควรกรอกความสำคัญเกิน 100 ตัวอักษร',
        ],
        weight: [
          (v) => !!v || 'กรุณากรอกน้ำหนัก',
          (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
          (v) => (v && v.length <= 3) || 'ไม่ควรกรอกน้ำหนักเกิน 10 ตัวอักษร',
        ],
        temp: [
          (v) => !!v || 'กรุณากรอกอุณหภูมิ',
          (v) => /^[0-9]*$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
          (v) => (v && v.length <= 3) || 'ไม่ควรกรอกอุณหภูมิเกิน 10 ตัวอักษร',
        ],
      },
    }
  },
  methods: {
    submitCheck() {
      if (this.$refs.form.validate()) {
        // console.log(this.petId)
        this.sendCheck.type = 'OPD'
        this.sendCheck.status = 'รอตรวจ'
        this.sendCheck.time = moment().format('YYYY-MM-DD, h:mm:ss a')

        // this.userDetails.status = this.sendCheck

        this.$store
          .dispatch('queue/addQueueOPD', {
            user: this.userDetails,
            petId: this.petId,
            status: this.sendCheck,
          })
          .then(() => {
            // this.$refs.form.reset()
            this.checkDialog = false
          })
      }
    },
    submitDeposit() {
      this.sendCheck.type = 'ฝากเลี้ยง'
      this.sendCheck.status = 'ฝากเลี้ยง'
      this.sendCheck.time = moment().format('YYYY-MM-DD, h:mm:ss a')

      this.userDetails.status = this.sendCheck
      this.$store.commit('queue/addQueueOPD', [this.userDetails, this.petId])
    },
    UpdateTime() {
      this.dateDepo = moment().format('YYYY-MM-DD')
      this.TimeDepo = moment().format('HH:mm')

      this.depositDialog = true
    },
  },
}
</script>

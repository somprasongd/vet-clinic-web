<template>
  <div>
    <v-dialog v-model="sendCheckDialog" max-width="700">
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
            <v-btn color="cusblue2" text @click="sendCheckDialog = false">
              ไม่ส่ง
            </v-btn>
            <v-btn
              color="cusblue2"
              :disabled="!valid"
              text
              @click="submitCheck"
            >
              ส่ง
            </v-btn>
          </v-card-actions>
        </v-form>
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
  },
  data() {
    return {
      petId: '',

      doctor: ['Doctor', 'Doctor1', 'Doctor2'],
      nameTitle: ['คุณ', 'นาย', 'นาง', 'นางสาว'],

      sendCheckDialog: false,
      enabled: false,

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

      valid: true,
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
    open(id) {
      this.petId = id
      this.sendCheckDialog = true
    },
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
            this.sendCheckDialog = false
          })
      }
    },
  },
}
</script>

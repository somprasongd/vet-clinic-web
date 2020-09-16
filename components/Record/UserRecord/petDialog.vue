<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      class="v-btn--example"
      color="cusblue2"
      fab
      large
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <h2 class="pa-5 pb-2">เพิ่มข้อมูลสัตว์เลี้ยง</h2>
          <v-divider class="darker-divider"></v-divider>
          <div class="py-5 px-10">
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="addPet.name"
                  color="cusblue"
                  label="ชื่อสัตว์เลี้ยง"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addPet.microship"
                  color="cusblue"
                  label="Microchip No"
                ></v-text-field>
              </v-col>
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
                      v-model="selectDate"
                      label="วันเกิด"
                      color="cusblue"
                      append-icon="mdi-calendar-month"
                      :rules="rules.bd"
                      v-bind="attrs"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="addPet.bd"
                    color="cusblue"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    value="YYYY-mm"
                    locale="th"
                    :show-current="false"
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="addPet.bd_year"
                  color="cusblue"
                  label="ปี"
                  @change="writeDate"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="addPet.bd_month"
                  color="cusblue"
                  label="เดือน"
                  @change="writeDate"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="addPet.bd_day"
                  color="cusblue"
                  label="วัน"
                  @change="writeDate"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="addPet.type"
                  :items="type"
                  label="ประเภท"
                  :rules="rules.type"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="addPet.gender"
                  :items="gender"
                  label="เพศ"
                  :rules="rules.gender"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="addPet.color"
                  color="cusblue"
                  label="สี"
                  :rules="rules.color"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="addPet.sterile"
                  :items="sterile"
                  label="การทำหมัน"
                  :rules="rules.sterile"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="addPet.scar"
                  color="cusblue"
                  label="ตำหนิ"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addPet.note"
                  color="cusblue"
                  label="Note"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" text @click="cancelForm">ยกเลิก</v-btn>
            <v-btn color="cusblue2" :disabled="!valid" text @click="submitPet"
              >บันทึก</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      assignModal: false,
      date: null,
      menuDate: false,
      valid: true,
      type: ['หมา', 'แมว', 'นก', 'หนู'],
      gender: ['ผู้', 'เมีย'],
      sterile: ['ทำแล้ว', 'ยังไม่ทำ'],
      addPet: {
        name: '',
        microship: '',
        bd: null,
        bd_year: '',
        bd_month: '',
        bd_day: '',
        type: '',
        gender: '',
        color: '',
        sterile: '',
        scar: '',
        note: '',
      },
      rules: {
        name: [
          (v) => !!v || 'กรุณากรอกชื่อสัตว์เลี้ยง',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร',
        ],
        bd: [(v) => !!v || 'กรุณาเลือกวันเกิดของสัตว์เลี้ยง'],
        type: [(v) => !!v || 'กรุณาเลือกประเภทสัตว์เลี้ยง'],
        gender: [(v) => !!v || 'กรุณาเลือกเพศสัตว์เลี้ยง'],
        color: [
          (v) => !!v || 'กรุณากรอกสีสัตว์เลี้ยง',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกสีเกิน 100 ตัวอักษร',
        ],
        sterile: [(v) => !!v || 'กรุณาเลือกการทำหมัน'],
      },
    }
  },
  computed: {
    selectDate() {
      // After Picked Date or Pet BD changed will Calculate Years, Month, Day Textfield and return Date Format to DatePicker
      if (!this.addPet.bd) return null

      this.calcDate(this.addPet.bd)
      return moment(this.addPet.bd).format('DD/MM/YYYY')
    },
  },
  methods: {
    writeDate() {
      // After Change value in Year, Month, Day Textfield it will subtract now Date for Pet BD
      let now = moment()
      now = moment(now).subtract(this.addPet.bd_year, 'years')
      now = moment(now).subtract(this.addPet.bd_month, 'months')
      now = moment(now).subtract(this.addPet.bd_day, 'days')
      this.addPet.bd = moment(now).format('YYYY-MM-DD')
    },
    calcDate(date) {
      // This Function will calculate Picked Date for Year, Month, Day Textfield
      const nowDate = moment()
      const pickDate = moment(date.toString(), 'YYYY-MM-DD')
      const dateDiff = moment.duration(nowDate.diff(pickDate))
      this.addPet.bd_year = dateDiff.years()
      this.addPet.bd_month = dateDiff.months()
      this.addPet.bd_day = dateDiff.days()
    },
    submitPet() {
      if (this.$refs.form.validate()) {
        // this.$store.commit('record/addPet', [this.addPet, this.$route.params.owner])
        const sendPet = { ...this.addPet }
        this.$store
          .dispatch('addPet', { id: this.$route.params.owner, pet: sendPet })
          .then(() => {
            this.resetPet()
            this.assignModal = false
          })
      }
    },
    cancelForm() {
      this.resetPet()
      this.assignModal = false
    },
    resetPet() {
      this.addPet.name = ''
      this.addPet.microship = ''
      this.addPet.bd = null
      this.addPet.bd_year = ''
      this.addPet.bd_month = ''
      this.addPet.bd_day = ''
      this.addPet.type = ''
      this.addPet.gender = ''
      this.addPet.color = ''
      this.addPet.sterile = ''
      this.addPet.scar = ''
      this.addPet.note = ''
    },
  },
}
</script>

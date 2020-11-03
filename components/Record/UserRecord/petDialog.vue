<template>
  <div>
    <v-dialog
      v-model="assignModal"
      max-width="700"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <h2 class="pa-5 pb-2">
          {{ addPet.id ? 'แก้ไขข้อมูลสัตว์เลี้ยง' : 'เพิ่มข้อมูลสัตว์เลี้ยง' }}
        </h2>
        <v-btn class="mt-4" icon absolute right @click="assignModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <div>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="addPet.name"
                    :disabled="loading"
                    color="cusblue"
                    label="ชื่อสัตว์เลี้ยง"
                    :rules="rules.name"
                    @keydown.enter="onEnter('microship')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    ref="microship"
                    v-model="addPet.microship"
                    :disabled="loading"
                    color="cusblue"
                    label="Microchip No"
                    @keydown.enter="onEnter('bd'), (menuDate = true)"
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
                        ref="bd"
                        v-model="selectDate"
                        :disabled="loading"
                        label="วันเกิด"
                        color="cusblue"
                        append-icon="mdi-calendar-month"
                        :rules="rules.bd"
                        v-bind="attrs"
                        readonly
                        v-on="on"
                        @keydown.enter="onEnter('year'), (menuDate = false)"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="addPet.bd"
                      :disabled="loading"
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
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="year"
                    v-model="addPet.bd_year"
                    :disabled="loading"
                    color="cusblue"
                    label="ปี"
                    @change="writeDate"
                    @keydown.enter="onEnter('month')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="month"
                    v-model="addPet.bd_month"
                    :disabled="loading"
                    color="cusblue"
                    label="เดือน"
                    @change="writeDate"
                    @keydown.enter="onEnter('day')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="day"
                    v-model="addPet.bd_day"
                    :disabled="loading"
                    color="cusblue"
                    label="วัน"
                    @change="writeDate"
                    @keydown.enter="onEnter('type')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-select
                    ref="type"
                    v-model="addPet.type"
                    :disabled="loading"
                    :items="type"
                    item-text="label"
                    item-value="id"
                    label="ประเภท"
                    :rules="rules.type"
                    @keydown.enter="onEnter('gender')"
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    ref="breed"
                    v-model="addPet.breed"
                    :disabled="loading"
                    color="cusblue"
                    label="สายพันธุ์"
                    :rules="rules.breed"
                    @keydown.enter="onEnter('scar')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-select
                    ref="gender"
                    v-model="addPet.gender"
                    :disabled="loading"
                    :items="gender"
                    item-text="label"
                    item-value="id"
                    label="เพศ"
                    :rules="rules.gender"
                    @keydown.enter="onEnter('color')"
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    ref="color"
                    v-model="addPet.color"
                    :disabled="loading"
                    color="cusblue"
                    label="สี"
                    :rules="rules.color"
                    @keydown.enter="onEnter('sterile')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    ref="sterile"
                    v-model="addPet.sterile"
                    :disabled="loading"
                    :items="sterile"
                    item-text="label"
                    item-value="state"
                    label="การทำหมัน"
                    :rules="rules.sterile"
                    @keydown.enter="onEnter('breed')"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    ref="scar"
                    v-model="addPet.scar"
                    :disabled="loading"
                    color="cusblue"
                    label="ตำหนิ"
                    :rules="rules.scar"
                    @keydown.enter="onEnter('note')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    ref="note"
                    v-model="addPet.note"
                    :disabled="loading"
                    color="cusblue"
                    label="Note"
                    auto-grow
                    row-height="24"
                    rows="1"
                    :rules="rules.note"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
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
          <v-btn color="cusblue2" :disabled="loading" text @click="cancelForm">
            ยกเลิก
          </v-btn>
          <v-btn
            color="cusblue2"
            :disabled="!valid || loading"
            text
            @click="addPet.id ? updatePet() : submitPet()"
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
      loading: false,
      alert: false,
      error: '',

      type: this.$store.state.form.petType,
      gender: this.$store.state.form.petGender,
      sterile: [
        { state: 1, label: 'ทำแล้ว' },
        { state: 2, label: 'ยังไม่ทำ' },
      ],

      addPet: {
        id: '',
        name: '',
        microship: '',
        // status: '',
        bd: null,
        bd_year: '',
        bd_month: '',
        bd_day: '',
        type: 1,
        gender: 1,
        color: '',
        sterile: 2,
        breed: '',
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
        breed: [(v) => v.length <= 100 || 'ไม่ควรกรอกพันธุ์เกิน 100 ตัวอักษร'],
        color: [(v) => v.length <= 100 || 'ไม่ควรกรอกสีเกิน 100 ตัวอักษร'],
        sterile: [(v) => !!v || 'กรุณาเลือกการทำหมัน'],
        scar: [(v) => v.length <= 1000 || 'ไม่ควรกรอกตำหนิเกิน 1000 ตัวอักษร'],
        note: [(v) => v.length <= 2000 || 'ไม่ควรกรอกโน๊ตเกิน 2000 ตัวอักษร'],
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
  watch: {
    assignModal() {
      if (this.assignModal === false) {
        this.resetPet()
      }
    },
  },
  mounted() {
    if (this.$store.state.form.petGender.length === 0) {
      this.$store.dispatch('form/addGender').then((res) => {
        this.gender = res
      })
    }
    if (this.$store.state.form.petType.length === 0) {
      this.$store.dispatch('form/addType').then((res) => {
        this.type = res
      })
    }
  },
  methods: {
    open(pet) {
      this.assignModal = true
      // ยังไม่เสร็จ
      if (pet) {
        this.addPet = {
          id: pet.id,
          name: pet.name || '',
          microship: pet.microchipNo || '',
          // status: '',
          bd: pet.birthDate,
          bd_year: '',
          bd_month: '',
          bd_day: '',
          type: pet.type.id,
          gender: pet.gender.id,
          color: pet.color || '',
          sterile: pet.sterilization ? 1 : 2,
          breed: pet.breed || '',
          scar: pet.earmark || '',
          note: pet.note || '',
        }
      }
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    // After Change value in Year, Month, Day Textfield it will subtract now Date for Pet BD
    writeDate() {
      let now = moment()
      now = moment(now).subtract(this.addPet.bd_year, 'years')
      now = moment(now).subtract(this.addPet.bd_month, 'months')
      now = moment(now).subtract(this.addPet.bd_day, 'days')
      this.addPet.bd = moment(now).format('YYYY-MM-DD')
    },
    // This Function will calculate Picked Date for Year, Month, Day Textfield
    calcDate(date) {
      const nowDate = moment()
      const pickDate = moment(date.toString(), 'YYYY-MM-DD')
      const dateDiff = moment.duration(nowDate.diff(pickDate))
      this.addPet.bd_year = dateDiff.years()
      this.addPet.bd_month = dateDiff.months()
      this.addPet.bd_day = dateDiff.days()
    },
    // ************** REQUEST ************
    submitPet() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const pet = { ...this.addPet }
        const sendPet = {
          name: pet.name,
          breed: pet.breed,
          color: pet.color,
          sterilization:
            pet.sterile === 1 ? true : pet.sterile === 2 ? false : '',
          ownerId: this.$route.params.owner,
          genderId: pet.gender,
          typeId: pet.type,
          birthDate: pet.bd,
          earmark: pet.scar,
          note: pet.note,
          microchipNo: pet.microship,
        }
        // console.log(sendPet)
        this.$axios
          .$post('/api/pets', sendPet, { progress: false })
          .then((res) => {
            this.successSubmit(res)
          })
          .catch((err) => {
            this.errorSubmit(err)
          })
      }
    },
    updatePet() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const pet = { ...this.addPet }
        const sendPet = {
          name: pet.name,
          breed: pet.breed,
          color: pet.color,
          sterilization:
            pet.sterile === 1 ? true : pet.sterile === 2 ? false : '',
          ownerId: this.$route.params.owner,
          genderId: pet.gender,
          typeId: pet.type,
          birthDate: pet.bd,
          earmark: pet.scar,
          note: pet.note,
          microchipNo: pet.microship,
        }
        // console.log(sendPet)
        this.$axios
          .$patch(`/api/pets/${pet.id}`, sendPet, { progress: false })
          .then((res) => {
            this.successSubmit(res)
          })
          .catch((err) => {
            this.errorSubmit(err)
          })
      }
    },
    // Result **********
    successSubmit(res) {
      this.loading = false
      this.alert = false
      this.assignModal = false
      this.resetPet()
      // console.log(res)
      this.$emit('update', res)
    },
    errorSubmit(error) {
      this.loading = false
      this.alert = true
      this.error = error.response.data.error.message
    },

    // Fix Reset Dialog********
    cancelForm() {
      this.resetPet()
      this.assignModal = false
    },
    resetPet() {
      this.addPet = {
        id: '',
        name: '',
        microship: '',
        // status: '',
        bd: null,
        bd_year: '',
        bd_month: '',
        bd_day: '',
        type: 1,
        gender: 1,
        color: '',
        sterile: 2,
        breed: '',
        scar: '',
        note: '',
      }
      this.valid = true
      this.$refs.form.resetValidation()
    },
  },
}
</script>

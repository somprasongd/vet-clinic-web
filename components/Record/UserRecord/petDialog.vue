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
          {{
            formData.id ? 'แก้ไขข้อมูลสัตว์เลี้ยง' : 'เพิ่มข้อมูลสัตว์เลี้ยง'
          }}
        </h2>
        <v-btn class="mt-4" icon absolute right @click="assignModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <div>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.name"
                    :disabled="loading"
                    color="cusblue"
                    label="ชื่อสัตว์เลี้ยง"
                    :rules="rules.name"
                    autofocus
                    @keydown.enter="onEnter('year')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="year"
                    v-model="dateYear"
                    :disabled="loading"
                    color="cusblue"
                    label="ปี"
                    @change="setDate"
                    @keydown.enter="onEnter('month')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="month"
                    v-model="dateMonth"
                    :disabled="loading"
                    color="cusblue"
                    label="เดือน"
                    @change="setDate"
                    @keydown.enter="onEnter('day')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2">
                  <v-text-field
                    ref="day"
                    v-model="dateDay"
                    :disabled="loading"
                    color="cusblue"
                    label="วัน"
                    @change="setDate"
                    @keydown.enter="onEnter('type')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="menuDate"
                    v-model="menuDate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        ref="bd"
                        v-model="dateFormatted"
                        :disabled="loading"
                        label="วันเกิด"
                        color="cusblue"
                        append-icon="mdi-calendar-month"
                        :rules="rules.bd"
                        v-bind="attrs"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                        @keydown.enter="onEnter('type'), (menuDate = false)"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="date"
                      :disabled="loading"
                      color="cusblue"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      locale="th-TH"
                      :show-current="false"
                      scrollable
                      @input="menuDate = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-select
                    ref="type"
                    v-model="formData.type"
                    :disabled="loading"
                    :items="type"
                    item-text="label"
                    item-value="id"
                    label="ประเภท"
                    :rules="rules.type"
                    @keydown.enter="onEnter('gender')"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    ref="breed"
                    v-model="formData.breed"
                    :disabled="loading"
                    color="cusblue"
                    label="สายพันธุ์"
                    :rules="rules.breed"
                    @keydown.enter="onEnter('scar')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    ref="gender"
                    v-model="formData.gender"
                    :disabled="loading"
                    :items="gender"
                    item-text="label"
                    item-value="id"
                    label="เพศ"
                    :rules="rules.gender"
                    @keydown.enter="onEnter('color')"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    ref="sterile"
                    v-model="formData.sterile"
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
                    ref="color"
                    v-model="formData.color"
                    :disabled="loading"
                    color="cusblue"
                    label="สี"
                    :rules="rules.color"
                    @keydown.enter="onEnter('sterile')"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    ref="scar"
                    v-model="formData.scar"
                    :disabled="loading"
                    color="cusblue"
                    label="ตำหนิ"
                    :rules="rules.scar"
                    @keydown.enter="onEnter('note')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    ref="microship"
                    v-model="formData.microship"
                    :disabled="loading"
                    color="cusblue"
                    label="Microchip No"
                    @keydown.enter="onEnter('note')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    ref="note"
                    v-model="formData.note"
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
          <v-btn
            v-shortkey="['ctrl', 'x']"
            color="cusblue2"
            :disabled="loading"
            text
            @shortkey="cancelForm"
            @click="cancelForm"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            v-shortkey="['ctrl', 'enter']"
            color="cusblue2"
            :disabled="!valid || loading"
            text
            @shortkey="onSubmit"
            @click="onSubmit"
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
      menuDate: false,

      valid: true,
      loading: false,
      alert: false,
      error: '',

      date: null,
      dateFormatted: '',
      dateYear: '',
      dateMonth: '',
      dateDay: '',
      formData: {
        id: null,
        name: '',
        microship: '',
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
    type() {
      return this.$store.state.form.petType
    },
    gender() {
      return this.$store.state.form.petGender
    },
    sterile() {
      return [
        { state: 1, label: 'ทำแล้ว' },
        { state: 2, label: 'ยังไม่ทำ' },
      ]
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    assignModal() {
      if (this.assignModal === false) {
        this.resetPet()
      }
    },
  },
  mounted() {
    if (this.$store.state.form.petGender.length === 0) {
      this.$store.dispatch('form/addGender')
    }
    if (this.$store.state.form.petType.length === 0) {
      this.$store.dispatch('form/addType')
    }
  },
  methods: {
    open(pet) {
      this.assignModal = true
      if (pet) {
        this.formData = {
          id: pet.id,
          name: pet.name || '',
          microship: pet.microchipNo || '',
          type: pet.type.id,
          gender: pet.gender.id,
          color: pet.color || '',
          sterile: pet.sterilization ? 1 : 2,
          breed: pet.breed || '',
          scar: pet.earmark || '',
          note: pet.note || '',
        }
        this.date = pet.birthDate
      }
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    setDate() {
      let now = moment()
      now = moment(now).subtract(this.dateYear, 'years')
      now = moment(now).subtract(this.dateMonth, 'months')
      now = moment(now).subtract(this.dateDay, 'days')
      this.date = moment(now).format('YYYY-MM-DD')
    },
    formatDate(date) {
      if (!date) return null
      this.calcDate(date)
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    calcDate(date) {
      const nowDate = moment()
      const pickDate = moment(date.toString(), 'YYYY-MM-DD')
      const dateDiff = moment.duration(nowDate.diff(pickDate))
      this.dateYear = dateDiff.years()
      this.dateMonth = dateDiff.months()
      this.dateDay = dateDiff.days()
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const body = {
          name: this.formData.name,
          breed: this.formData.breed,
          color: this.formData.color,
          sterilization:
            this.formData.sterile === 1
              ? true
              : this.formData.sterile === 2
              ? false
              : '',
          ownerId: this.$route.params.owner,
          genderId: this.formData.gender,
          typeId: this.formData.type,
          birthDate: this.date,
          earmark: this.formData.scar,
          note: this.formData.note,
          microchipNo: this.formData.microship,
        }
        const isNew = !this.formData.id
        try {
          let pet = null
          if (isNew) {
            pet = await this.$axios.$post('/api/pets', body, {
              progress: false,
            })
          } else {
            pet = await this.$axios.$patch(
              `/api/pets/${this.formData.id}`,
              body,
              {
                progress: false,
              }
            )
          }
          this.loading = false
          this.alert = false
          this.assignModal = false
          this.resetPet()
          this.$emit('update', pet)
        } catch (error) {
          this.loading = false
          this.alert = true
          this.error = error.response
            ? error.response.data.error.message
            : error.message
        }
      }
    },
    cancelForm() {
      this.resetPet()
      this.assignModal = false
    },
    resetPet() {
      this.date = null
      this.dateFormatted = ''
      this.dateYear = ''
      this.dateMonth = ''
      this.dateDay = ''
      this.formData = {
        id: null,
        name: '',
        microship: '',
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

<template>
  <div>
    <v-dialog
      v-model="assignModalVS"
      max-width="600"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      scrollable
    >
      <v-card>
        <h2 class="pa-5 pb-2">{{ VsTitle }}</h2>
        <v-btn class="mt-4" icon absolute right @click="assignModalVS = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="MeasureDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="selectDate"
                      :disabled="loading"
                      :rules="rules.date"
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
                    v-model="editedItem.date"
                    color="cusblue"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="MeasureTime"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.time"
                      :disabled="loading"
                      :rules="rules.time"
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
                    v-model="editedItem.time"
                    :disabled="loading"
                    color="cusblue"
                    format="24hr"
                    scrollable
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.weight"
                  :disabled="loading"
                  :rules="rules.weight"
                  color="cusblue"
                  label="Weight/kg"
                  autofocus
                  @keydown.enter="onEnter('temp')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="temp"
                  v-model="editedItem.temp"
                  :disabled="loading"
                  :rules="rules.temp"
                  color="cusblue"
                  label="Temp/F"
                  @keydown.enter="onEnter('pulse')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="pulse"
                  v-model="editedItem.pulse"
                  :disabled="loading"
                  :rules="rules.pulse"
                  color="cusblue"
                  label="Pulse"
                  @keydown.enter="onEnter('r')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="r"
                  v-model="editedItem.rr"
                  :disabled="loading"
                  :rules="rules.rr"
                  color="cusblue"
                  label="R"
                  @keydown.enter="onEnter('sys')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="sys"
                  v-model="editedItem.sys"
                  :disabled="loading"
                  :rules="rules.sys"
                  color="cusblue"
                  label="Systolic P/bpm"
                  @keydown.enter="onEnter('dia')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="dia"
                  v-model="editedItem.dia"
                  :disabled="loading"
                  :rules="rules.dia"
                  color="cusblue"
                  label="Diastolic P/bpm"
                  @keydown.enter="onEnter('bcs')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="bcs"
                  v-model="editedItem.bcs"
                  :disabled="loading"
                  :rules="rules.bcs"
                  color="cusblue"
                  label="BCS"
                  @keydown.enter="onEnter('ps')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  ref="ps"
                  v-model="editedItem.painScore"
                  :disabled="loading"
                  :rules="rules.painScore"
                  color="cusblue"
                  label="Pain Score"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-shortkey="['ctrl', 'x']"
            color="cusblue2"
            text
            @shortkey="close"
            @click="close"
            >ยกเลิก</v-btn
          >
          <v-btn
            v-shortkey="['ctrl', 'enter']"
            color="cusblue2"
            :disabled="!valid || loading"
            text
            @shortkey="submit"
            @click="submit"
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
      v-model="dialogShow"
      max-width="930"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      scrollable
    >
      <v-card height="100%">
        <h2 class="pa-5 pb-2">Vital Sign</h2>
        <v-btn class="mt-4" icon absolute right @click="dialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-data-table
          :headers="headers"
          :items="cardData"
          class="elevation-1"
          disable-pagination
          hide-default-footer
          height="100%"
          fixed-header
        >
          <template v-slot:[`item.date`]="{ item }">
            {{ $moment(item.vitalSignAt).format('DD/MM/YYYY') }}
          </template>
          <template v-slot:[`item.time`]="{ item }">
            {{ $moment(item.vitalSignAt).format('HH:mm') }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editIem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteVs(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="!this.$vuetify.breakpoint.xsOnly">
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="dialogShow = false">ออก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirmDialog ref="confirm" />
  </div>
</template>

<style lang="scss">
.v-virtual-scroll {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(161, 161, 161);
    border-radius: 10px;
  }
  // &::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  // }
}
</style>

<script>
import moment from 'moment'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    confirmDialog,
  },
  props: {
    cardData: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      dialogShow: false,

      assignModalVS: false,
      MeasureDate: false,
      MeasureTime: false,

      valid: false,
      loading: false,
      alert: false,
      error: '',

      editedIndex: -1,
      editedId: 0,
      editedItem: {
        date: '',
        time: '',
        temp: '',
        rr: '',
        pulse: '',
        sys: '',
        dia: '',
        weight: '',
        painScore: '',
        bcs: '',
      },

      headers: [
        { text: 'Date', value: 'date', align: 'center' },
        { text: 'Time', value: 'time', align: 'center' },
        { text: 'Temp', value: 'temp', align: 'center' },
        { text: 'R', value: 'rr', align: 'center' },
        { text: 'Pulse', value: 'pulse', align: 'center' },
        { text: 'SysBp', value: 'sys', align: 'center' },
        { text: 'DiaBp', value: 'dia', align: 'center' },
        { text: 'Weight', value: 'weight', align: 'center' },
        { text: 'PainScr', value: 'painScore', align: 'center' },
        { text: 'BCS', value: 'bcs', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rules: {
        date: [(v) => !!v || 'กรุณาเลือกวันที่'],
        time: [(v) => !!v || 'กรุณาเลือกเวลา'],
        rr: [
          (v) =>
            !v ||
            /^[0-9]{1,3}$/.test(v) ||
            'กรุณากรอกตัวเลข ไม่เกิน 3 ตัว เท่านั้น',
        ],
        pulse: [
          (v) =>
            !v ||
            /^[0-9]{1,3}$/.test(v) ||
            'กรุณากรอกตัวเลข ไม่เกิน 3 ตัว เท่านั้น',
        ],
        sys: [
          (v) =>
            !v ||
            /^[0-9]{1,3}$/.test(v) ||
            'กรุณากรอกตัวเลข ไม่เกิน 3 ตัว เท่านั้น',
        ],
        dia: [
          (v) =>
            !v ||
            /^[0-9]{1,3}$/.test(v) ||
            'กรุณากรอกตัวเลข ไม่เกิน 3 ตัว เท่านั้น',
        ],
        painScore: [
          (v) =>
            !v ||
            /^(?:[1-9]|0[1-9]|10)$/.test(v) ||
            'กรุณากรอกตัวเลข 1 - 10 เท่านั้น',
        ],
        bcs: [
          (v) => !v || /^[1-9]$/.test(v) || 'กรุณากรอกตัวเลข 1 - 9 เท่านั้น',
        ],
        temp: [
          (v) =>
            !v || /^[0-9]*\.?[0-9]{1,2}$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
        ],
        weight: [
          (v) =>
            !v || /^[0-9]*\.?[0-9]{1,2}$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
        ],
      },
    }
  },
  computed: {
    selectDate() {
      if (!this.editedItem.date) return null
      else return moment(this.editedItem.date).format('DD/MM/YYYY')
    },
    VsTitle() {
      return this.editedIndex === -1 ? 'เพิ่ม Vital Sign' : 'แก้ไข Vital Sign'
    },
  },
  watch: {
    assignModalVS(val) {
      if (val) {
        if (this.editedItem.date === '') {
          this.editedItem.date = moment().format('YYYY-MM-DD')
          this.editedItem.time = moment().format('HH:mm')
        }
      } else this.close()
    },
  },
  methods: {
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    openCreate() {
      this.assignModalVS = true
    },
    openShow() {
      this.dialogShow = true
    },
    UpdateTime() {
      this.editedItem.date = moment().format('YYYY-MM-DD')
      this.editedItem.time = moment().format('HH:mm')

      this.assignModalVS = true
    },
    editIem(val) {
      this.dialogShow = false
      this.editedIndex = this.cardData.indexOf(val)
      this.editedId = val.id
      this.editedItem = {
        date: moment(val.vitalSignAt).format('YYYY-MM-DD'),
        time: moment(val.vitalSignAt).format('HH:mm'),
        temp: val.temp === null ? '' : val.temp,
        rr: val.rr === null ? '' : val.rr,
        sys: val.sys === null ? '' : val.sys,
        dia: val.dia === null ? '' : val.dia,
        weight: val.weight === null ? '' : val.weight,
        painScore: val.painScore === null ? '' : val.painScore,
        bcs: val.bcs === null ? '' : val.bcs,
      }
      setTimeout(() => {
        this.assignModalVS = true
      }, 200)
    },
    close() {
      this.loading = false
      this.assignModalVS = false
      this.$nextTick(() => {
        this.editedItem = {
          date: '',
          time: '',
          temp: '',
          rr: '',
          pulse: '',
          sys: '',
          dia: '',
          weight: '',
          painScore: '',
          bcs: '',
        }
        this.editedIndex = -1
        this.editedId = 0
      })
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.editedIndex > -1) {
          this.updateVs()
        } else {
          this.sendVS()
        }
        // this.close()
      }
    },
    sendVS() {
      const vs = { ...this.editedItem }
      const date = moment(vs.date + ' ' + vs.time, 'YYYY-MM-DD HH:mm:ss')
      const sendVS = {
        vitalSignAt: date.toISOString(),
        temp: vs.temp === '' ? null : vs.temp,
        rr: vs.rr === '' ? null : vs.rr,
        pulse: vs.pulse === '' ? null : vs.pulse,
        sys: vs.sys === '' ? null : vs.sys,
        dia: vs.dia === '' ? null : vs.dia,
        weight: vs.weight === '' ? null : vs.weight,
        painScore: vs.painScore === '' ? null : vs.painScore,
        bcs: vs.bcs === '' ? null : vs.bcs,
      }
      this.$axios
        .$post(`/api/visits/${this.$route.params.queue}/vs`, sendVS, {
          progress: false,
        })
        .then((res) => {
          this.cardData.unshift(res)
          setTimeout(() => {
            this.assignModalVS = false
          }, 200)
        })
        .catch((error) => {
          alert(error)
        })
    },
    updateVs() {
      const vs = { ...this.editedItem }
      const date = moment(vs.date + ' ' + vs.time, 'YYYY-MM-DD HH:mm:ss')
      const sendVS = {
        vitalSignAt: date.toISOString(),
        temp: vs.temp === '' ? null : vs.temp,
        rr: vs.rr === '' ? null : vs.rr,
        pulse: vs.pulse === '' ? null : vs.pulse,
        sys: vs.sys === '' ? null : vs.sys,
        dia: vs.dia === '' ? null : vs.dia,
        weight: vs.weight === '' ? null : vs.weight,
        painScore: vs.painScore === '' ? null : vs.painScore,
        bcs: vs.bcs === '' ? null : vs.bcs,
      }
      this.$axios
        .$patch(
          `/api/visits/${this.$route.params.queue}/vs/${this.editedId}`,
          sendVS,
          { progress: false }
        )
        .then((res) => {
          Object.assign(this.cardData[this.editedIndex], res)
          this.assignModalVS = false
          setTimeout(() => {
            this.dialogShow = true
          }, 200)
        })
        .catch((error) => {
          alert(error)
        })
    },
    async deleteVs(item) {
      const index = this.cardData.indexOf(item)
      this.dialogShow = false
      const confirm = await this.$refs.confirm.open(
        'คุณแน่ใจหรือไม่?',
        'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้',
        {
          width: 290,
          color: 'red',
        }
      )

      if (!confirm) {
        this.dialogShow = true
        return
      }

      try {
        await this.$axios.$delete(
          `/api/visits/${this.$route.params.queue}/vs/${item.id}`,
          {
            progress: false,
          }
        )
        this.dialogShow = true
        this.cardData.splice(index, 1)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

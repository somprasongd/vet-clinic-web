<template>
  <div>
    <v-dialog
      v-model="assignModal"
      max-width="450"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      transition="dialog-transition"
    >
      <v-card>
        <h2 class="pa-5 pb-2">รับกลับบ้าน</h2>
        <v-divider></v-divider>
        <v-card-text>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="date"
                disabled
                color="cusblue"
                label="วันที่รับฝาก"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="time"
                disabled
                color="cusblue"
                label="เวลารับฝาก"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="countTime"
                disabled
                color="cusblue"
                label="สรุประยะเวลา"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="dateNum"
                :disabled="loading"
                color="cusblue"
                label="จำนวนวันฝาก"
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="price"
                :disabled="loading"
                color="cusblue"
                label="ราคาต่อวัน"
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="cusblue2"
            :disabled="loading"
            text
            @click="assignModal = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn color="cusblue2" :disabled="loading" text @click="takeHome()">
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            ตกลง
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

      id: '',
      date: '',
      time: '',
      countTime: '',

      dateNum: '',
      price: '',

      loading: false,
    }
  },
  methods: {
    open(id, date) {
      this.id = id
      this.date = moment(date).format('DD/MM/YYYY')
      this.time = moment(date).format('HH:mm:ss')

      const nowDate = moment()
      const dateDiff = moment.duration(nowDate.diff(date))
      this.countTime = `${dateDiff.days()} วัน ${dateDiff.hours()} ชั่วโมง ${dateDiff.minutes()} นาที`

      if (parseInt(dateDiff.hours()) >= 1) {
        this.dateNum = parseInt(dateDiff.days()) + 1
      } else {
        this.dateNum = dateDiff.days()
      }

      this.assignModal = true
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    takeHome() {
      this.loading = true
      const data = {
        qty: this.dateNum,
        price: this.price === '' ? 0 : this.price,
      }
      this.$axios
        .$patch(`/api/visit/${this.id}/status/take-home`, data, {
          progress: false,
        })
        .then((res) => {
          setTimeout(() => {
            this.loading = false
            this.assignModal = false
          }, 500)
        })
        .catch((error) => {
          alert(error)
          this.loading = false
        })
    },
  },
}
</script>

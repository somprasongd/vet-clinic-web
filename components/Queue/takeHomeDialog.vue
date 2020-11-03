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
                :value="visitDate"
                disabled
                color="cusblue"
                label="วันที่รับฝาก"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="visitTime"
                disabled
                color="cusblue"
                label="เวลารับฝาก"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :value="summaryTime"
                disabled
                color="cusblue"
                label="สรุประยะเวลา"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="qty"
                autocomplete="nope"
                :disabled="loading"
                color="cusblue"
                label="จำนวนวันฝาก"
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="price"
                autocomplete="nope"
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
  async fetch() {
    try {
      this.item = await this.$axios.$get(`/api/config/items/1`, {
        progress: false,
      })
    } catch (error) {
      this.item = {}
    }
  },
  fetchOnServer: false,
  data() {
    return {
      item: {},
      id: null,
      date: new Date(),
      qty: 1,
      price: 0,
      assignModal: false,
      loading: false,
    }
  },
  computed: {
    visitDate() {
      return moment(this.date).format('DD/MM/YYYY')
    },
    visitTime() {
      return moment(this.date).format('HH:mm:ss')
    },
    summaryTime() {
      const dateDiff = moment.duration(moment().diff(this.date))
      return `${dateDiff.days()} วัน ${dateDiff.hours()} ชั่วโมง ${dateDiff.minutes()} นาที`
    },
  },
  methods: {
    open(id, date) {
      this.id = id
      this.date = date

      const dateDiff = moment.duration(moment().diff(date))

      let days = dateDiff.days() === 0 ? 1 : dateDiff.days()
      if (parseInt(dateDiff.hours()) >= 1) {
        days = parseInt(dateDiff.days()) + 1
      }
      this.qty = days
      this.price = this.item.price || 0

      this.assignModal = true
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    async takeHome() {
      this.loading = true
      const data = {
        qty: this.qty,
        price: this.price === '' ? 0 : this.price,
      }
      try {
        const pos = await this.$axios.$patch(
          `/api/visits/${this.id}/status/take-home`,
          data,
          {
            progress: false,
          }
        )
        this.assignModal = false
        this.$emit('onSuccess', this.id)
        if (pos) {
          this.$router.push(`/pos/${pos.id}`)
        }
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>

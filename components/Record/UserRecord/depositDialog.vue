<template>
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
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      petId: '',

      depositDialog: false,
      DepositDate: false,
      dateDepo: '',
      DepositTime: false,
      TimeDepo: '',
    }
  },
  methods: {
    open(id) {
      this.petId = id
      this.depositDialog = true
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

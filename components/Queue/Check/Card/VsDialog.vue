<template>
  <div>
    <v-card-actions class="customAction-right">
      <v-btn
        color="cusblue2"
        class="ma-0"
        text
        small
        @click="dialogShow = true"
      >
        Show All
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn
        color="cusblue2"
        class="ma-0"
        text
        fab
        x-small
        @click.stop="UpdateTime"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn
        color="cusblue2"
        class="ma-0"
        text
        fab
        x-small
        @click.stop="UpdateTime"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="assignModalVS" max-width="600">
      <v-card>
        <v-form ref="form" lazy-validation autocomplete="off">
          <h2 class="pa-5 pb-2">Vital Sign</h2>
          <v-divider class="darker-divider"></v-divider>
          <div class="py-5 px-10">
            <v-row dense>
              <v-col cols="6">
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
                      v-model="date"
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
                    v-model="date"
                    color="cusblue"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
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
                      v-model="Time"
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
                    v-model="Time"
                    color="cusblue"
                    format="24hr"
                    scrollable
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field color="cusblue" label="F/F°"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field color="cusblue" label="R"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="cusblue"
                  label="Systolic P/bpm"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="cusblue"
                  label="Diastolic P/bpm"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field color="cusblue" label="Weight/kg"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field color="cusblue" label="Pain Score"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field color="cusblue" label="BCS"></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" text>ไม่ส่ง</v-btn>
            <v-btn color="cusblue2" text>ส่ง</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogShow" max-width="900">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="cardData"
          class="elevation-1"
          disable-pagination
          hide-default-footer
          height="80vh"
          fixed-header
        >
          <template v-slot:[`item.date`]="{ item }">
            {{ $moment(item.vitalSignAt).format('DD/MM/YYYY') }}
          </template>
          <template v-slot:[`item.time`]="{ item }">
            {{ $moment(item.vitalSignAt).format('HH:mm:ss') }}
          </template>
        </v-data-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="dialogShow = false">ออก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
export default {
  props: {
    cardData: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      fab: false,
      assignModalVS: false,
      dialogShow: false,
      MeasureDate: false,
      date: '',
      MeasureTime: false,
      Time: '',
      headers: [
        { text: 'Date', value: 'date', align: 'center' },
        { text: 'Time', value: 'time', align: 'center' },
        { text: 'Temp', value: 'temp', align: 'center' },
        { text: 'R', value: 'rr', align: 'center' },
        { text: 'SysBp', value: 'sys', align: 'center' },
        { text: 'DiaBp', value: 'dia', align: 'center' },
        { text: 'Weight', value: 'weight', align: 'center' },
        { text: 'PainScr', value: 'painScore', align: 'center' },
        { text: 'BCS', value: 'bcs', align: 'center' },
      ],
    }
  },
  methods: {
    UpdateTime() {
      this.date = moment().format('YYYY-MM-DD')
      this.Time = moment().format('HH:mm')

      this.assignModalVS = true
    },
  },
}
</script>

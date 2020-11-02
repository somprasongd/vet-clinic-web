<template>
  <v-card color="grey lighten-4" flat tile>
    <v-row
      :class="`second-nav cusblue1 ${
        this.$vuetify.breakpoint.xsOnly ? 'pb-2' : ''
      }`"
      height="55"
      align="center"
      justify="center"
      dense
      flat
    >
      <h1 class="font-weight-medium col-sm-2 col-6 order-first">POS</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
      >
        วันที่เริ่ม :
      </v-subheader>

      <v-menu
        ref="menu"
        v-model="startMenuDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="start"
            class="rounded-lg cus-input mr-3"
            background-color="cusblue3"
            append-icon="mdi-calendar-month"
            v-bind="attrs"
            dark
            filled
            rounded
            single-line
            dense
            flat
            hide-details
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="startDate"
          color="cusblue"
          :max="nowDate"
        ></v-date-picker>
      </v-menu>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
      >
        วันที่สิ้นสุด :
      </v-subheader>

      <v-menu
        ref="menu"
        v-model="endMenuDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="end"
            class="rounded-lg cus-input mr-3"
            background-color="cusblue3"
            append-icon="mdi-calendar-month"
            v-bind="attrs"
            dark
            filled
            rounded
            single-line
            dense
            flat
            hide-details
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="endDate"
          color="cusblue"
          :max="nowDate"
        ></v-date-picker>
      </v-menu>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
      >
        สถานะ :
      </v-subheader>
      <v-select
        v-model="selectStatus"
        :items="status"
        item-text="label"
        item-value="value"
        :menu-props="{ closeOnContentClick: true }"
        :class="
          $vuetify.breakpoint.xsOnly
            ? 'rounded-lg cus-input order-first'
            : 'rounded-lg cus-input'
        "
        background-color="cusblue3"
        item-color="cusblue"
        label="ทั้งหมด"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      >
        <template v-slot:prepend-item>
          <v-list-item
            :style="selectStatus === '' ? 'background-color: #e2f5fc' : ''"
            ripple
            @click="selectStatus = ''"
          >
            <v-list-item-content>
              <v-list-item-title
                :class="selectStatus === '' ? 'cusblue--text' : ''"
              >
                แสดงทั้งหมด
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </v-row>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      assignModal: false,
      status: [
        { label: 'พักรายการ', value: 'pending' },
        // { label: 'กำลังทำรายการ', value: 'active' },
        { label: 'ทำรายการสำเร็จ', value: 'success' },
        { label: 'ยกเลิกรายการ', value: 'cancel' },
      ],
      selectStatus: 'pending',

      startMenuDate: false,
      endMenuDate: false,

      nowDate: new Date().toISOString().substr(0, 10),

      startDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
      endDate: new Date().toISOString().substr(0, 10),
    }
  },
  computed: {
    start() {
      if (!this.startDate) return null
      else return moment(this.startDate).format('DD/MM/YYYY')
    },
    end() {
      if (!this.endDate) return null
      else return moment(this.endDate).format('DD/MM/YYYY')
    },
  },
  watch: {
    startDate(val) {
      if (this.endDate !== null) this.emitDate()
    },
    endDate(val) {
      if (this.startDate !== null) this.emitDate()
    },
    selectStatus(val) {
      localStorage.posState = val
      if (this.startDate !== null && this.startDate !== null) this.emitDate()
    },
  },
  mounted() {
    if (localStorage.posState !== undefined)
      this.selectStatus = localStorage.posState
  },
  methods: {
    emitDate() {
      this.$emit('updateStatus', {
        startDate: this.startDate,
        endDate: this.endDate,
        state: this.selectStatus,
      })
    },
  },
}
</script>

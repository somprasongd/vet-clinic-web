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
      <h1 class="font-weight-medium col-sm-3 col-6 order-first">ข้อมูลนัด</h1>

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
            v-model="startDate"
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
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
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
            v-model="endDate"
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
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
        ></v-date-picker>
      </v-menu>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
      >
        ประเภทการนัด :
      </v-subheader>

      <v-select
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'rounded-lg cus-input order-first'
            : 'rounded-lg cus-input'
        "
        background-color="cusblue3"
        :items="appointType"
        label="ทั้งหมด"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      ></v-select>
    </v-row>
  </v-card>

  <!-- <v-row class="cusblue1 px-10" align="center" justify="center" dense>
    <v-col cols="12" md="3">
      <h1 class="font-weight-medium">ข้อมูลนัด</h1>
    </v-col>
    <v-col cols="4" md="3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="4"> วันที่เริ่ม : </v-col>
        <v-col cols="7">
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
                v-model="startDate"
                class="cusblue3 rounded-lg"
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
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" md="3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="4"> วันที่สิ้นสุด : </v-col>
        <v-col cols="7">
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
                v-model="endDate"
                class="cusblue3 rounded-lg"
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
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" md="3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="4"> ประเภทการนัด : </v-col>
        <v-col cols="7">
          <v-select
            class="cusblue3 rounded-lg"
            :items="appointType"
            label="ทั้งหมด"
            dark
            filled
            rounded
            single-line
            dense
            flat
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row> -->
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      startMenuDate: false,
      endDate: null,
      endMenuDate: false,
      appointType: ['คนแรก', 'คนสอง', 'คนสาม', 'คนสี่'],
    }
  },
}
</script>

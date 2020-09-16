<template>
  <v-row class="cusblue1 px-10" align="center" justify="center" dense>
    <v-col cols="12" md="6">
      <h1 class="font-weight-medium">ประวัติการรักษา</h1>
    </v-col>
    <v-col cols="6" md="3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3"> วันที่เริ่ม : </v-col>
        <v-col cols="9">
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
    <v-col cols="6" md="3">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3"> วันที่สิ้นสุด : </v-col>
        <v-col cols="9">
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
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      startMenuDate: false,
      endDate: null,
      endMenuDate: false,
    }
  },
}
</script>

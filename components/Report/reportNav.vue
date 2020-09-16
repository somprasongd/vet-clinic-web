<template>
  <v-row class="cusblue1 px-10" align="center" justify="center" dense>
    <v-col cols="12" sm="7" md="9" lg="10">
      <h1 class="font-weight-medium">รายงาน</h1>
    </v-col>
    <v-col cols="12" sm="5" md="3" lg="2">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3"> วันที่ : </v-col>
        <v-col cols="9">
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
                v-model="date"
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
              v-model="date"
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
      date: null,
      menuDate: false,
    }
  },
}
</script>

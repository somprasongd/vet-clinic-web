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
      <h1 class="font-weight-medium col-sm-4 col-12">รายงาน</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >วันที่ :
      </v-subheader>
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
            class="rounded-lg"
            background-color="cusblue3"
            append-icon="mdi-calendar-month"
            :style="
              $vuetify.breakpoint.xsOnly ? 'width:auto' : 'max-width: 200px'
            "
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
    </v-row>
  </v-card>
  <!-- <v-row class="cusblue1 px-10" align="center" justify="center" dense>
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
  </v-row> -->
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

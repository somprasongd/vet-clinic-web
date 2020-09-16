<template>
  <v-row class="cusblue1 px-10" align="center" justify="center" dense>
    <v-col md="3" cols="12">
      <h1 class="font-weight-medium">เวชระเบียน</h1>
    </v-col>
    <v-col md="2" cols="4">
      <v-row align="center" justify="center" dense>
        <v-col cols="3">ตัวเลือก</v-col>
        <v-col cols="1">:</v-col>
        <v-col cols="7">
          <v-select
            class="cusblue3 rounded-lg"
            :items="doct"
            label="บ้านเลขที่"
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
    <v-col md="7" cols="8">
      <v-text-field
        class="cusblue3 rounded-lg"
        append-icon="mdi-magnify"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: ['OPD', 'IPD'],
      doct: ['คนแรก', 'คนสอง', 'คนสาม', 'คนสี่'],
      queueCount: '5',
    }
  },
}
</script>

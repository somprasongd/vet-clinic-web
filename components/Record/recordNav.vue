<template>
  <v-card color="grey lighten-4" flat tile>
    <v-row
      class="second-nav cusblue1"
      height="55"
      align="center"
      justify="center"
      dense
      flat
    >
      <h1 class="font-weight-medium col-sm-4 col-12">เวชระเบียน</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >ตัวเลือก :
      </v-subheader>

      <v-select
        class="rounded-lg cus-input mr-3"
        background-color="cusblue3"
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
      <v-text-field
        class="rounded-lg cus-textfield"
        background-color="cusblue3"
        append-icon="mdi-magnify"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      ></v-text-field>
    </v-row>
  </v-card>
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

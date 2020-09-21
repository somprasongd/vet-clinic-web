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
      <h1 class="font-weight-medium col-sm-2 col-12">คิว ({{ queueCount }})</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >ประเภทการตรวจ :
      </v-subheader>
      <v-select
        v-model="type"
        class="rounded-lg cus-input mr-3"
        background-color="cusblue3"
        :items="typeCheck"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      ></v-select>
      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >แพทย์ผู้ตรวจ :
      </v-subheader>
      <v-select
        class="rounded-lg cus-input"
        background-color="cusblue3"
        :items="doct"
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
  <!-- <v-row class="cusblue1 second-nav" align="center" justify="center" dense>
    <v-col md="6" cols="12">
      <h1 class="font-weight-medium">คิว ({{ queueCount }})</h1>
    </v-col>
    <v-col md="3" cols="6">
      <v-row align="center" justify="center" no-gutters>
        <v-col
          v-show="!this.$vuetify.breakpoint.smAndDown"
          class="text-right"
          cols="0"
          sm="6"
          >ประเภทการตรวจ : &nbsp;</v-col
        >
        <v-col cols="12" sm="6">
          <v-select
            v-model="type"
            class="cusblue3 rounded-lg"
            :items="typeCheck"
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
    <v-col md="3" cols="6">
      <v-row align="center" justify="center" no-gutters>
        <v-col
          v-show="!this.$vuetify.breakpoint.smAndDown"
          class="text-right"
          cols="0"
          sm="6"
          >แพทย์ผู้ตรวจ : &nbsp;</v-col
        >
        <v-col cols="12" sm="6">
          <v-select
            class="cusblue3 rounded-lg"
            :items="doct"
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
  props: {
    typeDefault: {
      type: String,
      required: true,
    },
    typeCheck: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      type: this.typeDefault,
      doct: ['คนแรก', 'คนสอง', 'คนสาม', 'คนสี่'],
      queueCount: '5',
    }
  },
  watch: {
    type() {
      this.$emit('selectType', this.type)
    },
  },
}
</script>

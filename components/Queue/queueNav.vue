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
      <h1 class="font-weight-medium col-sm-2 col-12">คิว ({{ queueCount }})</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >ประเภทการตรวจ :
      </v-subheader>
      <v-select
        v-model="selectedVisitTypeId"
        :items="visitTypes"
        item-text="label"
        item-value="id"
        class="rounded-lg cus-input mr-3"
        background-color="cusblue3"
        item-color="cusblue"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
        @change="sendValue"
      ></v-select>
      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >แพทย์ผู้ตรวจ :
      </v-subheader>
      <v-select
        v-model="selectedDoctorId"
        :items="doctors"
        item-text="name"
        item-value="id"
        :menu-props="{ closeOnContentClick: true }"
        class="rounded-lg cus-input"
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
        @change="sendValue"
      >
        <template v-slot:prepend-item>
          <v-list-item
            :style="selectedDoctorId === '' ? 'background-color: #e2f5fc' : ''"
            ripple
            @click="selectedDoctorId = ''"
          >
            <v-list-item-content>
              <v-list-item-title
                :class="selectedDoctorId === '' ? 'cusblue--text' : ''"
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
export default {
  props: {
    queueCount: {
      type: Number,
      required: false,
      default: 0,
    },
    defaultVisitTypeId: {
      type: Number,
      required: false,
      default: 0,
    },
    defaultDoctorId: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedVisitTypeId: this.defaultVisitTypeId,
      selectedDoctorId: this.defaultDoctorId,
    }
  },
  computed: {
    visitTypes() {
      return this.$store.state.form.visitType
    },
    doctors() {
      return this.$store.state.form.doctor
    },
  },
  watch: {
    selectedVisitTypeId() {
      this.$emit('selectedVisitType', this.selectedVisitTypeId)
    },
    selectedDoctorId() {
      this.$emit('selectedDoctor', this.selectedDoctorId)
    },
  },
  created() {
    if (this.$store.state.form.doctor.length === 0) {
      this.$store.dispatch('form/addDoctor')
    }
    if (this.$store.state.form.visitType.length === 0) {
      this.$store.dispatch('form/addVisitType')
    }
  },
  methods: {
    sendValue() {
      this.$emit('onSearch', {
        visitTypeId: this.selectedVisitTypeId,
        doctorId: this.selectedDoctorId,
      })
    },
  },
}
</script>

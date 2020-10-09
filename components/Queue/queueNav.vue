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
        v-model="selectType"
        :items="type"
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
      ></v-select>
      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >แพทย์ผู้ตรวจ :
      </v-subheader>
      <v-select
        v-model="selectDoctor"
        :items="doctor"
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
      >
        <template v-slot:prepend-item>
          <v-list-item
            :style="selectDoctor === '' ? 'background-color: #e2f5fc' : ''"
            ripple
            @click="selectDoctor = ''"
          >
            <v-list-item-content>
              <v-list-item-title
                :class="selectDoctor === '' ? 'cusblue--text' : ''"
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
  data() {
    return {
      selectType: 1,
      selectDoctor: '',
      type: this.$store.state.form.visitType,
      doctor: this.$store.state.form.doctor,
      queueCount: '5',
    }
  },
  watch: {
    selectType() {
      this.$emit('selectType', this.selectType)
    },
    selectDoctor() {
      this.$emit('selectDoctor', this.selectDoctor)
    },
  },
  created() {
    if (this.$store.state.form.doctor.length === 0) {
      this.$store.dispatch('form/addDoctor').then((res) => {
        this.doctor = res
      })
    }
    if (this.$store.state.form.visitType.length === 0) {
      this.$store.dispatch('form/addVisitType').then((res) => {
        this.type = res
      })
    }
  },
}
</script>

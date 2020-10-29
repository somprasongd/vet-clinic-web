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
      <h1 class="font-weight-medium col-sm-4 col-12">POS</h1>

      <v-spacer></v-spacer>

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
    }
  },
  watch: {
    selectStatus(val) {
      this.$emit('updateStatus', val)
    },
  },
}
</script>

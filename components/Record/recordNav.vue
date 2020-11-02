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
      <h1 class="font-weight-medium col-sm-4 col-12">เวชระเบียน</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >ตัวเลือก :
      </v-subheader>

      <v-select
        v-model="searchKey"
        class="rounded-lg cus-input mr-3"
        background-color="cusblue3"
        :items="items"
        item-text="label"
        item-value="value"
        return-object
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
        @change="sendValue"
      ></v-select>
      <v-text-field
        v-model="searchValue"
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
        autocomplete="off"
        @keypress.enter="sendValue"
      ></v-text-field>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    defaultSearchKey: {
      type: Object,
      required: false,
      default() {
        return { label: 'บ้านเลขที่', value: 'houseNo' }
      },
    },
    defaultSearchValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      searchKey: this.defaultSearchKey,
      searchValue: this.defaultSearchValue,
      items: [
        { label: 'บ้านเลขที่', value: 'houseNo' },
        { label: 'เบอร์โทร', value: 'tel' },
        { label: 'ชื่อเจ้าของ', value: 'firstName' },
        { label: 'นามสกุลเจ้าของ', value: 'lastName' },
        { label: 'ชื่อสัตว์เลี้ยง', value: 'petName' },
        { label: 'รหัสเจ้าของ', value: 'code' },
        { label: 'Microchip No.', value: 'microchipNo' },
      ],
    }
  },
  methods: {
    sendValue() {
      this.$emit('onSearch', { key: this.searchKey, value: this.searchValue })
    },
  },
}
</script>

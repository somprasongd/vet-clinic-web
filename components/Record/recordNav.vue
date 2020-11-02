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
        v-model="select"
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
        @keypress.enter="sendValue"
      ></v-select>
      <v-text-field
        v-model="search"
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
  data() {
    return {
      select: { label: 'บ้านเลขที่', value: 'houseNo' },
      search: '',
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
  watch: {
    search() {
      // this.$auth.$storage.setLocalStorage('search', this.search, false)
      localStorage.search = this.search
      // this.sendValue()
    },
    select() {
      // this.$auth.$storage.setLocalStorage('select', this.select, false)
      localStorage.setItem('select', JSON.stringify(this.select))
      this.sendValue()
    },
  },
  mounted() {
    // this.search = this.$auth.$storage.getState('searchHis')
    if (localStorage.getItem('select') !== null)
      this.select = JSON.parse(localStorage.getItem('select'))
    if (localStorage.search !== undefined) this.search = localStorage.search
  },
  methods: {
    sendValue() {
      this.$emit('search', [this.select.value, this.search])
    },
  },
}
</script>

<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="dessert"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  // props: {
  //   selectedType: {
  //     type: String,
  //     required: true,
  //   },
  //   dessert: {
  //     type: Array,
  //     required: false,
  //   }
  // },
  data() {
    return {
      offset: false,
      dialog: false,
      headers: [
        {
          text: 'วันที่นัด',
          value: 'date',
          align: 'left',
          width: '',
          sortable: false,
        },
        {
          text: 'ประเภทการนัด',
          value: 'type',
          align: 'left',
          width: '',
          sortable: false,
        },
        {
          text: 'รายละเอียด',
          value: 'detail',
          align: 'left',
          width: '',
          sortable: false,
        },
      ],
      dessert: [
        {
          date: '19/08/2020',
          type: 'ทำหมัน',
          detail: 'รอการนัด',
        },
        {
          date: '05/11/2020',
          type: 'ติดตามอาการ',
          detail: 'รอการนัด',
        },
      ],
    }
  },
}
</script>

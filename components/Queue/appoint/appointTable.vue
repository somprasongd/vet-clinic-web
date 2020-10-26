<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="appoint"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <template v-slot:[`item.appointDate`]="{ item }">
        {{ $moment(item.appointDate).format('DD/MM/YYYY') }}
      </template>
      <template v-slot:[`item.doctor`]="{ item }">
        {{ item.doctor !== null ? item.doctor.name : '' }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    appoint: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      offset: false,
      dialog: false,
      headers: [
        {
          text: 'วันที่นัด',
          value: 'appointDate',
          align: 'left',
          width: '100',
          sortable: false,
        },
        {
          text: 'เวลาที่นัด',
          value: 'appointTime',
          align: 'left',
          width: '100',
          sortable: false,
        },
        {
          text: 'แพทย์',
          value: 'doctor',
          align: 'left',
          width: '300',
          sortable: false,
        },
        {
          text: 'สาเหตุ',
          value: 'cause',
          align: 'left',
          width: '',
          sortable: false,
        },
        {
          text: 'หมายเหตุ',
          value: 'remark',
          align: 'left',
          width: '',
          sortable: false,
        },
      ],
    }
  },
}
</script>

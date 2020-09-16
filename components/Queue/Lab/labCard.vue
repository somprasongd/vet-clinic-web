<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="desserts"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 110px)"
    >
      <template v-slot:[`item.result`]="props">
        <v-edit-dialog :return-value.sync="props.item.result">
          <span class="cusblue--text">
            {{ props.item.result }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.result"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.normal`]="{ item }">
        <span v-if="/^[0-9]*$/.test(item.result)">
          {{ item.normal }}
        </span>
      </template>

      <template v-slot:[`item.tranresult`]="{ item }">
        <v-row v-if="/^[0-9]*$/.test(item.result)" no-gutters>
          <v-col cols="4">{{ toStat(item.tranresult) }}</v-col>
          <v-col cols="8">
            <labResult :num="item.tranresult" />
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import labResult from '@/components/Items/labResult'
export default {
  components: {
    labResult,
  },
  data() {
    return {
      headers: [
        {
          text: 'รายการ',
          value: 'list',
          align: 'left',
          width: '180',
          sortable: false,
        },
        {
          text: 'ชื่อแล็บ',
          value: 'lab',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ผล',
          value: 'result',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'หน่วย',
          value: 'unit',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ค่าปกติ',
          value: 'normal',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'แปลผล',
          value: 'tranresult',
          align: 'left',
          width: '270',
          sortable: false,
        },
      ],
      desserts: [
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: 'im text',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 1,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 2,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 3,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 4,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 5,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 2,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 3,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 4,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 1,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 2,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 3,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 4,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 1,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 2,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 3,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 4,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 1,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 2,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 3,
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          lab: 'ยา',
          result: '10',
          unit: 'เม็ด',
          normal: '50',
          tranresult: 4,
        },
      ],
    }
  },
  methods: {
    toStat(num) {
      switch (num) {
        case 1:
          return 'Low'
        case 2:
          return 'Nomal Low'
        case 3:
          return 'Nomal'
        case 4:
          return 'Nomal High'
        case 5:
          return 'High'
        default:
          // console.log(num)
          break
      }
    },
  },
}
</script>

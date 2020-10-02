<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="dataTable"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <template v-slot:[`item.id`]="{ item }">
        <div class="text-center">
          {{ orderNum(dataTable, item.id) }}
        </div>
      </template>
      <template v-slot:[`item.pet`]="{ item }">
        <div>{{ item.pet.name + ' (' + item.pet.type + ')' }}</div>
      </template>
      <template v-slot:[`item.time`]="{ item }">
        <div>{{ $moment(item.status.time).fromNow() }}</div>
      </template>
      <template v-slot:[`item.important`]="{ item }">
        <div>{{ item.status.important }}</div>
      </template>
      <template v-slot:[`item.doctor`]="{ item }">
        <div>{{ item.status.doctor }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status.status)" dark small label>
          {{ item.status.status }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu :offset-x="offset" nudge-left="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="cusblue2"
              dark
              v-bind="attrs"
              icon
              depressed
              v-on="on"
            >
              <v-icon>mdi-dots-horizontal-circle</v-icon>
            </v-btn>
          </template>

          <v-list width="200">
            <v-list-item>
              <h4>Action</h4>
            </v-list-item>
            <v-divider></v-divider>
            <v-btn
              v-for="btn in changeAction(item.status.status)"
              :key="btn.text"
              class="cusblue2--text"
              :disabled="btn.disable"
              block
              text
              tile
              @click="clickAction(item.id, item.status.status, btn.action)"
              >{{ btn.text }}</v-btn
            >
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    selectedType: {
      type: String,
      required: true,
    },
    dessert: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      offset: false,
      dialog: false,
      headers: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
          class: 'font-weight-bold',
        },
        { text: 'เจ้าของ', value: 'name' },
        { text: 'สัตว์เลี้ยง', value: 'pet' },
        { text: 'ระยะเวลา', value: 'time' },
        { text: 'ความสำคัญ', value: 'important' },
        { text: 'แพทย์', value: 'doctor' },
        { text: 'สถานะ', value: 'status', align: 'left' },
        { text: 'Action', value: 'action', align: 'center', sortable: false },
      ],
      actionBtn: {
        none: [{ text: 'None', action: 1, disable: true }],
        OPD_Wait: [
          { text: 'เข้ารับการตรวจ', action: 1 },
          { text: 'ยกเลิกการรักษา', action: 0 },
        ],
        OPD_Check: [
          { text: 'จบการรักษา', action: 1 },
          { text: 'ยกเลิกการรักษา', action: 0 },
        ],
        OPD_result: [
          { text: 'เข้ารับการตรวจ', action: 1 },
          { text: 'จบการรักษา', action: 0 },
        ],
        IPD_admit: [
          { text: 'จบการรักษา', action: 1 },
          { text: 'ยกเลิกการรักษา', action: 0 },
        ],
        deposit: [
          { text: 'รับกลับบ้าน', action: 1 },
          { text: 'ยกเลิกฝากเลี้ยง', action: 0 },
        ],
      },
    }
  },
  computed: {
    // โชว์ข้อมูลในตารางตาม ประเภทการตรวจ
    dataTable() {
      const dataTable = []
      for (const data in this.dessert) {
        if (this.dessert[data].status.type === this.selectedType) {
          dataTable.push(this.dessert[data])
        }
      }
      return dataTable
    },
  },
  methods: {
    orderNum(data, id) {
      return (
        data
          .map(function (x) {
            return x.id
          })
          .indexOf(id) + 1
      )
    },
    // ใช้เปลี่ยนสี Status
    getColor(status) {
      if (status === 'กำลังตรวจ') return 'rgb(255, 191, 72)'
      else if (status === 'รอผลตรวจ') return 'rgb(79, 155, 255)'
      else if (status === 'รอชำระเงิน') return 'rgb(87, 243, 87)'
      else return 'rgb(255, 98, 98)'
    },
    // getIcon (status) {
    //   if (status === 'กำลังตรวจ') return 'mdi-alarm-light'
    //   else if (status === 'รอผลตรวจ') return 'mdi-file-document'
    //   else if (status === 'รอชำระเงิน') return 'mdi-cash-usd'
    //   else return 'mdi-timelapse'
    // },
    clickAction(id, state, btn) {
      switch (this.selectedType) {
        case 'OPD':
          switch (state) {
            case 'รอตรวจ':
              switch (btn) {
                case 1:
                  this.$router.push('/queue/' + id + '/check')
                  break
                default:
                  alert('noooo')
              }
              break
            case 'กำลังตรวจ':
              switch (btn) {
                case 1:
                  alert('success')
                  break
                default:
                  alert('noooo')
              }
              break
            case 'รอผลตรวจ':
              switch (btn) {
                case 1:
                  alert('success')
                  break
                default:
                  alert('noooo')
              }
              break
            default:
              switch (btn) {
                case 1:
                  alert('success')
                  break
                default:
                  alert('noooo')
              }
          }
          break
        case 'IPD':
          if (state === 'Admit') {
            switch (btn) {
              case 1:
                alert('success')
                break
              default:
                alert('noooo')
            }
          }
          break
        case 'ฝากเลี้ยง':
          if (state === 'ฝากเลี้ยง') {
            switch (btn) {
              case 1:
                alert('success')
                break
              default:
                alert('noooo')
            }
          }
      }
    },
    // เปลี่ยนปุ่ม Action ตามประเภทการตรวจ และสถานะ
    changeAction(state) {
      switch (this.selectedType) {
        case 'OPD':
          switch (state) {
            case 'รอตรวจ':
              return this.actionBtn.OPD_Wait
            case 'กำลังตรวจ':
              return this.actionBtn.OPD_Check
            case 'รอผลตรวจ':
              return this.actionBtn.OPD_result
            default:
              return this.actionBtn.none
          }
        case 'IPD':
          switch (state) {
            case 'Admit':
              return this.actionBtn.IPD_admit
            default:
              return this.actionBtn.none
          }
        case 'ฝากเลี้ยง':
          switch (state) {
            case 'ฝากเลี้ยง':
              return this.actionBtn.deposit
            default:
              return this.actionBtn.none
          }
      }
    },
  },
}
</script>

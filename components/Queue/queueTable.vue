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
      <template v-slot:[`item.id`]="{ item }">
        <div class="text-center">
          {{ orderNum(dessert, item.id) }}
        </div>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <div>{{ item.pet.owner.name }}</div>
      </template>
      <template v-slot:[`item.pet`]="{ item }">
        <div>{{ item.pet.name + ' (' + item.pet.type + ')' }}</div>
      </template>
      <template v-slot:[`item.time`]="{ item }">
        <div>{{ $moment(item.visitAt).fromNow() }}</div>
      </template>
      <template v-slot:[`item.important`]="{ item }">
        <div>{{ item.visitPriority.label }}</div>
      </template>
      <template v-slot:[`item.doctor`]="{ item }">
        <div>{{ item.doctor !== null ? item.doctor.name : '' }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.visitStatus.id)" dark small label>
          {{ item.visitStatus.label }}
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
              v-for="btn in getActionMenu(
                item.visitType.id,
                item.visitStatus.id
              )"
              :key="btn.text"
              class="cusblue2--text"
              :disabled="btn.disable"
              block
              text
              tile
              @click="
                clickAction(
                  item.visitType.id,
                  item.visitStatus.id,
                  btn.action,
                  item.id
                )
              "
            >
              {{ btn.text }}
            </v-btn>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    // selectedType: {
    //   type: String,
    //   required: true,
    // },
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
        { text: 'เจ้าของ', value: 'name', sortable: false },
        { text: 'สัตว์เลี้ยง', value: 'pet', sortable: false },
        { text: 'ระยะเวลา', value: 'time', sortable: false },
        { text: 'ความสำคัญ', value: 'important', sortable: false },
        { text: 'แพทย์', value: 'doctor', sortable: false },
        { text: 'สถานะ', value: 'status', align: 'left', sortable: false },
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
    //
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
      if (status === 1) return 'rgb(255, 98, 98)'
      else if (status === 2) return 'rgb(255, 191, 72)'
      else if (status === 3) return 'rgb(79, 155, 255)'
      else if (status === 9) return 'rgb(255, 145, 98)'
      else return 'rgb(87, 243, 87)'
    },
    getActionMenu(type, status) {
      switch (type) {
        case 1:
          switch (status) {
            case 1:
              return this.actionBtn.OPD_Wait // 'OPD รอตรวจ'
            case 2:
              return this.actionBtn.OPD_Check // 'OPD ตรวจรักษา'
            case 3:
              return this.actionBtn.OPD_result // 'OPD รอผลตรวจ'
            default:
              return this.actionBtn.none // 'OPD รอชำระเงิน'
          }
        case 2:
          switch (status) {
            case 4:
              return this.actionBtn.IPD_admit // 'IPD รายงานผล'
            default:
              return this.actionBtn.none // 'IPD รอชำระเงิน'
          }
        default:
          switch (status) {
            case 9:
              return this.actionBtn.deposit // 'ฝากเลี้ยง ฝากเลี้ยง'
            default:
              console.log(status)
              return this.actionBtn.none // 'ฝากเลี้ยง รอชำระเงิน'
          }
      }
    },
    clickAction(type, state, btn, id) {
      switch (type) {
        case 1:
          switch (state) {
            // 'OPD รอตรวจ'
            case 1:
              switch (btn) {
                case 1:
                  this.$router.push('/queue/' + id + '/check')
                  break
                default:
                  alert('noooo')
              }
              break
            // 'OPD ตรวจรักษา'
            case 2:
              switch (btn) {
                case 1:
                  alert('success')
                  break
                default:
                  alert('noooo')
              }
              break
            // 'OPD รอผลตรวจ'
            case 3:
              switch (btn) {
                case 1:
                  alert('success')
                  break
                default:
                  alert('noooo')
              }
              break
            // 'OPD รอชำระเงิน'
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
        case 2:
          if (state === 4) {
            switch (btn) {
              // 'IPD รายงานผล'
              case 1:
                alert('success')
                break
              // 'IPD รอชำระเงิน'
              default:
                alert('noooo')
            }
          }
          break
        case 3:
          if (state === 9) {
            switch (btn) {
              // 'ฝากเลี้ยง ฝากเลี้ยง'
              case 1:
                alert('success')
                break
              // 'ฝากเลี้ยง รอชำระเงิน'
              default:
                alert('noooo')
            }
          }
      }
    },
  },
}
</script>

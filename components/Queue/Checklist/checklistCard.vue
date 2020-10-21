<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="orderItem"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 210px)"
      fixed-header
      :hide-default-header="this.$vuetify.breakpoint.xsOnly"
    >
      <template v-slot:[`item.qty`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.qty"
          @save="saveQTY(props.item.id, props.item.qty)"
        >
          <span class="cusblue--text">
            {{ props.item.qty }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.qty"
              :rules="rules"
              label="Edit"
              single-line
              counter
              @keypress="isNumber($event)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.price`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.price"
          @save="savePrice(props.item.id, props.item.price)"
        >
          <span class="cusblue--text">
            {{ props.item.price }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.price"
              :rules="rules"
              label="Edit"
              single-line
              counter
              @keypress="isNumber($event)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="item.typeId === 1"
          icon
          x-small
          @click="openDrugDialog(item.id)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon x-small @click="delOrder(item.id)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>

      <template v-slot:[`footer`]>
        <div class="pa-1 text-right" style="border-top: 1px solid #dadada">
          <v-btn
            v-if="visitData.visitStatus.id === 2"
            class="cusblue3 font-weight-regular text-capitalize float-left"
            depressed
            dark
            @click="endCheck($route.params.queue, 3)"
          >
            รอผลตรวจ
          </v-btn>
          <v-btn
            v-if="visitData.visitStatus.id === 6"
            class="cusblue3 font-weight-regular text-capitalize"
            depressed
            dark
          >
            รับชำระเงิน
          </v-btn>
          <div v-else class="pa-2 font-weight-medium">
            <span>ราคารวม : {{ sumPrice }} บาท</span>
          </div>
        </div>
      </template>

      <template v-slot:top>
        <checkListNav @add="addOrder" />
      </template>
    </v-data-table>
    <drugDialog ref="drugDialog" />
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import checkListNav from '@/components/Queue/Checklist/checkListNav'
import drugDialog from '@/components/Queue/Checklist/drugDialog'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    checkListNav,
    drugDialog,
    confirmDialog,
  },
  props: {
    visitData: {
      default: null,
      type: Object,
      required: false,
    },
    orderItem: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      confirmDel: false,
      headers: [
        {
          text: 'รายการ',
          value: 'itemLabel',
          align: 'left',
          width: '180',
          sortable: false,
        },
        {
          text: 'ประเภท',
          value: 'typeLabel',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'จำนวน',
          value: 'qty',
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
          text: 'ราคาต่อหน่วย',
          value: 'price',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'Action',
          value: 'action',
          align: 'center',
          width: '',
          sortable: false,
        },
      ],
      qty: '',
      rules: [(v) => (v && /^[0-9]*$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น'],
    }
  },
  computed: {
    sumPrice() {
      let sum = 0
      this.orderItem.map((item) => {
        return (sum += item.price * item.qty)
      })
      return sum
    },
  },
  methods: {
    openDrugDialog(id) {
      this.$refs.drugDialog.open(id)
    },
    addOrder(res) {
      this.$emit('add', res)
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    delOrder(id) {
      this.$refs.confirm
        .open(`คุณแน่ใจหรือไม่?`, `คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้`, {
          width: 290,
          color: 'red',
        })
        .then((confirm) => {
          this.$axios
            .$delete(`/api/visits/${this.$route.params.queue}/orders/${id}`, {
              progress: false,
            })
            .then((res) => {
              this.$emit('delete', id)
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
    },
    saveQTY(id, value) {
      const sendQTY = {
        qty: value,
      }
      this.$axios
        .$patch(
          `/api/visits/${this.$route.params.queue}/orders/${id}`,
          sendQTY,
          { progress: false }
        )
        .catch((error) => {
          alert(error)
        })
    },
    savePrice(id, value) {
      const sendPrice = {
        price: value,
      }
      this.$axios
        .$patch(
          `/api/visits/${this.$route.params.queue}/orders/${id}`,
          sendPrice,
          { progress: false }
        )
        .catch((error) => {
          alert(error)
        })
    },
    endCheck(id, status) {
      this.$refs.confirm
        .open(`ยืนยันการรอผลตรวจ?`, `ต้องการยืนยันการรอผลตรวจใช่หรือไม่`, {
          width: 290,
          color: 'primary',
        })
        .then((confirm) => {
          this.$axios
            .$patch(
              `/api/visits/${id}`,
              { visitStatusId: status },
              { progress: false }
            )
            .then((res) => {
              this.$router.push(`/queue`)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

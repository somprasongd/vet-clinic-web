<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="posQueue"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 160px)"
      fixed-header
    >
      <template v-slot:[`item.id`]="{ item }">
        <div class="text-center">
          {{ orderNum(posQueue, item.id) }}
        </div>
      </template>
      <template v-slot:[`item.state`]="{ item }">
        <div class="text-center">
          <v-chip :color="getColor(item.state)" dark small label>
            {{ item.state }}
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.refNumber`]="{ item }">
        <div class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none text-truncate"
            :to="'/pos/' + item.id"
          >
            {{ item.receiptNumber || item.posNumber }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon>
          </nuxt-link>
        </div>
      </template>
      <template v-slot:[`item.user`]="{ item }">
        {{ item.receiptBy || item.createBy }}
      </template>
      <template v-slot:[`item.createAt`]="{ item }">
        {{
          $moment(item.receiptAt || item.createAt).format('DD/MM/YYYY HH:mm:ss')
        }}
      </template>
      <template v-slot:[`item.netPrice`]="{ item }">
        {{
          item.netPrice ? new Intl.NumberFormat().format(item.netPrice) : '-'
        }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          :disabled="item.state === 'cancel' || item.state === 'success'"
          icon
          depressed
          x-small
          @click="delPOS(item.id)"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    confirmDialog,
  },
  props: {
    posQueue: {
      type: Array,
      required: false,
      default: null,
    },
    state: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      confirmDel: false,
      checkout: false,
      headers: [
        {
          text: 'ลำดับ',
          value: 'id',
          align: 'center',
          width: '100',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'หมายเลขอ้างอิง',
          value: 'refNumber',
          align: 'center',
          width: '150',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'ผู้ทำรายการ',
          value: 'user',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ลูกค้า',
          value: 'customer',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ทำรายการเมื่อ',
          value: 'createAt',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'สถานะ',
          value: 'state',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'จำนวนเงินสุทธิ',
          value: 'netPrice',
          align: 'right',
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
    }
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
    async delPOS(id) {
      const confirm = await this.$refs.confirm.open(
        `คุณแน่ใจหรือไม่?`,
        `คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้`,
        {
          width: 290,
          color: 'red',
        }
      )

      if (!confirm) {
        return
      }
      try {
        await this.$axios.$delete(`/api/pos/${id}`, { progress: false })
        this.$emit('deletePOS', id)
      } catch (error) {
        alert(error)
      }
    },
    getColor(status) {
      if (status === 'cancel') return 'rgb(255, 98, 98)'
      else if (status === 'pending') return 'rgb(255, 191, 72)'
      else return 'rgb(87, 243, 87)'
    },
  },
}
</script>

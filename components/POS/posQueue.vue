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
      <template v-slot:[`item.posNumber`]="{ item }">
        <div class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none text-truncate"
            :to="'/pos/' + item.id"
          >
            {{ item.posNumber }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon>
          </nuxt-link>
        </div>
      </template>
      <template v-slot:[`item.createAt`]="{ item }">
        {{ $moment(item.createAt).format('DD/MM/YYYY') }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          :disabled="item.state === 'cancel'"
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
          text: 'POS Number',
          value: 'posNumber',
          align: 'center',
          width: '150',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Create AT',
          value: 'createAt',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'State',
          value: 'state',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'Receipt No',
          value: 'receiptNumber',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'Final Price',
          value: 'finalPrice',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'Remark',
          value: 'remark',
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
    delPOS(id) {
      this.$refs.confirm
        .open(`คุณแน่ใจหรือไม่?`, `คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้`, {
          width: 290,
          color: 'red',
        })
        .then((confirm) => {
          this.$axios
            .$delete(`/api/pos/${id}`, { progress: false })
            .then((res) => {
              this.$emit('deletePOS', id)
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
    },
    getColor(status) {
      if (status === 'cancel') return 'rgb(255, 98, 98)'
      else if (status === 'pending') return 'rgb(255, 191, 72)'
      else return 'rgb(87, 243, 87)'
    },
  },
}
</script>
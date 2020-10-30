<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="orderItem"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 210px)"
      fixed-header
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
        <div class="pa-2 text-right" style="border-top: 1px solid #dadada">
          <span class="font-weight-medium">ยอดรวมชำระ :</span>
          <span>x,xxx บาท</span>
          <v-btn
            color="cusblue3"
            class="ml-5"
            dark
            depressed
            @click.stop="checkout = true"
          >
            รับชำระ
          </v-btn>

          <v-dialog v-model="checkout" max-width="700">
            <v-card>
              <v-data-table
                class="elevation-0 overflow-y-auto"
                style="max-height: 550px"
                :headers="headersDialog"
                :items="orderItem"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:[`item.action`]>
                  <v-checkbox
                    height="0"
                    class="pl-10"
                    color="green"
                    on-icon="mdi-check-circle"
                    off-icon="mdi-check-circle-outline"
                  ></v-checkbox>
                </template>
              </v-data-table>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cusblue2" text @click="checkout = false">
                  ยกเลิก
                </v-btn>

                <v-btn color="cusblue2" text @click="checkout = false">
                  ตกลง
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    orderItem: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      confirmDel: false,
      checkout: false,
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
      headersDialog: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
          width: '100',
          class: 'font-weight-bold',
        },
        { text: 'ชื่อรายการ', value: 'itemLabel', sortable: false },
        { text: 'ประเภท', value: 'typeLabel', sortable: false },
        {
          text: 'ราคา / หน่วย',
          value: 'price',
          align: 'center',
          sortable: false,
        },
        { text: 'Action', value: 'action', align: 'center', sortable: false },
      ],
      rules: [
        (v) =>
          (v && /^[0-9]*\.?[0-9]{1,2}$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
    }
  },
  methods: {
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    saveQTY(id, value) {
      const sendQTY = {
        qty: value,
      }
      this.$axios
        .$patch(`/api/orders/${id}`, sendQTY, { progress: false })
        .catch((error) => {
          alert(error)
        })
    },
    savePrice(id, value) {
      const sendPrice = {
        price: value,
      }
      this.$axios
        .$patch(`/api/orders/${id}`, sendPrice, { progress: false })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>

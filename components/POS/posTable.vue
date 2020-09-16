<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="desserts"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 210px)"
      fixed-header
    >
      <template v-slot:[`item.num`]="props">
        <v-edit-dialog :return-value.sync="props.item.num">
          <span class="cusblue--text">
            {{ props.item.num }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.num"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.price`]="props">
        <v-edit-dialog :return-value.sync="props.item.price">
          <span class="cusblue--text">
            {{ props.item.price }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.price"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.action`]>
        <v-btn icon depressed @click="confirmDel = true">
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
            >รับชำระ</v-btn
          >

          <v-dialog v-model="checkout" max-width="700">
            <v-card>
              <v-data-table
                class="elevation-0 overflow-y-auto"
                style="max-height: 550px"
                :headers="headersDialog"
                :items="desserts"
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
                <v-btn color="cusblue2" text @click="checkout = false"
                  >ยกเลิก</v-btn
                >

                <v-btn color="cusblue2" text @click="checkout = false"
                  >ตกลง</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="confirmDel" max-width="290">
      <v-card>
        <h2 class="pl-6 pt-3 pb-2">คุณแน่ใจหรือไม่?</h2>

        <v-card-text> คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้ </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="confirmDel = false"> ลบ </v-btn>

          <v-btn color="grey" text @click="confirmDel = false"> ยกเลิก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDel: false,
      checkout: false,
      headers: [
        {
          text: 'ลำดับ',
          value: 'id',
          align: 'center',
          width: '150',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'ชื่อรายการ',
          value: 'nameList',
          align: 'left',
          width: '400',
          sortable: false,
        },
        {
          text: 'ประเภท',
          value: 'type',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'จำนวน',
          value: 'num',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ราคา / หน่วย',
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
          class: 'font-weight-bold',
        },
        { text: 'ชื่อรายการ', value: 'nameList', sortable: false },
        { text: 'ประเภท', value: 'type', sortable: false },
        {
          text: 'ราคา / หน่วย',
          value: 'price',
          align: 'center',
          sortable: false,
        },
        { text: 'Action', value: 'action', align: 'center', sortable: false },
      ],
      desserts: [
        {
          id: '1',
          nameList: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          price: '50',
        },
        {
          id: '2',
          nameList: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          price: '50',
        },
        {
          id: '3',
          nameList: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          price: '50',
        },
        {
          id: '4',
          nameList: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          price: '50',
        },
        {
          id: '5',
          nameList: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          price: '50',
        },
      ],
    }
  },
}
</script>

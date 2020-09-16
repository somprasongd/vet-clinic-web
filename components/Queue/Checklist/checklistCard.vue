<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="desserts"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 210px)"
      fixed-header
      :hide-default-header="this.$vuetify.breakpoint.xsOnly"
    >
      <!-- <template v-slot:[`item.num`]="{ item }">
            <v-text-field
                class="short-textfild"
                v-model="item.num"
                solo
                dense
                hide-details
                flat
            ></v-text-field>
        </template> -->
      <template v-slot:[`item.num`]="props">
        <!-- @save=""
            @cancel=""
            @open=""
            @close="" -->
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

      <template v-slot:[`item.action`]>
        <v-btn icon x-small><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon x-small @click="confirmDel = true"
          ><v-icon>mdi-trash-can</v-icon></v-btn
        >
      </template>

      <template v-slot:[`footer`]>
        <div
          class="pa-3 font-weight-medium text-right"
          style="border-top: 1px solid #dadada"
        >
          <span>ราคารวม : 500 บาท</span>
        </div>
      </template>

      <template v-slot:top>
        <checkListNav />
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
import checkListNav from '@/components/Queue/Checklist/checkListNav'
export default {
  components: {
    checkListNav,
  },
  data() {
    return {
      confirmDel: false,
      headers: [
        {
          text: 'รายการ',
          value: 'list',
          align: 'left',
          width: '180',
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
      desserts: [
        {
          list: 'XXXXXXXXXXXXXXXX',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
        {
          list: 'XXXXXXXXXXXXXXXXx',
          type: 'ยา',
          num: '10',
          unit: 'เม็ด',
          price: '50',
        },
      ],
    }
  },
}
</script>

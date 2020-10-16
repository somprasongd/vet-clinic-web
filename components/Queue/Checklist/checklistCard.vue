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
            <span>ราคารวม : 500 บาท</span>
          </div>
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
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import checkListNav from '@/components/Queue/Checklist/checkListNav'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    checkListNav,
    confirmDialog,
  },
  props: {
    visitData: {
      default: null,
      type: Object,
      required: false,
    },
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
  methods: {
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

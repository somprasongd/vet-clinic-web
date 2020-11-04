<template>
  <div>
    <v-data-table
      class="elevation-4 hidden-header"
      :headers="headers"
      :items="orderItem"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 210px)"
      fixed-header
    >
      <template v-slot:[`item.qty`]="props">
        <v-edit-dialog
          v-if="posData.state !== 'success' && posData.state !== 'cancel'"
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
        <span v-else>{{ props.item.qty }}</span>
      </template>

      <template v-slot:[`item.price`]="props">
        <v-edit-dialog
          v-if="posData.state !== 'success' && posData.state !== 'cancel'"
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
        <span v-else>{{ props.item.price }}</span>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          v-if="item.typeId === 1"
          :disabled="
            posData === null || posData.state === 'active' ? false : true
          "
          icon
          x-small
          @click="openDrugDialog(item.id)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          x-small
          :disabled="
            posData === null || posData.state === 'active' ? false : true
          "
          @click="delOrder(item.id)"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>

      <template v-slot:[`footer`]>
        <div
          v-if="$route.params.posid !== undefined"
          class="pa-2"
          style="border-top: 1px solid #dadada"
        >
          <v-row no-gutters align="center" justify="space-between">
            <v-btn
              v-if="posData.state === 'active'"
              class="font-weight-regular text-capitalize"
              color="orange accent-2"
              depressed
              dark
              @click="updateState($route.params.posid, 'pending')"
            >
              พักรายการ
            </v-btn>
            <div v-else-if="posData.state === 'pending'">
              <v-btn
                class="font-weight-regular text-capitalize"
                color="green lighten-1"
                depressed
                dark
                @click="updateState($route.params.posid, 'active')"
              >
                ทำต่อ
              </v-btn>
              <v-btn
                class="font-weight-regular text-capitalize"
                color="red accent-2"
                depressed
                dark
                @click="updateState($route.params.posid, 'cancel')"
              >
                ลบ
              </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="font-weight-medium" style="display: inline-block">
              <span>ราคารวม : {{ sumPrice }} บาท</span>
              <v-btn
                v-if="posData.state === 'active'"
                class="font-weight-regular text-capitalize ml-2"
                color="cusblue3 white--text"
                :disabled="orderItem.length === 0"
                depressed
                @click="finalDialog($route.params.posid)"
              >
                สรุปยอด
              </v-btn>
              <v-btn
                v-else-if="posData.state === 'success'"
                class="cusblue3 font-weight-regular text-capitalize ml-2"
                depressed
                dark
                @click="getReceipt($route.params.posid)"
              >
                พิมพ์
              </v-btn>
            </div>
          </v-row>
        </div>
        <div
          v-else
          class="pa-1 text-right"
          style="border-top: 1px solid #dadada"
        >
          <v-row no-gutters align="center" justify="space-between">
            <v-btn
              v-if="visitData !== null && visitData.visitStatus.id === 2"
              class="cusblue3 font-weight-regular text-capitalize"
              depressed
              dark
              @click="endCheck($route.params.queue, 3)"
            >
              รอผลตรวจ
            </v-btn>
            <v-spacer v-else></v-spacer>
            <div class="font-weight-medium" style="display: inline-block">
              <span>ราคารวม : {{ sumPrice }} บาท</span>
            </div>
          </v-row>
        </div>
      </template>

      <template v-slot:top>
        <checkListNav
          :disabled="
            posData === null || posData.state === 'active' ? false : true
          "
          :order-item="orderItem"
          @add="addOrder"
        />
      </template>
    </v-data-table>
    <drugDialog ref="drugDialog" />
    <confirmDialog ref="confirm" />
    <calcDialog ref="calcDialog" @updateState="printReceipt" />
    <div v-if="showPrint" id="printMe">
      <div class="bill">
        <div class="top">
          <span>
            {{ $moment().format('DD/MM/YYYY') }}
          </span>
          <span>Vet Clinic</span>
        </div>
        <div class="head">
          <b style="font-size: 16px">{{ receiptDetail.clinicName }}</b>
          <br />
          <b> สาขา {{ receiptDetail.branchName }} </b>
          <br />
          <b>ที่อยู่ {{ receiptDetail.address }}</b>
          <br />
          <b>Tel: {{ receiptDetail.phone }}</b>
          <br />
        </div>
        <div class="body">
          <span>หมายเลขใบเสร็จ {{ receiptDetail.receiptNumber }}</span>
          <br />
          <span>
            {{
              $moment(receiptDetail.createAt).format(
                'เมื่อวันที่ DD/MM/YYYY เวลา HH:mm:ss'
              )
            }}
          </span>
          <br />
          <div class="top">
            <span>{{ receiptDetail.customer }}</span>
            <span>{{ receiptDetail.createBy }}</span>
          </div>
          <table>
            <tr>
              <th>#</th>
              <th>รายการ</th>
              <th style="text-align: right">ราคา</th>
            </tr>
            <tr
              v-for="(item, i) in receiptDetail.details.groups"
              :key="item.name"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ item.name }}</td>
              <td style="text-align: right">
                {{ parseFloat(item.price).toFixed(2) }}
              </td>
            </tr>
          </table>
          <div>
            <hr />
            <v-row no-gutters>
              <span class="col-10" style="text-align: right">ส่วนลด</span>
              <span class="col-2" style="text-align: right">
                {{ parseFloat(receiptDetail.discount).toFixed(2) }}
              </span>
            </v-row>
          </div>
          <div>
            <hr />
            <v-row no-gutters>
              <span class="col-10" style="text-align: right">ยอดชำระรวม</span>
              <span class="col-2" style="text-align: right">
                {{ parseFloat(receiptDetail.salesPrice).toFixed(2) }}
              </span>
            </v-row>
            <div v-if="receiptDetail.paymentType === 'เงินสด'">
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">เงินสด</span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.cash).toFixed(2) }}
                </span>
              </v-row>
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">เงินทอน</span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.change).toFixed(2) }}
                </span>
              </v-row>
            </div>
            <div v-else-if="receiptDetail.paymentType === 'เครดิตการ์ด'">
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">บัตรเครดิต</span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.salesPrice).toFixed(2) }}
                </span>
              </v-row>
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">
                  ค่าธรรมเนียม
                </span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.creditCardFees).toFixed(2) }}
                </span>
              </v-row>
            </div>
            <div v-else-if="receiptDetail.paymentType === 'โอนเงิน'">
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">ยอดโอน</span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.salesPrice).toFixed(2) }}
                </span>
              </v-row>
              <v-row no-gutters>
                <span class="col-10" style="text-align: right">
                  ค่าธรรมเนียม
                </span>
                <span class="col-2" style="text-align: right">
                  {{ parseFloat(receiptDetail.creditCardFees).toFixed(2) }}
                </span>
              </v-row>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkListNav from '@/components/Queue/Checklist/checkListNav'
import drugDialog from '@/components/Queue/Checklist/drugDialog'
import confirmDialog from '@/components/Items/confirmDialog'
import calcDialog from '@/components/POS/calcDialog'

import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
    'width=1000,height=600',
  ],
  styles: [
    window.location.origin + '/receipt.css',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
  ],
}
Vue.use(VueHtmlToPaper, options)

export default {
  components: {
    checkListNav,
    drugDialog,
    confirmDialog,
    calcDialog,
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
    posData: {
      type: Object,
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
      rules: [
        (v) =>
          (v && /^[0-9]*\.?[0-9]{1,2}$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
      showPrint: false,
      receiptDetail: null,
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
    finalDialog(item) {
      this.$refs.calcDialog.open(item)
    },
    updateStatePOS(state) {
      this.posData.state = state
    },
    updateState(id, states) {
      this.$refs.confirm
        .open(
          `คุณแน่ใจหรือไม่?`,
          `คุณแน่ใจหรือไม่ที่${
            states === 'active'
              ? 'ยกเลิกพัก'
              : states === 'active'
              ? 'ลบ'
              : 'พัก'
          }รายการนี้`,
          {
            width: 290,
            color:
              states === 'active'
                ? 'success'
                : states === 'cancel'
                ? 'red'
                : 'warning',
          }
        )
        .then((confirm) => {
          const state = {
            state: states,
          }
          if (states === 'cancel') {
            this.$axios
              .$delete(`/api/pos/${id}`, {
                progress: false,
              })
              .then((res) => {
                this.$router.push('/pos')
              })
              .catch((error) => {
                alert(error)
              })
          } else {
            this.$axios
              .$patch(`/api/pos/${id}`, state, {
                progress: false,
              })
              .then((res) => {
                states === 'pending'
                  ? this.$router.push('/pos')
                  : this.updateStatePOS('active')
              })
              .catch((error) => {
                alert(error)
              })
          }
        })
        .catch(() => {})
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
            .$delete(
              `/api${
                this.$route.params.queue !== undefined
                  ? `/visits/${this.$route.params.queue}`
                  : ''
              }/orders/${id}`,
              {
                progress: false,
              }
            )
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
          `/api${
            this.$route.params.queue !== undefined
              ? `/visits/${this.$route.params.queue}`
              : ''
          }/orders/${id}`,
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
          `/api${
            this.$route.params.queue !== undefined
              ? `/visits/${this.$route.params.queue}`
              : ''
          }/orders/${id}`,
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
              alert(error)
            })
        })
        .catch(() => {})
    },
    async getReceipt(id) {
      const receipt = await this.$axios.$get(`/api/pos/${id}/receipts`, {
        progress: false,
      })
      this.receiptDetail = receipt
      this.print()
    },
    printReceipt(val) {
      this.receiptDetail = val
      this.posData.receiptNumber = val.receiptNumber
      this.updateStatePOS('success')
      this.print()
    },
    print() {
      this.showPrint = true
      this.$nextTick(() => {
        this.$htmlToPaper('printMe', null, () => {
          // console.warn('done')
          this.showPrint = false
        })
      })
    },
  },
}
</script>

<style lang="scss">
.hidden-header .v-data-table-header-mobile {
  position: absolute;
  visibility: hidden;
}
</style>

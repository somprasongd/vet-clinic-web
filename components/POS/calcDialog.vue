<template>
  <div>
    <v-dialog v-model="assignModal" max-width="900" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">สรุปยอด</h2>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <div class="py-3 px-8">
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="sumPrice"
                  label="ยอดขาย"
                  color="cusblue2"
                  disabled
                  @keypress="isNumber($event)"
                >
                  <template v-slot:append>
                    <span class="mt-1">฿</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="endBill"
                  label="ส่วนลดท้ายบิล"
                  color="cusblue2"
                  @keypress="isNumber($event)"
                >
                  <template v-slot:append>
                    <span class="mt-1">฿</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payment"
                  label="ยอดชำระสุทธิ"
                  color="cusblue2"
                  disabled
                  @keypress="isNumber($event)"
                >
                  <template v-slot:append>
                    <span class="mt-1">฿</span>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-divider class="dash-divider"></v-divider>
          <div class="py-3 px-8">
            <v-row>
              <v-col cols="4">
                <v-card class="pt-3 text-center">
                  <h4>วิธีการชำระเงิน</h4>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col
                        v-for="type in paymentType"
                        :key="type.id"
                        cols="12"
                      >
                        <v-btn
                          color="cusblue3"
                          block
                          dark
                          depressed
                          :outlined="payType === type.id ? false : true"
                          @click="payType = type.id"
                        >
                          {{ type.label }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="8">
                <v-row v-if="payType === 2" dense>
                  <v-textarea
                    v-model="note"
                    color="cusblue"
                    label="Note"
                    auto-grow
                    row-height="24"
                    rows="1"
                  ></v-textarea>
                </v-row>
                <v-row v-else-if="payType === 3">
                  <!-- <v-col cols="12">
                    <v-select
                      v-model="credit.typeSelected"
                      :items="credit.type"
                      item-text="label"
                      item-value="id"
                      item-color="cusblue"
                      label="ประเภทบัตร"
                      dense
                      outlined
                    ></v-select>
                  </v-col> -->
                  <v-row dense>
                    <v-col v-for="type in credit.type" :key="type.id" cols="12">
                      <v-btn
                        color="cusblue3"
                        block
                        dark
                        depressed
                        :outlined="
                          credit.typeSelected === type.id ? false : true
                        "
                        @click="credit.typeSelected = type.id"
                      >
                        {{ type.label }}
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="credit.fee"
                      :hint="`ค่าธรรมเนียมบัตรเครดิต ฿${calcFee}`"
                      color="cusblue2"
                      persistent-hint
                      dense
                      @keypress="isNumber($event)"
                    >
                      <template v-slot:append>
                        <span class="mt-1">%</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="credit.followSelected"
                      :items="credit.follow"
                      label="การติดตามค่าธรรมเนียม"
                      item-text="label"
                      item-value="id"
                      item-color="cusblue"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="credit.number"
                      color="cusblue"
                      label="หมายเลขการโอน"
                      auto-grow
                      row-height="24"
                      rows="1"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row v-else dense>
                  <v-col cols="6">
                    <v-text-field
                      v-model="money.receive"
                      :rules="rules.receive"
                      label="เงินรับชำระ"
                      color="cusblue2"
                      dense
                      @keypress="isNumber($event)"
                    >
                      <template v-slot:append>
                        <span class="mt-1">฿</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="changeMoney"
                      label="เงินทอน"
                      color="cusblue2"
                      disabled
                      dense
                      @keypress="isNumber($event)"
                    >
                      <template v-slot:append>
                        <span class="mt-1">฿</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="9">
                    <v-row dense>
                      <v-col v-for="num in money.numPad" :key="num" cols="4">
                        <v-btn
                          color="cusblue3"
                          outlined
                          block
                          height="50"
                          @click="addNum(num)"
                        >
                          {{ num }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-row dense>
                      <v-col v-for="bank in money.bank" :key="bank" cols="12">
                        <v-btn
                          color="cusblue3"
                          outlined
                          block
                          height="38.3"
                          @click="plusNum(bank)"
                        >
                          +{{ bank }}฿
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-form>
        <v-card-actions style="border-top: 1px solid rgb(202, 201, 201)">
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="assignModal = false">
            ยกเลิก
          </v-btn>
          <v-btn color="cusblue2" :disabled="!valid" text @click="checkout(id)">
            ชำระเงิน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      id: '',
      order: [],

      endBill: '',
      payType: 1,
      paymentType: this.$store.state.form.paymentType,
      money: {
        receive: '',
        numPad: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'ลบ'],
        bank: [1000, 500, 100, 50, 20],
      },
      credit: {
        typeSelected: 1,
        type: this.$store.state.form.creditCard,
        fee: '3',
        followSelected: 1,
        follow: this.$store.state.form.creditFee,
        number: '',
      },
      note: '',

      valid: false,
      rules: {
        receive: [
          (v) => !!v || 'กรุณากรอกเงินชำระ',
          (v) =>
            (v && this.checkChange(v)) || 'กรุณากรอกจำนวนเงินที่มากกว่านี้',
        ],
      },
    }
  },
  computed: {
    sumPrice() {
      let sum = 0
      this.order.map((item) => {
        return (sum += item.price * item.qty)
      })
      return sum
    },
    lessPrice() {
      const money =
        parseFloat(this.sumPrice || 0) - parseFloat(this.endBill || 0)
      return money.toFixed(0).toString()
    },
    payment() {
      if (this.payType === 3 && this.credit.followSelected === 2) {
        const money =
          parseFloat(this.lessPrice || 0) + parseFloat(this.calcFee || 0)
        if (money >= 0) {
          this.setValid(true)
          return money.toFixed(1).toString()
        } else {
          this.setValid(false)
          return 'ไม่สามารถชำระเงิน'
        }
      } else {
        const money = parseFloat(this.lessPrice || 0)
        if (money >= 0) {
          this.setValid(true)
          return money.toFixed(0).toString()
        } else {
          this.setValid(false)
          return 'ไม่สามารถชำระเงิน'
        }
      }
    },
    changeMoney() {
      const money =
        parseFloat(this.money.receive || 0) - parseFloat(this.payment || 0)
      if (money >= 0) {
        this.setValid(true)
        return money.toFixed(2).toString()
      } else {
        this.setValid(false)
        return 'ไม่สามารถทอนเงิน'
      }
    },
    calcFee() {
      const fee =
        (parseFloat(this.lessPrice || 0) / 100) *
        parseFloat(this.credit.fee || 0)
      return fee.toFixed(2).toString()
    },
  },
  created() {
    if (this.$store.state.form.paymentType.length === 0) {
      this.$store.dispatch('form/addpaymentType').then((res) => {
        this.paymentType = res
      })
    }
    if (this.$store.state.form.creditCard.length === 0) {
      this.$store.dispatch('form/addcreditCard').then((res) => {
        this.credit.type = res
      })
    }
    if (this.$store.state.form.creditFee.length === 0) {
      this.$store.dispatch('form/addcreditFee').then((res) => {
        this.credit.follow = res
      })
    }
  },
  methods: {
    open(id) {
      this.$axios
        .$get(`/api/orders?posId=${id}`, {
          progress: false,
        })
        .then((res) => {
          this.id = id
          this.order = res.results
        })
        .catch((error) => {
          alert(error)
        })
      this.assignModal = true
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault()
      }
    },
    addNum(num) {
      if (!/[^0-9.]/.test(num)) {
        this.money.receive += num
      } else {
        let str = this.money.receive
        str = str.slice(0, -1)
        this.money.receive = str
      }
    },
    plusNum(num) {
      const money = parseFloat(this.money.receive || 0) + num
      this.money.receive = money.toString()
    },
    setValid(bool) {
      this.valid = bool
    },
    checkChange(num) {
      const money = parseFloat(num || 0) - parseFloat(this.payment || 0)
      if (money >= 0) {
        return true
      } else {
        return false
      }
    },
    checkout(id) {
      if (this.valid && this.$refs.form.validate()) {
        const detail =
          this.payType === 2
            ? {
                qty: this.order.length,
                salesPrice: this.sumPrice,
                discount: parseFloat(this.endBill || 0),
                netPrice: parseFloat(this.payment || 0),
                paymentTypeId: this.payType,
                note: this.note,
              }
            : this.payType === 3
            ? {
                qty: this.order.length,
                salesPrice: this.sumPrice,
                discount: parseFloat(this.endBill || 0),
                netPrice: parseFloat(this.payment || 0),
                paymentTypeId: this.payType,
                creditCardIssuerId: this.credit.typeSelected,
                creditCardFeesMethodId: this.credit.followSelected,
                creditCardFees: parseFloat(this.calcFee || 0),
                note: this.credit.number,
              }
            : {
                qty: this.order.length,
                salesPrice: this.sumPrice,
                discount: parseFloat(this.endBill || 0),
                netPrice: parseFloat(this.payment || 0),
                cash: parseFloat(this.money.receive || 0),
                change: parseFloat(this.changeMoney || 0),
                paymentTypeId: this.payType,
              }
        // console.log(detail)
        this.$axios
          .$post(`/api/pos/${id}/receipts`, detail, { progress: false })
          .then((res) => {
            this.assignModal = false
            // this.print()
            this.$emit('updateState', res)
          })
          .catch((error) => {
            alert(error)
          })
      }
    },
  },
}
</script>

<template>
  <div>
    <v-dialog v-model="assignModal" max-width="600" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">สรุปยอด</h2>
        <v-divider></v-divider>

        <v-card class="my-3 mx-7">
          <v-row no-gutters class="pt-3 px-4">
            <v-col class="text-left">
              <span>รายการ</span>
            </v-col>
            <v-col class="text-right">
              <span>ราคาต่อหน่วย</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-virtual-scroll :items="order" :item-height="30" height="150">
            <template v-slot="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.itemLabel + ' ( x' + item.qty + ' )' }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action> {{ item.price }} บาท</v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
        <div class="text-right pb-3 px-7">
          <span class="font-weight-bold"> รวม {{ sumPrice }} บาท </span>
        </div>
        <v-divider class="dash-divider"></v-divider>
        <div class="py-3 px-7">
          <v-row no-gutters justify="center" align="center">
            <v-col cols="4">
              <v-text-field
                v-model="reduce"
                label="ส่วนลด"
                color="cusblue2"
                outlined
                dense
                hide-details
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="text-right">
              <span class="font-weight-bold">
                เหลือ {{ reducePrice }} บาท
              </span>
            </v-col>
          </v-row>
        </div>
        <v-divider class="dash-divider"></v-divider>
        <div class="py-3 px-7">
          <v-row no-gutters justify="center" align="center">
            <v-col cols="4">
              <v-text-field
                v-model="recieve"
                label="รับเงิน"
                color="cusblue2"
                outlined
                dense
                hide-details
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="5" class="text-right">
              <v-chip
                v-for="money in bank"
                :key="money"
                class="mr-1"
                small
                @click="plusMoney(money)"
              >
                +{{ money }}
              </v-chip>
            </v-col>
            <v-col cols="3" class="text-right">
              <span class="font-weight-bold">{{ checkPay }}</span>
            </v-col>
          </v-row>
        </div>
        <v-card-actions style="border-top: 1px solid rgb(202, 201, 201)">
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="assignModal = false">
            ยกเลิก
          </v-btn>
          <v-btn :disabled="!valid" color="cusblue2" text @click="checkout(id)">
            ตกลง
          </v-btn>
        </v-card-actions>
        <!-- <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
                <v-row dense>
                <v-col cols="6">
                    <v-text-field
                    v-model="addData.instr"
                    :rules="rules.instr"
                    :disabled="loading"
                    label="Instruction"
                    color="cusblue2"
                    ></v-text-field>
                </v-col>
                </v-row>
            </v-form> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      items: ['fefe', 'gegege', 'heheheh'],
      id: null,
      order: [],
      reduce: 0,
      recieve: 0,
      bank: [1000, 500, 100, 50, 20, 10, 5, 2, 1],
      valid: false,
    }
  },
  computed: {
    checkPay() {
      if (this.changeMoney >= 0) {
        this.notAllow(true)
        return 'ทอน ' + this.changeMoney + ' บาท'
      } else {
        this.notAllow(false)
        return 'ไม่สามารถชำระเงิน'
      }
    },
    changeMoney() {
      return this.recieve - this.reducePrice
    },
    reducePrice() {
      return this.sumPrice - this.reduce
    },
    sumPrice() {
      let sum = 0
      this.order.map((item) => {
        return (sum += item.price * item.qty)
      })
      return sum
    },
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
    plusMoney(money) {
      this.recieve += money
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    notAllow(bool) {
      this.valid = bool
    },
    checkout(id) {
      if (this.valid) {
        this.$axios
          .$post(`/api/pos/${id}/receipt`, { progress: false })
          .then((res) => {
            this.assignModal = false
            this.$emit('updateState', 'success')
          })
          .catch((error) => {
            alert(error)
          })
      }
    },
  },
}
</script>

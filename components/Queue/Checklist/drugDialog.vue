<template>
  <v-dialog v-model="assignModal" max-width="600" scrollable>
    <v-card>
      <h2 class="pa-5 pb-2">แก้ไขรายการ</h2>
      <v-divider></v-divider>

      <v-card-text class="px-8">
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
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
            <v-col cols="6">
              <v-text-field
                v-model="addData.dose"
                :rules="rules.dose"
                :disabled="loading"
                label="Dose"
                color="cusblue2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="addData.freq"
                :rules="rules.freq"
                :disabled="loading"
                label="Frequency"
                color="cusblue2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="addData.caution"
                :rules="rules.caution"
                :disabled="loading"
                label="Caution"
                color="cusblue2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          color="cusblue2"
          text
          @click="assignModal = false"
        >
          ยกเลิก
        </v-btn>

        <v-btn
          :disabled="!valid || loading"
          color="cusblue2"
          text
          @click="updateItem"
        >
          <v-progress-circular
            v-show="loading"
            class="mr-2"
            indeterminate
            color="cusblue2"
            :size="15"
            :width="2"
          ></v-progress-circular>
          บันทึก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      loading: false,
      valid: false,
      addData: {
        // nameList: '',
        // type: '',
        // num: '',
        // price: '',
        orderId: '',
        instr: '',
        dose: '',
        freq: '',
        caution: '',
      },
      rules: {
        instr: [
          (v) => !!v || 'กรุณากรอกคำแนะนำ',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกคำแนะนำเกิน 100 ตัวอักษร',
        ],
        dose: [
          (v) =>
            (v && /^[0-9]*\.?[0-9]{1,2}$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น',
        ],
        freq: [
          (v) => !!v || 'กรุณากรอกความถี่',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร',
        ],
        caution: [
          (v) => !!v || 'กรุณากรอกข้อควรระวัง',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร',
        ],
      },
    }
  },
  watch: {
    assignModal(val) {
      if (val === false) {
        this.addData = {
          orderId: '',
          instr: '',
          dose: '',
          freq: '',
          caution: '',
        }
      }
    },
  },
  methods: {
    open(id) {
      this.assignModal = true
      this.getDrug(id)
    },
    async getDrug(id) {
      try {
        const drug = await this.$axios.$get(`/api/orders/${id}/drug`, {
          progress: false,
        })
        this.addData = {
          orderId: id,
          instr: drug.instruction,
          dose: drug.dose,
          freq: drug.frequency,
          caution: drug.caution,
        }
      } catch (error) {
        alert(error)
      }
    },
    updateItem() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const drug = { ...this.addData }
        const sendDrug = {
          instr: drug.instruction,
          dose: drug.dose,
          freq: drug.frequency,
          caution: drug.caution,
        }
        this.$axios
          .$patch(`/api/orders/${drug.orderId}/drug`, sendDrug, {
            progress: false,
          })
          .then((res) => {
            setTimeout(() => {
              this.loading = false
              this.assignModal = false
            }, 500)
          })
          .catch((error) => {
            this.loading = false
            alert(error)
          })
      }
    },
  },
}
</script>

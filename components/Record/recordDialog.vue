<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <h2 class="pa-5 pb-2">เพิ่มข้อมูลลูกค้า</h2>
          <v-divider class="darker-divider"></v-divider>
          <div class="py-5 px-10">
            <v-row dense>
              <v-col cols="3">
                <v-select
                  v-model="addCustomer.prefix"
                  color="cusblue"
                  :items="nameTitle"
                  label="คำนำหน้าชื่อ"
                  menu-props="auto"
                  :rules="rules.prefix"
                  required
                ></v-select>
              </v-col>
              <v-col cols="4.5">
                <v-text-field
                  v-model="addCustomer.f_name"
                  color="cusblue"
                  label="ชื่อ"
                  :rules="rules.f_name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4.5">
                <v-text-field
                  v-model="addCustomer.l_name"
                  color="cusblue"
                  label="นามสกุล"
                  :rules="rules.l_name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addCustomer.address"
                  color="cusblue"
                  label="ที่อยู่"
                  :rules="rules.address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addCustomer.email"
                  color="cusblue"
                  label="อีเมล์"
                  :rules="rules.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addCustomer.tel"
                  color="cusblue"
                  label="เบอร์ติดต่อ"
                  :rules="rules.tel"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addCustomer.other"
                  color="cusblue"
                  label="อื่นๆ"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" text @click="cancelForm">ยกเลิก</v-btn>

            <v-btn
              color="cusblue2"
              :disabled="!valid"
              text
              @click="submitCustomer()"
              >บันทึก</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      valid: true,
      nameTitle: ['คุณ', 'นาย', 'นาง', 'นางสาว'],
      addCustomer: {
        prefix: '',
        f_name: '',
        l_name: '',
        address: '',
        email: '',
        tel: '',
        other: '',
      },
      rules: {
        prefix: [(v) => !!v || 'กรุณาใส่คำนำหน้าชื่อ'],
        f_name: [
          (v) => !!v || 'กรุณากรอกชื่อ',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร',
        ],
        l_name: [
          (v) => !!v || 'กรุณากรอกนามสกุล',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกนามสกุลเกิน 100 ตัวอักษร',
        ],
        address: [
          (v) => !!v || 'กรุณากรอกที่อยู่',
          (v) =>
            (v && v.length <= 1000) || 'ไม่ควรกรอกที่อยู่เกิน 1000 ตัวอักษร',
        ],
        email: [
          (v) => !!v || 'กรุณากรอกอีเมล์',
          (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล์ให้ถูกรูปแบบ',
        ],
        tel: [
          (v) => !!v || 'กรุณากรอกที่อยู่',
          (v) => (v && v.length <= 10) || 'ไม่กรอกใส่ชื่อเกิน 10 ตัวอักษร',
          (v) =>
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) ||
            'กรุณากรอกเบอร์ติดต่อให้ถูกรูปแบบ',
        ],
      },
    }
  },
  methods: {
    submitCustomer() {
      if (this.$refs.form.validate()) {
        const sendCustomer = { ...this.addCustomer }
        this.$store.dispatch('addCustomer', sendCustomer).then(() => {
          this.$refs.form.reset()
          this.assignModal = false
        })
      }
    },
    cancelForm() {
      this.$refs.form.reset()
      this.assignModal = false
    },
  },
}
</script>

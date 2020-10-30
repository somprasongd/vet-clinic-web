<template>
  <div>
    <v-dialog
      v-model="assignModal"
      max-width="700"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <h2 class="pa-5 pb-2">
          {{ addCustomer.id ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มข้อมูลลูกค้า' }}
        </h2>
        <v-btn class="mt-4" icon absolute right @click="assignModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <div>
              <v-row dense>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="addCustomer.prefix"
                    color="cusblue"
                    :disabled="loading"
                    :items="nameTitle"
                    item-text="label"
                    item-value="id"
                    label="คำนำหน้าชื่อ"
                    menu-props="auto"
                    :rules="rules.prefix"
                    required
                    @keydown.enter="onEnter('f_name')"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    ref="f_name"
                    v-model="addCustomer.f_name"
                    :disabled="loading"
                    color="cusblue"
                    label="ชื่อ"
                    :rules="rules.f_name"
                    required
                    @keydown.enter="onEnter('l_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    ref="l_name"
                    v-model="addCustomer.l_name"
                    :disabled="loading"
                    color="cusblue"
                    label="นามสกุล"
                    :rules="rules.l_name"
                    required
                    @keydown.enter="onEnter('houseno')"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    ref="houseno"
                    v-model="addCustomer.houseNo"
                    :disabled="loading"
                    color="cusblue"
                    label="บ้านเลขที่"
                    :rules="rules.houseNo"
                    required
                    @keydown.enter="onEnter('address')"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    ref="address"
                    v-model="addCustomer.address"
                    :disabled="loading"
                    color="cusblue"
                    label="ที่อยู่"
                    :rules="rules.address"
                    required
                    @keydown.enter="onEnter('email')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    ref="email"
                    v-model="addCustomer.email"
                    :disabled="loading"
                    color="cusblue"
                    label="อีเมล์"
                    :rules="rules.email"
                    required
                    @keydown.enter="onEnter('tel')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-combobox
                    ref="tel"
                    v-model="addCustomer.tel"
                    :disabled="loading"
                    color="cusblue"
                    label="เบอร์ติดต่อ"
                    height="32"
                    append-icon=""
                    :rules="rules.tel"
                    multiple
                    small-chips
                    deletable-chips
                    @keydown.enter="onEnter('other')"
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    ref="other"
                    v-model="addCustomer.other"
                    :disabled="loading"
                    color="cusblue"
                    label="อื่นๆ"
                    auto-grow
                    row-height="24"
                    rows="1"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-form>
          <v-alert
            v-model="alert"
            dense
            text
            color="red"
            transition="scroll-y-transition"
            dismissible
          >
            {{ error }}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" color="cusblue2" text @click="cancelForm">
            ยกเลิก
          </v-btn>

          <v-btn
            color="cusblue2"
            :disabled="!valid || loading"
            text
            @click="addCustomer.id ? updateCustomer() : submitCustomer()"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            {{ addCustomer.id ? 'บันทึก' : 'ตกลง' }}
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
      valid: true,

      loading: false,
      alert: false,
      error: '',

      nameTitle: this.$store.state.form.prefixes,
      addCustomer: {
        id: '',
        prefix: 1,
        f_name: '',
        l_name: '',
        houseNo: '',
        address: '',
        email: '',
        tel: [],
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
        houseNo: [
          (v) => !!v || 'กรุณากรอกบ้านเลขที่',
          (v) =>
            (v && v.length <= 300) || 'ไม่ควรกรอกบ้านเลขที่เกิน 50 ตัวอักษร',
        ],
        // address: [
        //   (v) => !!v || 'กรุณากรอกที่อยู่',
        //   (v) => (v && v.length <= 300) || 'ไม่ควรกรอกที่อยู่เกิน 300 ตัวอักษร',
        // ],
        // email: [
        //   (v) => !!v || 'กรุณากรอกอีเมล์',
        //   (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล์ให้ถูกรูปแบบ',
        // ],
        tel: [
          (v) => !!v || 'กรุณากรอกเบอร์โทรศัพท์',
          (v) => (v && this.validatePhone(v)) || 'กรุณากรอกเบอร์ให้ถูกรูปแบบ',
          // (v) => (v && v.length <= 2) || 'ไม่ควรใส่เบอร์เกิน 2 เบอร์',
        ],
      },
    }
  },
  mounted() {
    if (this.$store.state.form.prefixes.length === 0) {
      this.$store.dispatch('form/addPrefixes').then((res) => {
        this.nameTitle = res
      })
    }
    this.socket = this.$nuxtSocket({
      reconnection: true, // whether to reconnect automatically
      reconnectionAttempts: 5, // number of reconnection attempts before giving up
      reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
      reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
      randomizationFactor: 0.5,
    })

    this.socket.on('connect', (data) => {
      /* Emit events */
      this.socket.emit(
        'set-query',
        {
          query: ['name', 'address', 'photo'],
        },
        (resp) => {
          //
        }
      )
    })

    this.socket.on('connect_error', () => {
      setTimeout(() => {
        this.socket.connect()
      }, 1000)
    })

    this.socket.on('disconnect', () => {
      setTimeout(() => {
        this.socket.connect()
      }, 1000)
    })
  },
  methods: {
    open(val) {
      this.assignModal = true
      if (this.$route.params.owner) {
        // console.log(val)
        this.addCustomer = {
          id: val.id,
          prefix: val.prefixId || 1,
          f_name: val.firstName,
          l_name: val.lastName,
          houseNo: val.houseNo,
          address: val.address,
          email: val.email,
          tel: val.tels,
          other: val.remark,
        }
        return
      }
      /* Listen for events: */
      this.socket.on('smc-data', (msg) => {
        this.loading = false
        const {
          name: { prefix, firstname, lastname },
          address: { houseNo, full },
        } = msg.data

        this.addCustomer = {
          id: '',
          prefix:
            prefix === 'นาย'
              ? 2
              : prefix === 'นางสาว'
              ? 3
              : prefix === 'นาง'
              ? 4
              : 1,
          f_name: firstname,
          l_name: lastname,
          houseNo,
          address: full.substring(houseNo.length + 1),
          email: '',
          tel: [],
          other: '',
        }
      })
      this.socket.on('smc-error', (msg) => {
        this.loading = false
        this.alert = true
        this.error = 'อ่านข้อมูลบัตรผิดพลาด ลองใหม่อีกครั้ง'
      })
      this.socket.on('smc-removed', (msg) => {
        this.loading = false
        this.alert = false
      })
      this.socket.on('smc-incorrect', (msg) => {
        this.loading = false
        this.alert = true
        this.error = 'เสียบบัตรไม่ถูกต้อง'
      })
      this.socket.on('smc-inserted', (msg) => {
        this.loading = true
        this.alert = false
        this.error = ''
      })
    },
    cancelForm() {
      this.$refs.form.reset()
      this.assignModal = false
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    validatePhone(num) {
      if (num.length > 2) {
        this.addCustomer.tel.pop()
      }
      if (num.length !== 0) {
        return num.every((n) => {
          return n.length >= 9 && n.length <= 10 && n.match(/^[0-9]*$/)
        })
      }
    },
    // ************ Request ************
    submitCustomer() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const sendCustomer = { ...this.addCustomer }
        const sendData = {
          prefixId: sendCustomer.prefix,
          firstName: sendCustomer.f_name,
          lastName: sendCustomer.l_name,
          houseNo: sendCustomer.houseNo,
          address: sendCustomer.address,
          tels: sendCustomer.tel,
          email: sendCustomer.email,
          remark: sendCustomer.other,
        }
        this.$axios
          .$post('/api/members', sendData, { progress: false })
          .then((res) => {
            this.successSubmit(res)
          })
          .catch((error) => {
            this.errorSubmit(error)
          })
      }
    },
    updateCustomer() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const sendCustomer = { ...this.addCustomer }
        const sendData = {
          prefixId: sendCustomer.prefix,
          firstName: sendCustomer.f_name,
          lastName: sendCustomer.l_name,
          houseNo: sendCustomer.houseNo,
          address: sendCustomer.address,
          tels: sendCustomer.tel,
          email: sendCustomer.email,
          remark: sendCustomer.other,
        }
        this.$axios
          .$patch(`/api/members/${sendCustomer.id}`, sendData, {
            progress: false,
          })
          .then((res) => {
            this.updateubmit(res)
          })
          .catch((error) => {
            this.errorSubmit(error)
          })
      }
    },
    successSubmit(res) {
      setTimeout(() => {
        this.loading = false
        this.assignModal = false
        this.alert = false
        this.$refs.form.reset()
        this.$router.push(`/record/${res.id}`)
      }, 500)
    },
    updateubmit(res) {
      setTimeout(() => {
        this.loading = false
        this.assignModal = false
        this.alert = false
        this.$refs.form.reset()
        this.$emit('update', res)
      }, 500)
    },
    errorSubmit(error) {
      this.loading = false
      this.alert = true
      this.error = error.response.data.error.message
    },
  },
}
</script>

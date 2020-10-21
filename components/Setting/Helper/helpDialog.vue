<template>
  <div>
    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">{{ getTitle }}</h2>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="helper.code"
                  :disabled="loading"
                  :rules="rules.code"
                  label="รหัส"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="helper.label"
                  :disabled="loading"
                  :rules="rules.label"
                  label="ข้อความ"
                ></v-text-field>
              </v-col>
            </v-row>
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
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="cusblue2--text text-none"
            text
            @click="assignModal = false"
          >
            Cancel
          </v-btn>
          <v-btn class="cusblue2--text text-none" text @click="newItem">
            New
          </v-btn>
          <v-btn
            :disabled="!valid || loading"
            class="cusblue2--text text-none"
            text
            @click="helper.id !== '' ? updateHelper() : addHelper()"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            {{ helper.id !== '' ? 'Update' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    allHelper: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      assignModal: false,
      valid: false,
      loading: false,
      alert: false,
      error: '',
      helper: {
        id: '',
        code: '',
        label: '',
      },
      rules: {
        code: [
          (v) => !!v || 'กรุณากรอกโค้ด',
          (v) => (v && v.length <= 50) || 'ไม่ควรกรอกชื่อเกิน 50 ตัวอักษร',
          (v) => (v && this.checkDuplicate(v)) || 'โค้ดถูกใช้งานแล้ว',
        ],
        label: [
          (v) => !!v || 'กรุณากรอกข้อความ',
          (v) => (v && v.length <= 50) || 'ไม่ควรกรอกข้อความเกิน 50 ตัวอักษร',
        ],
      },
    }
  },
  computed: {
    getTitle() {
      return this.helper.id !== '' ? 'แก้ไข' : 'เพิ่ม'
    },
  },
  watch: {
    assignModal(val) {
      if (val === false) {
        this.newItem()
      }
    },
  },
  methods: {
    newItem() {
      this.helper = {
        id: '',
        code: '',
        label: '',
      }
      this.$refs.form.resetValidation()
    },
    open(data) {
      if (data !== null) {
        this.helper = {
          id: data.id,
          code: data.code,
          label: data.label,
        }
        this.assignModal = true
      } else {
        this.assignModal = true
      }
    },
    checkDuplicate(val) {
      if (this.helper.id === '') {
        return !this.allHelper.some((helper) => {
          return helper.code.toLowerCase() === val.toLowerCase()
        })
      } else {
        return !this.allHelper.some((helper) => {
          return (
            helper.code.toLowerCase() === val.toLowerCase() &&
            helper.code !== this.helper.code
          )
        })
      }
    },
    addHelper() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const help = { ...this.helper }
        const sendHelper = {
          code: help.code,
          label: help.label,
        }
        this.$axios
          .$post(
            `/api/config/${
              this.$route.params.tab === 'Chief-Complaint'
                ? 'cc'
                : this.$route.params.tab === 'Differential-Diagnosis'
                ? 'dx'
                : this.$route.params.tab === 'History-Ranking'
                ? 'ht'
                : 'pe'
            }`,
            sendHelper,
            { progress: false }
          )
          .then((res) => {
            this.successSubmit(res)
          })
          .catch((error) => {
            this.sendError(error)
          })
      }
    },
    updateHelper() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const help = { ...this.helper }
        const sendHelper = {
          code: help.code,
          label: help.label,
        }
        this.$axios
          .$put(
            `/api/config/${
              this.$route.params.tab === 'Chief-Complaint'
                ? 'cc'
                : this.$route.params.tab === 'Differential-Diagnosis'
                ? 'dx'
                : this.$route.params.tab === 'History-Ranking'
                ? 'ht'
                : 'pe'
            }/${help.id}`,
            sendHelper,
            { progress: false }
          )
          .then((res) => {
            this.successUpdate(res)
          })
          .catch((error) => {
            this.sendError(error)
          })
      }
    },
    successSubmit(res) {
      setTimeout(() => {
        this.loading = false
        this.assignModal = false
        this.$emit('add', res)
      }, 500)
    },
    successUpdate(res) {
      setTimeout(() => {
        this.loading = false
        this.assignModal = false
        this.$emit('update', res)
      }, 500)
    },
    sendError(error) {
      this.alert = true
      this.error = error.response.data.error.message
      this.loading = false
    },
  },
}
</script>

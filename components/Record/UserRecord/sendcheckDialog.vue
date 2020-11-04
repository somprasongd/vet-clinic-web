<template>
  <div>
    <v-dialog
      v-model="sendCheckDialog"
      max-width="700"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <h2 class="pa-5 pb-2">ส่งตรวจ</h2>
        <v-btn
          class="mt-4"
          icon
          absolute
          right
          @click="sendCheckDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-row dense>
              <v-col cols="6">
                <v-select
                  v-model="sendCheck.doctorId"
                  :disabled="loading"
                  :items="doctorListItems"
                  item-text="name"
                  item-value="id"
                  color="cusblue"
                  item-color="cusblue"
                  label="แพทย์ผู้ตรวจ"
                  :menu-props="{ closeOnContentClick: true }"
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      :style="
                        sendCheck.doctorId === ''
                          ? 'background-color: #e2f5fc'
                          : ''
                      "
                      ripple
                      @click="sendCheck.doctorId = ''"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          :class="
                            sendCheck.doctorId === '' ? 'cusblue--text' : ''
                          "
                        >
                          ไม่ระบุแพทย์
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="sendCheck.important"
                  :disabled="loading"
                  :items="priorityListItems"
                  item-text="label"
                  item-value="id"
                  color="cusblue"
                  label="ความสำคัญ"
                  menu-props="auto"
                  :rules="rules.important"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="sendCheck.weight"
                  :disabled="loading"
                  color="cusblue"
                  label="นำหนัก / kg"
                  autofocus
                  :rules="rules.weight"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="sendCheck.temp"
                  :disabled="loading"
                  color="cusblue"
                  label="อุณหภูมิ / F°"
                  :rules="rules.temp"
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="ดูอาการ"
                  label="ดูอาการ"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="ทำแผล"
                  label="ทำแผล"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="ฟังผลตรวจ"
                  label="ฟังผลตรวจ Lab"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="ฉีดยา"
                  label="ฉีดยา"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="ให้น้ำเกลือ"
                  label="ให้น้ำเกลือ"
                ></v-checkbox>
              </v-col>
              <v-col cols="6" sm="4">
                <v-checkbox
                  v-model="sendCheck.do.check"
                  :disabled="loading"
                  class="mx-2"
                  value="Xray / Ultrasound"
                  label="Xray / Ultrasound"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="px-3">
                <v-row align="center" no-gutters>
                  <v-checkbox
                    v-model="sendCheck.do.other.enabled"
                    :disabled="loading"
                    hide-details
                    class="shrink mr-2 mt-0"
                    label="อื่นๆ"
                  ></v-checkbox>
                  <v-text-field
                    v-model="sendCheck.do.other.text"
                    color="cusblue"
                    dense
                    :disabled="!sendCheck.do.other.enabled || loading"
                    class="mt-5"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="sendCheck.problem"
                  :disabled="loading"
                  color="cusblue"
                  label="Note"
                  auto-grow
                  row-height="24"
                  rows="1"
                ></v-textarea>
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-shortkey="['ctrl', 'x']"
            color="cusblue2"
            :disabled="loading"
            text
            @shortkey="sendCheckDialog = false"
            @click="sendCheckDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            v-shortkey="['ctrl', 'enter']"
            color="cusblue2"
            :disabled="!valid || loading"
            text
            @shortkey="submitCheck"
            @click="submitCheck"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendCheckDialog: false,

      loading: false,
      alert: false,
      error: '',

      sendCheck: {
        petId: '',
        type: '',
        time: '',
        status: '',
        doctorId: '',
        important: 1,
        weight: '',
        temp: '',
        do: {
          check: [],
          other: { text: '', enabled: false },
        },
        problem: '',
        appointId: '',
      },

      valid: true,
      rules: {
        important: [(v) => !!v || 'กรุณาเลือกความสำคัญ'],
        weight: [
          (v) => !!v || 'กรุณากรอกน้ำหนัก',
          (v) => /^[0-9]*\.?[0-9]{1,2}$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
          (v) =>
            (v && v.split('.')[0].length <= 3) ||
            'ไม่ควรกรอกน้ำหนักเกิน 3 หลัก',
        ],
        temp: [
          // (v) => !!v || 'กรุณากรอกอุณหภูมิ',
          (v) =>
            !v || /^[0-9]*\.?[0-9]{1,2}$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น',
          (v) =>
            !v ||
            v.split('.')[0].length <= 3 ||
            'ไม่ควรกรอกอุณหภูมิเกิน 3 หลัก',
        ],
      },
    }
  },
  computed: {
    doctorListItems() {
      return this.$store.state.form.doctor
    },
    priorityListItems() {
      return this.$store.state.form.priority
    },
  },
  watch: {
    sendCheckDialog() {
      if (this.sendCheckDialog === false) this.$refs.form.reset()
    },
  },
  mounted() {
    if (this.$store.state.form.doctor.length === 0) {
      this.$store.dispatch('form/addDoctor')
    }
    if (this.$store.state.form.priority.length === 0) {
      this.$store.dispatch('form/addPriority')
    }
  },
  methods: {
    open(id) {
      this.sendCheck.petId = id
      this.sendCheck.doctorId = this.$store.getters.loggedInUser.roles.some(
        (role) => {
          return role.id === 2
        }
      )
        ? this.$store.getters.loggedInUser.id
        : ''
      this.sendCheck.appointId = null
      this.sendCheckDialog = true
    },
    openWithAppointment(id, doctorId, appointId) {
      this.sendCheck.petId = id
      this.sendCheck.doctorId = doctorId !== null ? doctorId : ''
      this.sendCheck.appointId = appointId
      this.sendCheckDialog = true
    },
    submitCheck() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const pet = { ...this.sendCheck }
        if (pet.do.other.enabled && pet.do.other.text !== '') {
          pet.do.check.push(pet.do.other.text)
        }
        const sendPet = {
          petId: pet.petId,
          doctorId: pet.doctorId === '' ? null : pet.doctorId,
          visitPriorityId: pet.important,
          weight: pet.weight,
          temp: pet.temp === '' ? null : pet.temp,
          visitCause: pet.do.check.join(', '),
          note: pet.problem,
          appointId: pet.appointId === '' ? null : pet.appointId,
        }

        this.$axios
          .$post('/api/visits', sendPet, { progress: false })
          .then((res) => {
            setTimeout(() => {
              this.loading = false
              this.alert = false
              this.sendCheckDialog = false
              // ยังไม่เสร็จ
              if (pet.appointId !== '') {
                this.$emit('updateAppoint', {
                  appointId: pet.appointId,
                  respone: res,
                })
              }
            }, 500)
          })
          .catch((error) => {
            this.loading = false
            this.alert = true
            this.error = error.response.data.error.message
          })
      }
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="sendDoctor"
    max-width="450"
    scrollable
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
    transition="dialog-transition"
  >
    <v-card>
      <h2 class="pa-5 pb-2">ส่งต่อ</h2>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          v-model="oldDoc"
          label="แพทย์ผู้ตรวจ (เดิม)"
          disabled
        ></v-text-field>
        <v-select
          v-model="newDoc"
          :items="doctor"
          item-text="name"
          item-value="id"
          color="cusblue"
          item-color="cusblue"
          label="แพทย์ผู้ตรวจ (ใหม่)"
          :disabled="loading"
          :menu-props="{ closeOnContentClick: true }"
        >
          <template v-slot:prepend-item>
            <v-list-item
              :style="newDoc === '' ? 'background-color: #e2f5fc' : ''"
              ripple
              @click="newDoc = ''"
            >
              <v-list-item-content>
                <v-list-item-title
                  :class="newDoc === '' ? 'cusblue--text' : ''"
                >
                  ไม่ระบุแพทย์
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="cusblue2"
          :disabled="loading"
          text
          @click="sendDoctor = false"
        >
          ไม่ส่ง
        </v-btn>
        <v-btn color="cusblue2" :disabled="loading" text @click="submitSend">
          <v-progress-circular
            v-show="loading"
            class="mr-2"
            indeterminate
            color="cusblue2"
            :size="15"
            :width="2"
          ></v-progress-circular>
          ยืนยัน
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      sendDoctor: false,
      doctor: this.$store.state.form.doctor,
      visitId: '',
      oldDoc: '',
      newDoc: '',
      loading: false,
    }
  },
  created() {
    if (this.$store.state.form.doctor.length === 0) {
      this.$store.dispatch('form/addDoctor').then((res) => {
        this.doctor = res
      })
    }
  },
  methods: {
    open(name, id) {
      this.visitId = id
      this.oldDoc = name
      this.sendDoctor = true
    },
    submitSend() {
      this.loading = true
      this.$axios
        .$patch(
          `/api/visits/${this.visitId}`,
          {
            doctorId: this.newDoc === '' ? null : this.newDoc,
          },
          { progress: false }
        )
        .then((res) => {
          setTimeout(() => {
            this.sendDoctor = false
            this.loading = false
            this.$emit('updateDoctor', res)
          }, 500)
        })
        .catch((error) => {
          this.loading = false
          alert(error)
        })
    },
  },
}
</script>

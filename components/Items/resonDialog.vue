<template>
  <v-dialog
    v-model="whyDelDialig"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <h2 class="pa-5 pb-2">เหตุผลที่ลบ</h2>
      <v-divider></v-divider>
      <v-card-text class="py-3 px-7">
        <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
          <v-textarea
            v-model="reason"
            :rules="rules.reason"
            color="cusblue"
            label="เหตุผล"
            auto-grow
            row-height="24"
            rows="1"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cusblue2" text @click="whyDelDialig = false">
          ยกเลิก
        </v-btn>
        <v-btn :disabled="!valid" color="cusblue2" text @click="onSubmit">
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
      delId: '',
      whyDelDialig: false,
      reason: '',

      valid: false,
      rules: {
        reason: [(v) => !!v || 'กรุณากรอกเหตุผล'],
      },
    }
  },
  watch: {
    whyDelDialig(val) {
      if (val === false) {
        this.delId = ''
        this.reason = ''
        this.$refs.form.resetValidation()
      }
    },
  },
  methods: {
    open(id) {
      this.delId = id
      this.whyDelDialig = true
    },
    close() {
      this.whyDelDialig = false
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('del', { id: this.delId, reason: this.reason })
      }
    },
  },
}
</script>

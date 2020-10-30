<template>
  <v-card class="elevation-4" height="600">
    <v-card-title class="pa-0 pt-3 pl-5">สถานพยาบาล</v-card-title>
    <v-divider class="darker-divider"></v-divider>
    <v-card-text class="pa-5" style="height: 84%">
      <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
        <!-- <v-img :src="hospital.logo.url"></v-img> -->
        <div class="text-center">
          <userAvatar
            :avatars="hospital.logo.url"
            :delete-img="false"
            :size="180"
            @getId="updateImg"
          />
        </div>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="hospital.name"
              :disabled="loading"
              :rules="rules.name"
              label="ชื่อสถานพยาบาล"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="hospital.phone"
              :disabled="loading"
              :rules="rules.phone"
              label="เบอร์ติดต่อ"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="hospital.address"
              :disabled="loading"
              :rules="rules.address"
              label="ชื่อที่อยู่"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="hospital.branchNo"
              :disabled="loading"
              :rules="rules.branchNo"
              label="สาขาที่"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="hospital.branchName"
              :disabled="loading"
              :rules="rules.branchName"
              label="ชื่อสาขา"
            ></v-text-field>
          </v-col>
        </v-row>
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
      <v-btn
        class="cusblue2--text text-none"
        :disabled="!valid || loading"
        text
        @click="updateSite"
      >
        <v-progress-circular
          v-show="loading"
          class="mr-2"
          indeterminate
          color="cusblue2"
          :size="15"
          :width="2"
        ></v-progress-circular>
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import hospitalVue from '~/pages/setting/hospital.vue'
import userAvatar from '@/components/Setting/System/userAvatar'
export default {
  components: {
    userAvatar,
  },
  props: {
    hospital: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      valid: false,
      loading: false,
      alert: false,
      error: '',
      rules: {
        name: [
          (v) => !!v || 'กรุณากรอกชื่อสถานพยาบาล',
          (v) =>
            (v && v.length <= 100) ||
            'ไม่ควรกรอกชื่อสถานพยาบาลเกิน 100 ตัวอักษร',
        ],
        phone: [
          (v) => !!v || 'กรุณาเบอร์ติดต่อ',
          (v) => /^[0-9]{9,10}$/.test(v) || 'กรุณากรอกเบอร์ติดต่อให้ถูกรูปแบบ',
        ],
        address: [
          (v) => !!v || 'กรุณากรอกชื่อที่อยู่',
          (v) =>
            (v && v.length <= 100) || 'ไม่ควรกรอกชื่อที่อยู่เกิน 100 ตัวอักษร',
        ],
        branchNo: [
          (v) => !!v || 'กรุณากรอกสาขาที่',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกสาขาที่เกิน 100 ตัวอักษร',
        ],
        branchName: [
          (v) => !!v || 'กรุณากรอกชื่อสาขา',
          (v) =>
            (v && v.length <= 100) || 'ไม่ควรกรอกชื่อสาขาเกิน 100 ตัวอักษร',
        ],
      },
    }
  },
  methods: {
    updateSite() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const hospital = { ...this.hospital }
        const sendHospital = {
          name: hospital.name,
          phone: hospital.phone,
          address: hospital.address,
          branchNo: hospital.branchNo,
          branchName: hospital.branchName,
        }
        this.$axios
          .$put('/api/config/site', sendHospital, { progress: false })
          .then((res) => {
            setTimeout(() => {
              this.loading = false
            }, 500)
          })
          .catch((error) => {
            this.loading = false
            this.error = error.response.data.error.message
            this.alert = true
          })
      }
    },
    updateImg(id) {
      this.loading = true
      const sendHospital = {
        logoId: id,
      }
      this.$axios
        .$put('/api/config/site', sendHospital, { progress: false })
        .then((res) => {
          setTimeout(() => {
            this.loading = false
          }, 200)
        })
        .catch((error) => {
          this.loading = false
          this.error = error.response.data.error.message
          this.alert = true
        })
    },
  },
}
</script>

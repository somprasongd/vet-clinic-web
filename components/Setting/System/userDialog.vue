<template>
  <div>
    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">
          {{ addUser.id == '' ? 'เพิ่ม' : 'แก้ไข' }}
        </h2>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text class="px-7">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            :disabled="loading"
            autocomplete="off"
          >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  ref="name"
                  v-model="addUser.name"
                  :color="color"
                  :rules="rules.name"
                  label="name"
                  type="text"
                  @keydown.enter="onEnter('username')"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="username"
                  v-model="addUser.username"
                  :disabled="addUser.id == '' ? false : true"
                  :color="color"
                  :rules="rules.username"
                  label="username"
                  type="text"
                  @keydown.enter="onEnter('email')"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="email"
                  v-model="addUser.email"
                  :color="color"
                  :rules="rules.email"
                  label="email"
                  type="email"
                  @keydown.enter="onEnter('password')"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="password"
                  v-model="addUser.password"
                  :color="color"
                  :rules="
                    addUser.id == ''
                      ? rules.password
                      : addUser.password !== ''
                      ? rules.password1
                      : []
                  "
                  :label="
                    addUser.id == '' ? 'password' : 'password (not required)'
                  "
                  type="password"
                  @keydown.enter="onEnter('confirm')"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="confirm"
                  v-model="addUser.confirm"
                  :color="color"
                  :rules="rules.confirm"
                  label="confirm password"
                  type="password"
                  @keydown.enter="submitUser"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="addUser.isAdmin"
                  :color="color"
                  label="ผู้ดูแลระบบ"
                >
                </v-checkbox>
              </v-col>
              <v-col v-if="addUser.id !== ''" class="row" cols="12">
                <v-avatar class="mx-3" size="41">
                  <v-img
                    :src="userAvatar"
                    :lazy-src="require('~/assets/profile/defaultProfile.svg')"
                  ></v-img>
                </v-avatar>
                <v-file-input
                  label="Profile Image (not requied)"
                  color="cusblue"
                  prepend-icon=""
                  accept="image/*"
                  hide-details
                  outlined
                  dense
                  @change="onFilePicked"
                >
                  <template v-slot:append-outer>
                    <v-icon color="red" @click="avatar = null"
                      >mdi-trash-can</v-icon
                    >
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <roleSelect
              :alert="roleAlert"
              :defaultrole="defaultRole"
              :disable="loading"
              @rank="addRank"
              @error="roleError"
            />

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
            :disabled="loading"
            @click="assignModal = false"
            >Cancel</v-btn
          >
          <v-btn
            class="cusblue2--text text-none"
            text
            :disabled="!valid || loading"
            @click="addUser.id == '' ? submitUser() : updateUser()"
            ><v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            {{ addUser.id == '' ? 'Save' : 'Update' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import roleSelect from '@/components/Setting/System/roleSelect'
export default {
  components: {
    roleSelect,
  },
  props: {
    alluser: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      color: 'cusblue',
      assignModal: false,

      valid: true,
      loading: false,
      alert: false,
      error: '',

      roleAlert: false,
      defaultRole: [],

      avatar: '',
      newAvatar: '',

      addUser: {
        id: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        profile: '',
        isAdmin: false,
        rank: [],
      },
      rules: {
        name: [
          (v) => !!v || 'กรุณากรอกชื่อ',
          (v) => (v && v.length >= 2) || 'กรุณากรอกชื่อขั้นต่ำ 2 ตัวอักษร',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร',
        ],
        username: [
          (v) => !!v || 'กรุณากรอกชื่อผู้ใช้',
          (v) =>
            (v && v.length >= 3) || 'กรุณากรอกชื่อผู้ใช้ขั้นต่ำ 3 ตัวอักษร',
          (v) =>
            /^[a-z0-9]+$/i.test(v) ||
            'สามารถใช้ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น',
          (v) =>
            (v && v.length <= 50) || 'ไม่ควรกรอกชื่อผู้ใช้เกิน 50 ตัวอักษร',
          (v) => (v && this.checkDuplicate(v)) || 'ชื่อผูัใช้นี้ถูกใช้งานแล้ว',
        ],
        email: [
          (v) => !!v || 'กรุณากรอกอีเมล์',
          (v) => (v && v.length <= 50) || 'ไม่ควรกรอกอีเมล์เกิน 50 ตัวอักษร',
          (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล์ให้ถูกรูปแบบ',
        ],
        password: [
          (v) => !!v || 'กรุณากรอกรหัสผ่าน',
          (v) =>
            (v && v.length >= 5) ||
            'รหัสผ่านต้องมีมากกว่าหรือเท่ากับ 5 ตัวอักษร',
          (v) =>
            (v && v.length <= 50) ||
            'รหัสผ่านต้องมีน้อยหรือเท่ากับ 50 ตัวอักษร',
        ],
        password1: [
          (v) =>
            (v && v.length >= 5) ||
            'รหัสผ่านต้องมีมากกว่าหรือเท่ากับ 5 ตัวอักษร',
          (v) =>
            (v && v.length <= 50) ||
            'รหัสผ่านต้องมีน้อยหรือเท่ากับ 50 ตัวอักษร',
        ],
        confirm: [(v) => v === this.addUser.password || 'รหัสผ่านไม่ตรงกัน'],
      },
    }
  },
  computed: {
    userAvatar() {
      if (this.newAvatar !== '') {
        return this.newAvatar
      } else if (this.avatar == null) {
        return require('~/assets/profile/defaultProfile.svg')
      } else {
        return this.avatar
      }
    },
  },
  watch: {
    assignModal() {
      if (this.assignModal === false) {
        setTimeout(() => {
          this.defaultRole = null
          this.$refs.form.reset()
          this.alert = false
          this.addUser.id = ''
          this.avatar = ''
        }, 150)
      }
    },
  },
  methods: {
    roleError(bool) {
      this.valid = !bool
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    addRank(id) {
      this.addUser.rank = id
    },
    checkDuplicate(val) {
      if (this.addUser.id === '') {
        // เช็คเตือนชื่อซ้ำตอนเพิ่มข้อมูล
        return !this.alluser.some((user) => {
          return user.username === val
        })
      } else {
        // เช็คเตื่อนชื่อซ้ำตอนแก้ไข โดยชื่อเดิมจะไม่เตือน
        return !this.alluser.some((user) => {
          return user.username === val && user.id !== this.addUser.id
        })
      }
    },
    onFilePicked(e) {
      // เลือกไฟล์แล้วเปลี่ยนรูป Preview
      if (e !== undefined) {
        this.addUser.profile = e
        this.newAvatar = URL.createObjectURL(e)
      } else this.newAvatar = ''
    },
    // REQUEST GET *********************************************************
    open(id) {
      // ถ้ามี id ส่งมาเ (แก้ไข) (เซ็ตค่า default)
      if (Number.isInteger(id)) {
        this.$axios
          .$get(`/api/users/${id}`, { progress: false })
          .then((editUser) => {
            // set default detail to textfield
            this.addUser = {
              id: editUser.id,
              name: editUser.name,
              username: editUser.username,
              email: editUser.email,
              password: '',
              confirm: '',
              isAdmin: editUser.isAdmin,
              rank: editUser.roles,
            }
            // set default role
            this.defaultRole = editUser.roles
            // Preview Profile Img
            this.avatar = `${process.env.apiUrl}/api/users/${id}/avatar`
            this.assignModal = true
          })
      } else this.assignModal = true
    },
    // REQUEST SEND **********************************************************************************
    submitUser() {
      if (this.$refs.form.validate() && this.addUser.rank.length !== 0) {
        this.roleAlert = false
        this.loading = true
        const userData = { ...this.addUser }
        this.$axios
          .$post('/api/users', {
            username: userData.username.toLowerCase(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin,
            roles: userData.rank,
          })
          .then((response) => {
            setTimeout(() => {
              this.$refs.form.reset()
              this.assignModal = false
              this.$emit('response', response)
              this.loading = false
            }, 500)
          })
          .catch((error) => {
            this.requestError(error)
          })
      } else this.roleAlert = true
    },
    updateUser() {
      if (this.$refs.form.validate() && this.addUser.rank.length !== 0) {
        this.roleAlert = false
        this.loading = true
        const userData = { ...this.addUser }
        const sendData = {
          username: userData.username.toLowerCase(),
          name: userData.name,
          email: userData.email,
          password: userData.password === '' ? null : userData.password,
          isAdmin: userData.isAdmin,
          roles: userData.rank,
        }
        this.$axios
          .$put(`/api/users/${userData.id}`, sendData)
          .then((response) => {
            // upload profile img

            if (this.avatar === null && userData.profile === undefined) {
              this.deleteProfile(userData.id, response)
            } else if (userData.profile !== undefined) {
              this.uploadProfile(userData.id, userData.profile, response)
            } else {
              this.updateSuccess(response)
            }
          })
          .catch((error) => {
            this.requestError(error)
          })
      } else if (this.addUser.rank.length === 0) {
        this.roleAlert = true
      }
    },
    uploadProfile(id, img, response) {
      const formData = new FormData()
      formData.append('avatar', img)

      this.$axios
        .$post(`/api/users/${id}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((data) => {
          this.updateSuccess(response)
        })
        .catch((error) => {
          this.requestError(error)
        })
    },
    deleteProfile(id, response) {
      this.$axios
        .$delete(`/api/users/${id}/avatar`)
        .then((data) => {
          this.updateSuccess(response)
        })
        .catch((error) => {
          this.requestError(error)
        })
    },
    // REQUEST RESULT ***************************************************
    updateSuccess(response) {
      setTimeout(() => {
        this.assignModal = false
        this.$refs.form.reset()
        this.$emit('update', response)
        this.loading = false
      }, 500)
    },
    requestError(error) {
      this.alert = true
      this.error = error.response.data.error.message
      this.loading = false
    },
  },
}
</script>

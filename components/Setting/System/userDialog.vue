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
                  :rules="rules.password"
                  label="password"
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
            :disabled="!valid || loading"
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

      addUser: {
        id: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
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
        confirm: [
          (v) => !!v || 'กรุณากรอกรหัสผ่านอีกครั้ง',
          (v) => (v && v === this.addUser.password) || 'รหัสผ่านไม่ตรงกัน',
        ],
      },
    }
  },
  watch: {
    assignModal() {
      if (this.assignModal === false) {
        setTimeout(() => {
          this.defaultRole = null
          this.$refs.form.reset()
          this.addUser.id = ''
        }, 200)
      }
    },
  },
  methods: {
    open(id) {
      this.assignModal = true
      // ถ้ามี id ส่งมา (แก้ไข)
      if (Number.isInteger(id)) {
        // console.log(id)
        const editUser = this.alluser.find((user) => {
          return user.id === id
        })
        // console.log(editUser)
        this.addUser = {
          id: editUser.id,
          name: editUser.name,
          username: editUser.username,
          email: editUser.email,
          password: editUser.password,
          confirm: editUser.confirm,
          isAdmin: editUser.isAdmin,
          rank: editUser.roles,
        }
        this.defaultRole = editUser.roles
      } else this.assignModal = true
    },
    roleError(bool) {
      this.valid = !bool
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
    addRank(id) {
      this.addUser.rank = id
    },
    updateUser() {
      if (this.$refs.form.validate() && this.addUser.rank.length !== 0) {
        this.roleAlert = false
        this.loading = true
        const userData = { ...this.addUser }
        this.$axios
          .$put(`/api/users/${userData.id}`, {
            username: userData.username.toLowerCase(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin,
            roles: userData.rank,
          })
          .then((response) => {
            setTimeout(() => {
              this.assignModal = false
              this.$refs.form.reset()
              this.$emit('update', response)
              // console.log(response)
              this.loading = false
            }, 500)
          })
          .catch((error) => {
            this.alert = true
            this.error = error.response.data.error.message
            this.loading = false
          })
      } else this.roleAlert = true
    },
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
            this.alert = true
            this.error = error.response.data.error.message
            this.loading = false
          })
      } else this.roleAlert = true
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
  },
}
</script>

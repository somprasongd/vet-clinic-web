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
          <h2 class="pa-5 pb-2">เพิ่ม/แก้ไข</h2>
          <v-divider class="darker-divider"></v-divider>
          <v-card-text class="px-7">
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="addUser.name"
                  :color="color"
                  :rules="rules.name"
                  label="name"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addUser.username"
                  :color="color"
                  :rules="rules.username"
                  label="username"
                  type="text"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addUser.email"
                  :color="color"
                  :rules="rules.email"
                  label="email"
                  type="email"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addUser.password"
                  :color="color"
                  :rules="rules.password"
                  label="password"
                  type="password"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addUser.confirm"
                  :color="color"
                  :rules="rules.confirm"
                  label="confirm password"
                  type="password"
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
            <roleSelect @rank="addRank" />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="cusblue2--text text-none"
              text
              :disabled="!valid"
              @click="submitUser"
              ><v-progress-circular
                class="mr-2"
                indeterminate
                color="cusblue2"
                :size="15"
                :width="2"
              ></v-progress-circular>
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
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

      addUser: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        isAdmin: false,
        rank: [],
      },
      rules: {
        name: [(v) => !!v || 'กรุณากรอกชื่อ'],
        username: [
          (v) => !!v || 'กรุณากรอกชื่อผู้ใช้',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกชื่อเกิน 100 ตัวอักษร',
          (v) => (v && this.checkDuplicate(v)) || 'ชื่อผูัใช้นี้ถูกใช้งานแล้ว',
        ],
        email: [
          (v) => !!v || 'กรุณากรอกอีเมล์',
          (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมล์ให้ถูกรูปแบบ',
        ],
        password: [
          (v) => !!v || 'กรุณากรอกรหัสผ่าน',
          (v) =>
            (v && v.length >= 6) ||
            'รหัสผ่านต้องมีมากกว่าหรือเท่ากับ 6 ตัวอักษร',
          (v) =>
            (v && v.length <= 48) ||
            'รหัสผ่านต้องมีน้อยหรือเท่ากับ 48 ตัวอักษร',
        ],
        confirm: [
          (v) => !!v || 'กรุณากรอกรหัสผ่านอีกครั้ง',
          (v) => (v && v === this.addUser.password) || 'รหัสผ่านไม่ตรงกัน',
        ],
      },
    }
  },
  computed: {},
  methods: {
    addRank(id) {
      this.addUser.rank = id
    },
    submitUser() {
      if (this.$refs.form.validate()) {
        const userData = { ...this.addUser }
        this.$axios
          .$post('/api/users', {
            username: userData.username,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin,
            roles: userData.rank,
          })
          .then(function (response) {
            this.$refs.form.reset()
            this.assignModal = false
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    checkDuplicate(val) {
      return !this.alluser.some((user) => {
        return user.username === val
      })
    },
  },
}
</script>

<template>
  <v-item-group v-model="selected">
    <v-row
      align="center"
      justify="center"
      :dense="this.$vuetify.breakpoint.xsOnly"
    >
      <v-col cols="12" sm="5">
        <v-card
          class="elevation-4 overflow-auto"
          height="180"
          :disabled="disable"
        >
          <v-card-title class="pa-0 pl-5 pt-3"> สิทธิทั้งหมด </v-card-title>
          <v-divider></v-divider>
          <v-row dense>
            <v-item
              v-for="(item, i) in allRank"
              v-slot:default="{ active, toggle }"
              :key="item.index"
              :value="item"
              class="col-6"
            >
              <div :class="i % 2 == 1 ? 'pt-3 pl-3 pr-6' : 'pt-3 pl-6 pr-3'">
                <v-card
                  :color="active ? 'cusblue' : 'grey lighten-2'"
                  class="text-center elevation-0"
                  light
                  height="22"
                  max-width="95"
                  @click="toggle()"
                >
                  <span
                    :class="
                      active
                        ? 'white--text text-uppercase'
                        : 'black--text text-uppercase'
                    "
                  >
                    {{ item.label }}
                  </span>
                </v-card>
              </div>
            </v-item>
          </v-row>
        </v-card>
      </v-col>

      <v-col class="px-2" cols="12" sm="1">
        <v-row :no-gutters="this.$vuetify.breakpoint.xsOnly">
          <v-col cols="6" sm="12">
            <div class="text-center">
              <v-btn
                class="cusblue2 white--text"
                :disabled="overBtn"
                fab
                small
                depressed
                @click="clickSelect"
                ><v-icon>{{
                  this.$vuetify.breakpoint.xsOnly
                    ? 'mdi-chevron-down'
                    : 'mdi-chevron-right'
                }}</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="6" sm="12">
            <div class="text-center">
              <v-btn
                class="cusblue2 white--text"
                :disabled="lessBtn"
                fab
                small
                depressed
                @click="clickSelect"
                ><v-icon>{{
                  this.$vuetify.breakpoint.xsOnly
                    ? 'mdi-chevron-up'
                    : 'mdi-chevron-left'
                }}</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="5">
        <v-card
          class="elevation-4 overflow-auto"
          height="180"
          :disabled="disable"
        >
          <v-card-title class="pa-0 pl-5 pt-3">
            <span :class="alerts ? 'red--text' : ''">สิทธิที่เลือก</span>
            <v-chip
              v-show="alerts"
              class="ma-2"
              color="red"
              outlined
              pill
              x-small
            >
              กรุณาเลือกสิทธิ
            </v-chip>
          </v-card-title>
          <v-divider></v-divider>
          <v-row dense>
            <v-item
              v-for="(item, i) in selectedRank"
              v-slot:default="{ active, toggle }"
              :key="item.index"
              :value="item"
              class="col-6"
            >
              <div :class="i % 2 == 1 ? 'pt-3 pl-3 pr-6' : 'pt-3 pl-6 pr-3'">
                <v-card
                  :color="active ? 'cusblue' : 'grey lighten-2'"
                  class="text-center elevation-0"
                  light
                  height="22"
                  max-width="95"
                  @click="toggle()"
                >
                  <span
                    :class="
                      active
                        ? 'white--text text-uppercase'
                        : 'black--text text-uppercase'
                    "
                    >{{ item.label }}</span
                  >
                </v-card>
              </div>
            </v-item>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script>
export default {
  props: {
    alert: {
      type: Boolean,
      required: true,
    },
    defaultrole: {
      default: null,
      type: Array,
      required: false,
    },
    disable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      enableValidate: false,
      overBtn: true,
      lessBtn: true,
      rankList: {},
      alerts: false,
    }
  },
  computed: {
    selectedRank() {
      // loop หา role ที่เลือกแล้ว
      const array = []
      const id = []
      for (const rank in this.rankList) {
        if (this.rankList[rank].active === true) {
          array.push(this.rankList[rank])
          id.push(this.rankList[rank].id)
        }
      }

      if (id.length === 0 && this.enableValidate) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.alerts = true
        this.$emit('error', true)
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.alerts = false
        this.$emit('error', false)
      }

      this.$emit('rank', id)
      return array
    },
    allRank() {
      // loop หา role ที่ยังไม่เลือก
      let rank
      const array = []
      for (rank in this.rankList) {
        if (this.rankList[rank].active === false) {
          array.push(this.rankList[rank])
        }
      }
      return array
    },
  },
  watch: {
    defaultrole() {
      if (this.defaultrole === null) {
        // รีเซ็ตตอน dialog เปิดแล้วส่งค่า default role เป็น null มา
        this.resetRole()
      } else {
        // เซ็ตค่า default ตอนเปิด dialog แล้วมี ค่า this.defaultrole ส่งมา
        this.selected = null
        setTimeout(() => {
          this.roleDefault()
        }, 100)
      }
    },
    selected() {
      this.enableValidate = true
      // disable/enable ปุ่มตาม role ตามสถานะ ที่เรากด
      if (this.selected == null) {
        this.overBtn = true
        this.lessBtn = true
      } else if (this.selected.active === false) {
        this.overBtn = false
        this.lessBtn = true
      } else if (this.selected.active === true) {
        this.overBtn = true
        this.lessBtn = false
      } else {
        this.overBtn = false
        this.lessBtn = false
      }
    },
    alert() {
      this.alerts = true
    },
  },
  async created() {
    // ดัง role จาก api แล้ว loop ใส่ this.ranklist
    const getRole = await this.$axios.$get('/api/master/user-roles', {
      progress: false,
    })
    const array = []
    for (const role of getRole.results) {
      array.push({
        id: role.id,
        label: role.label,
        active: false,
      })
    }
    this.rankList = array

    // ตอนกดแก้ไขถ้ามี role ที่เลือกแล้ว (สำหรับครั้งแรก ถ้าไม่มีครั้งแรกตอนกดแก้ไขจะไม่ขึ้น role ที่เลือกแล้ว)
    if (this.defaultrole) {
      this.roleDefault()
    }
  },
  methods: {
    roleDefault() {
      for (const id of this.defaultrole) {
        const index = this.rankList.findIndex((res) => {
          return res.id === id.id
        })
        this.rankList[index].active = true
      }
    },
    resetRole() {
      this.enableValidate = false
      this.selected = null
      // console.log('reset')
      for (const id in this.rankList) {
        this.rankList[id].active = false
      }
    },
    clickSelect() {
      // พอกดปุ่มลูกศรก็เปลี่ยนสถานะ active ของ role เป็นตรงข้าม
      const index = this.rankList.findIndex((rank) => {
        return rank.id === this.selected.id
      })
      this.rankList[index].active = !this.rankList[index].active
      this.selected = null
      this.overBtn = true
      this.lessBtn = true
    },
  },
}
</script>

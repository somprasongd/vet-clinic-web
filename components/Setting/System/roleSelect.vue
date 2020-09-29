<template>
  <v-item-group v-model="selected">
    <v-row
      align="center"
      justify="center"
      :dense="this.$vuetify.breakpoint.xsOnly"
    >
      <v-col cols="12" sm="5">
        <v-card class="elevation-4" height="180">
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
                  @click="
                    toggle()
                    buttonSwitch()
                  "
                >
                  <span
                    :class="
                      active
                        ? 'white--text text-uppercase'
                        : 'black--text text-uppercase'
                    "
                  >
                    {{ item.rank }}
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
        <v-card class="elevation-4" height="180">
          <v-card-title class="pa-0 pl-5 pt-3">สิทธิที่เลือก</v-card-title>
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
                  @click="
                    toggle()
                    buttonSwitch()
                  "
                >
                  <span
                    :class="
                      active
                        ? 'white--text text-uppercase'
                        : 'black--text text-uppercase'
                    "
                    >{{ item.rank }}</span
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
  data() {
    return {
      selected: null,
      overBtn: true,
      lessBtn: true,
      rankList: {
        register: {
          id: 1,
          rank: 'register',
          state: false,
        },
        doctor: {
          id: 2,
          rank: 'doctor',
          state: false,
        },
        lab: {
          id: 3,
          rank: 'lab',
          state: false,
        },
        xray: {
          id: 4,
          rank: 'xray',
          state: false,
        },
        pharmacy: {
          id: 5,
          rank: 'pharmacy',
          state: false,
        },
        cashier: {
          id: 6,
          rank: 'cashier',
          state: false,
        },
      },
    }
  },
  computed: {
    selectedRank() {
      const array = []
      const id = []
      for (const rank in this.rankList) {
        if (this.rankList[rank].state === true) {
          array.push(this.rankList[rank])
          id.push(this.rankList[rank].id)
        }
      }
      this.$emit('rank', id)
      return array
    },
    allRank() {
      let rank
      const array = []
      for (rank in this.rankList) {
        if (this.rankList[rank].state === false) {
          array.push(this.rankList[rank])
        }
      }
      return array
    },
  },
  methods: {
    buttonSwitch() {
      if (this.selected == null) {
        this.overBtn = true
        this.lessBtn = true
      } else if (this.selected.state === false) {
        this.overBtn = false
        this.lessBtn = true
      } else if (this.selected.state === true) {
        this.overBtn = true
        this.lessBtn = false
      }
    },
    clickSelect() {
      this.rankList[this.selected.rank].state = !this.rankList[
        this.selected.rank
      ].state
      this.selected = null
      this.overBtn = true
      this.lessBtn = true
    },
  },
}
</script>

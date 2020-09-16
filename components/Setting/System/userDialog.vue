<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      class="v-btn--example"
      color="cusblue2"
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
      <v-card height="540">
        <h2 class="pa-5 pb-2">เพิ่ม/แก้ไข</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row dense>
            <v-col cols="6"
              ><v-text-field label="username"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field label="password"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field label="confirm password"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-checkbox label="ผู้ดูแลระบบ" color="cusblue2"></v-checkbox
            ></v-col>
          </v-row>
          <v-item-group v-model="selected">
            <v-row align="center" justify="center">
              <v-col cols="5">
                <v-card class="mb-3 elevation-4" height="225">
                  <v-card-title class="pa-0 pl-5 pt-3"
                    >สิทธิทั้งหมด</v-card-title
                  >
                  <v-divider></v-divider>

                  <v-item
                    v-for="item in allRank"
                    v-slot:default="{ active, toggle }"
                    :key="item.index"
                    :value="item"
                  >
                    <div class="pt-3 px-7">
                      <v-card
                        :color="active ? 'cusblue' : 'grey lighten-2'"
                        class="text-center elevation-0"
                        light
                        height="25"
                        width="40"
                        @click="
                          toggle()
                          buttonSwitch()
                        "
                      >
                        <span :class="active ? 'white--text' : 'black--text'">{{
                          item.rank
                        }}</span>
                      </v-card>
                    </div>
                  </v-item>
                </v-card>
              </v-col>
              <v-col class="px-2" cols="1">
                <v-btn
                  class="cusblue2 white--text"
                  :disabled="overBtn"
                  fab
                  small
                  depressed
                  @click="clickSelect"
                  ><v-icon>mdi-chevron-right</v-icon></v-btn
                ><br /><br />
                <v-btn
                  class="cusblue2 white--text"
                  :disabled="lessBtn"
                  fab
                  small
                  depressed
                  @click="clickSelect"
                  ><v-icon>mdi-chevron-left</v-icon></v-btn
                >
              </v-col>
              <v-col cols="5">
                <v-card class="mb-3 elevation-4" height="225">
                  <v-card-title class="pa-0 pl-5 pt-3"
                    >สิทธิที่เลือก</v-card-title
                  >
                  <v-divider></v-divider>

                  <v-item
                    v-for="item in selectedRank"
                    v-slot:default="{ active, toggle }"
                    :key="item.index"
                    :value="item"
                  >
                    <div class="pt-3 px-7">
                      <v-card
                        :color="active ? 'cusblue' : 'grey lighten-2'"
                        class="text-center elevation-0"
                        light
                        height="25"
                        width="40"
                        @click="
                          toggle()
                          buttonSwitch()
                        "
                      >
                        <span :class="active ? 'white--text' : 'black--text'">{{
                          item.rank
                        }}</span>
                      </v-card>
                    </div>
                  </v-item>
                </v-card>
              </v-col>
            </v-row>
          </v-item-group>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      selected: null,
      overBtn: true,
      lessBtn: true,
      rankList: {
        AA: {
          rank: 'AA',
          state: false,
        },
        BB: {
          rank: 'BB',
          state: true,
        },
        CC: {
          rank: 'CC',
          state: false,
        },
        DD: {
          rank: 'DD',
          state: false,
        },
      },
    }
  },
  computed: {
    selectedRank() {
      let rank
      const array = []
      for (rank in this.rankList) {
        if (this.rankList[rank].state === true) {
          array.push(this.rankList[rank])
        }
      }
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

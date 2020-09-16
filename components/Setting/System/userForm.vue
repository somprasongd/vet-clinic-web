<template>
  <div>
    <h3 class="pl-5 pt-3 font-weight-medium">ผู้ใช้งาน</h3>
    <v-divider class="darker-divider"></v-divider>
    <v-row class="pt-3" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-4" height="540">
          <div class="px-7 py-5">
            <v-text-field
              class="rounded-lg"
              color="cusblue"
              label="ค้นหา"
              append-icon="mdi-magnify"
              outlined
              single-line
              dense
              flat
              hide-details
            ></v-text-field>
          </div>
          <div class="px-7 py-5">
            <v-card-title class="pa-0 px-3 py-1">
              List
              <v-spacer></v-spacer>
              <v-btn
                class="cusblue3 float-right text-none"
                dark
                depressed
                @click.stop="newItemDialog = true"
                >New item</v-btn
              >
              <v-dialog v-model="newItemDialog" max-width="700">
                <v-card>
                  <h2 class="pa-5 pb-2">New Item</h2>
                  <v-divider class="darker-divider"></v-divider>
                  <div class="py-5 px-10">
                    <v-row dense>
                      <v-col cols="6">
                        <v-text-field
                          color="cusblue"
                          label="ชื่อ item"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          color="cusblue"
                          label="สถานะ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          color="cusblue"
                          label="จำนวน"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="cusblue2" text @click="newItemDialog = false"
                      >ยกเลิก</v-btn
                    >

                    <v-btn color="cusblue2" text @click="newItemDialog = false"
                      >ตกลง</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-divider></v-divider>
            <v-list class="pa-0 px-5">
              <v-list-item v-for="list in listItem" :key="list.index">
                <v-list-item-content>
                  <v-list-item-title> {{ list.item }} </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-btn class="mr-1" icon x-small>
                        <v-icon color="black">mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        class="ml-1"
                        icon
                        x-small
                        @click="confirmDel = true"
                      >
                        <v-icon color="black">mdi-trash-can</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
        </v-card>

        <v-dialog v-model="confirmDel" max-width="290">
          <v-card>
            <h2 class="pl-6 pt-3 pb-2">คุณแน่ใจหรือไม่?</h2>

            <v-card-text> คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้ </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red" text @click="confirmDel = false"> ลบ </v-btn>

              <v-btn color="grey" text @click="confirmDel = false">
                ยกเลิก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- <v-col cols="7">
                <v-card height="540">
                    <div class="px-7">
                        <v-row dense>
                            <v-col cols="6"><v-text-field label="username"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field label="password"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field label="confirm password"></v-text-field></v-col>
                            <v-col cols="6"><v-checkbox label="ผู้ดูแลระบบ" color="cusblue2"></v-checkbox></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="5">
                                <v-card class="mb-3 elevation-4" height="225">
                                    <v-card-title class="pa-0 pl-5 pt-3">สิทธิทั้งหมด</v-card-title>
                                    <v-divider></v-divider>
                                    <v-list class="pa-0" dense>
                                        <v-list-item class="px-7" v-for="item in allRank" :key="item.index">
                                                <span class="px-2 rounded" v-ripple style="border: 1px solid rgb(184, 184, 184);" @click="selectRank(item)">{{ item.rank }}</span>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-col>
                            <v-col class="px-2" cols="1">
                                <v-btn class="cusblue2 white--text" :disabled="overBtn" @click="clickSelect" fab  small depressed><v-icon>mdi-chevron-right</v-icon></v-btn><br><br>
                                <v-btn class="cusblue2 white--text" :disabled="lessBtn" @click="clickSelect" fab  small depressed><v-icon>mdi-chevron-left</v-icon></v-btn>
                            </v-col>
                            <v-col cols="5">
                                <v-card class="mb-3 elevation-4" height="225">
                                    <v-card-title class="pa-0 pl-5 pt-3">สิทธิที่เลือก</v-card-title>
                                    <v-divider></v-divider>
                                    <v-list class="pa-0" dense>
                                        <v-list-item class="px-7" v-for="item in selectedRank" :key="item.index">
                                                <span class="px-2 rounded" style="border: 1px solid rgb(184, 184, 184);" @click="unselectRank(item)">{{ item.rank }}</span>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="cusblue2--text text-none" text>New</v-btn>
                        <v-btn class="cusblue2--text text-none" text>Delete</v-btn>
                        <v-btn class="cusblue2--text text-none" text>Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col> -->
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDel: false,
      newItemDialog: false,
      listItem: [{ item: 'item 1' }, { item: 'item 2' }, { item: 'item 3' }],
    }
  },
}
</script>

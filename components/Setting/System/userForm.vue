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
                    <v-btn color="cusblue2" text @click="newItemDialog = false">
                      ยกเลิก
                    </v-btn>

                    <v-btn color="cusblue2" text @click="newItemDialog = false">
                      ตกลง
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-divider></v-divider>
            <v-list class="pa-0 px-5">
              <v-list-item v-for="list in alluser" :key="list.index">
                <v-list-item-content>
                  <v-list-item-title> {{ list.username }} </v-list-item-title>
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
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    alluser: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      // userList: this.alluser,
      confirmDel: false,
      newItemDialog: false,
      listItem: null,
    }
  },
}
</script>

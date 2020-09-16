<template>
  <div>
    <h3 class="pl-5 pt-3 font-weight-medium">รายการตรวจ</h3>
    <v-divider class="darker-divider"></v-divider>
    <v-row class="pt-3" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-4" height="540">
          <div class="px-7 py-5">
            <v-row dense>
              <v-col cols="2"
                ><v-select
                  class="rounded-lg"
                  color="cusblue"
                  :items="type"
                  label="ประเภท"
                  light
                  outlined
                  rounded
                  dense
                  flat
                  hide-details
                ></v-select
              ></v-col>
              <v-col cols="10"
                ><v-text-field
                  class="rounded-lg"
                  color="cusblue"
                  label="ค้นหา"
                  append-icon="mdi-magnify"
                  outlined
                  single-line
                  dense
                  flat
                  hide-details
                ></v-text-field
              ></v-col>
            </v-row>
          </div>
          <div class="px-7 py-5">
            <v-card-title class="pa-0 px-3 py-1">
              ชื่อ/ประเภท
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
                    <div>
                        <v-row  class="px-7" dense>
                            <v-col cols="6"><v-text-field color="cusblue" label="รหัส"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="ชื่อ"></v-text-field></v-col>
                            <v-col cols="6"><v-select color="cusblue" :items="type" label="ประเภท" menu-props="auto" v-model="select"></v-select></v-col>
                        </v-row>
                        <v-divider class="dash-divider"></v-divider>

                        <v-row class="px-7" dense>
                            <v-col cols="6"><v-text-field color="cusblue" label="ราคาทุน"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="ราคาขาย"></v-text-field></v-col>
                        </v-row>
                        <v-divider class="dash-divider"></v-divider>

                        <div v-if="select == 'Labs'">
                            <v-row class="px-7" justify="center" align="center" dense>
                                <v-col cols="6"><v-checkbox label="Lab ชุด" color="cusblue2" v-model="LabSet"></v-checkbox></v-col>
                                <v-col class="align-center" cols="6">

                                    <v-row no-gutters justify="center" align="center" v-if="LabSet == true">
                                        <v-col cols="9"><v-text-field class="rounded-lg" color="cusblue" label="ค้นหา Labs" append-icon="mdi-magnify" outlined dense hide-details></v-text-field></v-col>
                                        <v-col cols="3"><v-btn class="ml-3" color="cusblue3" dark depressed>Add</v-btn></v-col>
                                    </v-row>

                                    <v-row no-gutters justify="center" align="center" v-else-if="LabSet == false">
                                        <v-col cols="12">
                                            <v-select
                                            class="rounded-lg"
                                            color="cusblue"
                                            :items="groupLab"
                                            label="กลุ่ม Lab"
                                            dense
                                            outlined
                                            hide-details
                                            ></v-select>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                            
                            <div class="px-7" v-if="LabSet == true">
                                <span class="font-weight-medium">รายการ Lab ย่อย</span>
                                <span class="font-weight-medium float-right">Action</span><br>
                                <v-divider class="medium-divider"></v-divider>
                                <div class="mt-3" v-for="item in LabList" :key="item.index">
                                    <span>{{ item.name }}</span>
                                    <v-btn class="float-right mr-1 mt-n2" color="red" dark icon depressed>
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                    <v-divider></v-divider>
                                </div>
                            </div>

                            <v-row class="px-7" v-else-if="LabSet == false" dense>
                                <v-col cols="6"><v-select color="cusblue" :items="LabResult" label="ประเภทผล Lab" menu-props="auto"></v-select></v-col>
                                <v-col cols="6"></v-col>
                                <v-col cols="6"><v-text-field color="cusblue" label="ราคาขาย"></v-text-field></v-col>
                                <v-col cols="6"><v-text-field color="cusblue" label="ราคาขาย"></v-text-field></v-col>
                                <v-col cols="6"><v-text-field color="cusblue" label="ราคาขาย"></v-text-field></v-col>
                            </v-row>

                        </div>

                        <v-row class="px-7" v-else-if="select == 'ยา'" dense>
                            <v-col cols="6"><v-text-field color="cusblue" label="Instruction"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="Dose"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="Unit"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="Frequency"></v-text-field></v-col>
                            <v-col cols="6"><v-text-field color="cusblue" label="Caution"></v-text-field></v-col>
                        </v-row>
                    </div>

                    <v-card-actions style="position:absolute; bottom:0px; right:0px">
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
      type: ['type', 'type1'],
    }
  },
}
</script>

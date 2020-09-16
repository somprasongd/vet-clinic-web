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
      <v-card>
        <h2 class="pa-5 pb-2">แก้ไข</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row dense>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="รหัส"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="ชื่อ"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-select
                v-model="select"
                color="cusblue"
                :items="type"
                label="ประเภท"
                menu-props="auto"
              ></v-select
            ></v-col>
          </v-row>
        </div>

        <v-divider class="dash-divider"></v-divider>

        <div class="px-7">
          <v-row dense>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="ราคาทุน"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="ราคาขาย"></v-text-field
            ></v-col>
          </v-row>
        </div>

        <v-divider class="dash-divider"></v-divider>

        <div class="px-7">
          <div v-if="select == 'Labs'">
            <v-row justify="center" align="center" dense>
              <v-col cols="6"
                ><v-checkbox
                  v-model="LabSet"
                  label="Lab ชุด"
                  color="cusblue2"
                ></v-checkbox
              ></v-col>
              <v-col class="align-center" cols="6">
                <v-row
                  v-if="LabSet == true"
                  no-gutters
                  justify="center"
                  align="center"
                >
                  <v-col cols="9"
                    ><v-text-field
                      class="rounded-lg"
                      color="cusblue"
                      label="ค้นหา Labs"
                      append-icon="mdi-magnify"
                      outlined
                      dense
                      hide-details
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3"
                    ><v-btn class="ml-3" color="cusblue3" dark depressed
                      >Add</v-btn
                    ></v-col
                  >
                </v-row>

                <v-row
                  v-else-if="LabSet == false"
                  no-gutters
                  justify="center"
                  align="center"
                >
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

            <div v-if="LabSet == true">
              <span class="font-weight-medium">รายการ Lab ย่อย</span>
              <span class="font-weight-medium float-right">Action</span><br />
              <v-divider class="medium-divider"></v-divider>
              <div v-for="item in LabList" :key="item.index" class="mt-3">
                <span>{{ item.name }}</span>
                <v-btn
                  class="float-right mr-1 mt-n2"
                  color="red"
                  dark
                  icon
                  depressed
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
                <v-divider></v-divider>
              </div>
            </div>

            <v-row v-else-if="LabSet == false" dense>
              <v-col cols="6"
                ><v-select
                  color="cusblue"
                  :items="LabResult"
                  label="ประเภทผล Lab"
                  menu-props="auto"
                ></v-select
              ></v-col>
              <v-col cols="6"></v-col>
              <v-col cols="6"
                ><v-text-field color="cusblue" label="ราคาขาย"></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field color="cusblue" label="ราคาขาย"></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field color="cusblue" label="ราคาขาย"></v-text-field
              ></v-col>
            </v-row>
          </div>

          <v-row v-else-if="select == 'ยา'" dense>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="Instruction"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="Dose"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="Unit"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="Frequency"></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-text-field color="cusblue" label="Caution"></v-text-field
            ></v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>New</v-btn>
          <v-btn class="cusblue2--text text-none" text>Delete</v-btn>
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
      LabSet: true,
      select: 'Labs',
      type: ['Labs', 'ยา'],
      groupLab: ['กลุ่ม Lab', 'กลุ่ม Lab'],
      LabList: [{ name: 'Lab A' }, { name: 'Lab B' }],
      LabResult: ['Labs', 'ยา'],
    }
  },
}
</script>

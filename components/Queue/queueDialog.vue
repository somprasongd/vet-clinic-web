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
      <v-icon>mdi-calendar-month</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="450" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">ตารางนัดหมาย</h2>
        <v-divider></v-divider>

        <div class="px-10 pb-10">
          <v-row align="center" justify="center" dense>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menuDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    color="cusblue"
                    append-icon="mdi-calendar-month"
                    background-color="white"
                    v-bind="attrs"
                    label="วันที่นัดหมาย"
                    readonly
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  color="cusblue"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="cusblue"
                background-color="white"
                label="ชื่อ"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-divider class="darker-divider"></v-divider>

        <v-card-text class="pa-0" style="height: 350px">
          <v-menu
            v-for="list in assignList"
            :key="list.owner"
            :offset-x="offset"
            max-width="200"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                class="py-5 px-10"
                link
                v-bind="attrs"
                style="border-bottom: 1px solid rgb(204, 204, 204)"
                v-on="on"
              >
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="3" class="font-weight-medium">เจ้าของ</v-col>
                  <v-col cols="1" class="font-weight-medium text-center"
                    >:</v-col
                  >
                  <v-col cols="8" class="font-weight-medium">{{
                    list.owner
                  }}</v-col>

                  <v-col cols="3">สัตว์เลี้ยง</v-col>
                  <v-col cols="1" class="text-center">:</v-col>
                  <v-col cols="8">{{ list.pet }}</v-col>

                  <v-col cols="3">นัดเพื่อ</v-col>
                  <v-col cols="1" class="text-center">:</v-col>
                  <v-col cols="8">{{ list.for }}</v-col>

                  <v-col cols="3">เวลา</v-col>
                  <v-col cols="1" class="text-center">:</v-col>
                  <v-col cols="8">{{ list.time }}</v-col>
                </v-row>
              </v-list-item>
            </template>

            <v-list class="pa-0">
              <div class="px-2 pt-3">
                <h3>ยืนยันเข้ารับบริการ?</h3>
                <v-divider></v-divider>
                <v-card-actions class="pa-0 pt-2">
                  <v-spacer></v-spacer>
                  <v-btn color="cusblue2" text @click="dialog = false"
                    >ยกเลิก</v-btn
                  >
                  <v-btn color="cusblue2" text @click="dialog = false"
                    >ตกลง</v-btn
                  >
                </v-card-actions>
              </div>
            </v-list>
          </v-menu>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
      date: null,
      menuDate: false,
      offset: true,
      assignList: [
        {
          owner: 'คนแรก',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
        {
          owner: 'คนสอง',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
        {
          owner: 'คนสาม',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
        {
          owner: 'คนสี่',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
        {
          owner: 'คนห้า',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
        {
          owner: 'คนหก',
          pet: 'สัตว์หนึ่ง (หมา)',
          for: 'ฉัดวัคซีน',
          time: '15.30 น.',
        },
      ],
    }
  },
}
</script>

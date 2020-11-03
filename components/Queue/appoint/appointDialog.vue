<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      :small="this.$vuetify.breakpoint.mobile"
      :large="!this.$vuetify.breakpoint.mobile"
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-calendar-month</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="500" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">แก้ไข</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row>
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
              <v-select
                color="cusblue"
                :items="type"
                label="ประเภทนัด"
                menu-props="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field color="cusblue" label="รายละเอียด"></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>คืนค่า</v-btn>
          <v-btn class="cusblue2--text text-none" text>บันทึก</v-btn>
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
      menuDate: false,
      date: null,
      type: ['DDDD', 'SSSS'],
    }
  },
}
</script>

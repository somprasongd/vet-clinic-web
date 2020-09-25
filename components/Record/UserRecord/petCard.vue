<template>
  <v-card class="elevation-5">
    <v-card-title>ข้อมูลสัตว์เลี้ยง</v-card-title>
    <v-divider class="darker-divider"></v-divider>

    <div v-if="customer.pet != ''">
      <div v-for="(pet, i) in customer.pet" :key="i">
        <v-row class="px-10 py-5" no-gutters>
          <v-col lg="1" md="2" cols="6">
            <v-row>
              <v-col class="text-center" cols="12">
                <v-avatar size="100">
                  <v-img
                    :src="require('~/assets/profile/003-dog-1.svg')"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col class="text-center" cols="12">
                <v-menu offset-y nudge-left="80">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-7"
                      color="cusblue2"
                      dark
                      v-bind="attrs"
                      icon
                      depressed
                      large
                      v-on="on"
                    >
                      <v-icon>mdi-dots-horizontal-circle</v-icon>
                    </v-btn>
                  </template>

                  <v-list width="200">
                    <v-list-item>
                      <h4>Action</h4>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-btn
                      v-for="actionBtn in actionBtns"
                      :key="actionBtn.text"
                      class="cusblue2--text"
                      block
                      text
                      tile
                      >{{ actionBtn.text }}</v-btn
                    >
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            class="pa-4 pb-1"
            lg="10"
            md="8"
            cols="12"
            :order="$vuetify.breakpoint.smAndDown ? 'last' : ''"
          >
            <v-row dense>
              <v-col lg="3" sm="4" cols="6">
                <span class="font-weight-medium">ชื่อสัตว์เลี้ยง :</span>
                <span class="font-weight-light">{{ pet.name }}</span>
              </v-col>
              <v-col lg="9" sm="8" cols="6">
                <span class="font-weight-medium">สถานะ :</span>
                <v-chip color="#4ec714" text-color="white" small label>{{
                  pet.status
                }}</v-chip>
              </v-col>
              <v-col lg="12" sm="4" cols="6">
                <span class="font-weight-medium">Microchip No :</span>
                <span class="font-weight-light">{{ pet.microship }}</span>
              </v-col>
              <v-col lg="3" sm="4" cols="6">
                <span class="font-weight-medium">วันเกิด :</span>
                <span class="font-weight-light">{{
                  $moment(pet.bd).format('DD/MM/YYYY')
                }}</span>
              </v-col>
              <v-col lg="2" sm="4" cols="6">
                <span class="font-weight-medium">อายุ :</span>
                <span class="font-weight-light">{{ calcAge(pet.bd) }}</span>
              </v-col>
              <v-col lg="2" sm="4" cols="6">
                <span class="font-weight-medium">ประเภท :</span>
                <span class="font-weight-light">{{ pet.type }}</span>
              </v-col>
              <v-col lg="2" sm="4" cols="6">
                <span class="font-weight-medium">สายพันธุ์ :</span>
                <span class="font-weight-light">{{ pet.specie }}</span>
              </v-col>
              <v-col lg sm="4" cols="6">
                <span class="font-weight-medium">เพศ :</span>
                <span class="font-weight-light">{{ pet.gender }}</span>
              </v-col>
              <v-col lg sm="4" cols="6">
                <span class="font-weight-medium">สี :</span>
                <span class="font-weight-light">{{ pet.color }}</span>
              </v-col>
              <v-col lg="3" sm="4" cols="6">
                <span class="font-weight-medium">ทำหมัน :</span>
                <span class="font-weight-light">{{ pet.sterile }}</span>
              </v-col>
              <v-col lg="9" sm="4" cols="6">
                <span class="font-weight-medium">ตำหนิ :</span>
                <span class="font-weight-light">{{ pet.scar }}</span>
              </v-col>
              <v-col lg="12" sm="12" cols="12">
                <span class="font-weight-medium">นัดหมายครั้งต่อไป :</span>
                <span class="font-weight-light">{{ pet.appoint }}</span>
              </v-col>
            </v-row>
          </v-col>

          <v-col lg="1" md="2" cols="6">
            <!-- <sendcheckDialog :user-detail="customer" :pet-id="pet.id" /> -->
            <v-btn
              class="ma-2 px-0"
              color="cusblue3"
              dark
              block
              depressed
              @click="onClickCheck(pet.id)"
            >
              ส่งตรวจ
            </v-btn>
            <v-btn
              class="ma-2 px-0"
              color="cusblue3"
              dark
              block
              depressed
              @click="onClickDepo(pet.id)"
            >
              ฝากเลี้ยง
            </v-btn>
            <v-btn
              class="ma-2 px-0"
              color="cusblue3"
              dark
              block
              depressed
              @click="onClickCheck(pet.id)"
            >
              ทำนัด
            </v-btn>
            <v-btn
              class="ma-2 px-0"
              color="cusblue3"
              dark
              block
              depressed
              @click="onClickCheck(pet.id)"
            >
              ประวัติการรักษา
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
      <sendcheckDialog ref="checkDialog" :user-detail="customer" />
      <depositDialog ref="depoDialog" :user-detail="customer" />
    </div>

    <div v-else class="text-center pa-15 grey--text">Not Found Pet</div>
  </v-card>
</template>

<script>
import sendcheckDialog from '@/components/Record/UserRecord/sendcheckDialog'
import depositDialog from '@/components/Record/UserRecord/depositDialog'
import moment from 'moment'
export default {
  components: {
    sendcheckDialog,
    depositDialog,
  },
  props: {
    customer: {
      default: null,
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      actionBtns: [
        { text: 'แก้ไขข้อมูล', action: '' },
        { text: 'แจ้งตาย', action: '' },
        { text: 'ลบข้อมูล', action: '' },
      ],
    }
  },
  methods: {
    onClickCheck(id) {
      console.log(id)
      this.$refs.checkDialog.open(id)
    },
    onClickDepo(id) {
      this.$refs.depoDialog.open(id)
    },
    calcAge(date) {
      const nowDate = moment()
      const pickDate = moment(date.toString(), 'YYYY-MM-DD')
      const dateDiff = moment.duration(nowDate.diff(pickDate))
      return (
        dateDiff.years() +
        ' ปี ' +
        dateDiff.months() +
        ' เดือน ' +
        dateDiff.days() +
        ' วัน '
      )
    },
  },
}
</script>

<template>
  <div>
    <v-card class="elevation-5">
      <v-row>
        <v-col col="6" class="py-0"
          ><v-card-title>ข้อมูลสัตว์เลี้ยง</v-card-title></v-col
        >
        <v-col col="6" class="py-0">
          <v-layout>
            <v-spacer></v-spacer>
            <v-switch
              v-model="isIncludeDeath"
              color="primary"
              label="ทั้งหมด"
              class="mr-2 pt-2"
            ></v-switch>
          </v-layout>
        </v-col>
      </v-row>
      <v-divider class="darker-divider"></v-divider>

      <div v-if="petList.length > 0">
        <div v-for="(pet, i) in petList" :key="i">
          <v-row class="px-10 py-5" no-gutters>
            <v-col lg="1" md="2" cols="6">
              <v-row>
                <v-col class="text-center" cols="12">
                  <userAvatar
                    :avatarid="pet.id.toString()"
                    :avatars="getPetAvatar(pet.id)"
                    type-avatar="pets"
                    :size="100"
                    :delete-img="false"
                    :border-color="pet.death ? '#E64A19' : '#1E88E5'"
                    :upload-img="!pet.death"
                  />
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
                        class="cusblue2--text"
                        :disabled="pet.death"
                        block
                        text
                        tile
                        @click="$emit('update', pet)"
                      >
                        แก้ไขข้อมูล
                      </v-btn>
                      <v-btn
                        class="cusblue2--text"
                        block
                        text
                        tile
                        @click="petDead(pet.id, pet.death ? false : true)"
                      >
                        {{ pet.death ? 'ยกเลิกแจ้งตาย' : 'แจ้งตาย' }}
                      </v-btn>
                      <v-btn
                        class="cusblue2--text"
                        :disabled="pet.death"
                        block
                        text
                        tile
                        @click="changeOwner(pet.id)"
                      >
                        เปลี่ยนเจ้าของ
                      </v-btn>
                      <v-btn
                        class="cusblue2--text"
                        block
                        text
                        tile
                        @click="deletePet(pet.id)"
                      >
                        ลบข้อมูล
                      </v-btn>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              class="pa-4 pt-6"
              lg="10"
              md="8"
              cols="12"
              :order="$vuetify.breakpoint.smAndDown ? 'last' : ''"
            >
              <v-row dense>
                <v-col lg="4" sm="6" cols="6" class="order-first">
                  <span class="font-weight-medium">ชื่อสัตว์เลี้ยง :</span>
                  <span class="font-weight-light">{{ pet.name }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="$vuetify.breakpoint.mdAndDown ? 'order-2' : 'order-2'"
                >
                  <span class="font-weight-medium">อายุ :</span>
                  <span class="font-weight-light">{{
                    calcAge(pet.birthDate)
                  }}</span>
                </v-col>
                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="$vuetify.breakpoint.mdAndDown ? 'order-4' : 'order-3'"
                >
                  <span class="font-weight-medium">วันเกิด :</span>
                  <span class="font-weight-light">{{
                    $moment(pet.birthDate).format('DD/MM/YYYY')
                  }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="$vuetify.breakpoint.mdAndDown ? 'order-3' : 'order-4'"
                >
                  <span class="font-weight-medium">ประเภท :</span>
                  <span class="font-weight-light">{{ pet.type.label }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="$vuetify.breakpoint.mdAndDown ? 'order-5' : 'order-7'"
                >
                  <span class="font-weight-medium">สายพันธุ์ :</span>
                  <span class="font-weight-light">{{ pet.breed }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="
                    $vuetify.breakpoint.mdAndDown ? 'order-7' : 'order-10'
                  "
                >
                  <span class="font-weight-medium">เพศ :</span>
                  <span class="font-weight-light">{{ pet.gender.label }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="
                    $vuetify.breakpoint.mdAndDown ? 'order-11' : 'order-5'
                  "
                >
                  <span class="font-weight-medium">ทำหมัน :</span>
                  <span class="font-weight-light">{{
                    pet.sterilization ? 'ทำแล้ว' : 'ยังไม่ทำ'
                  }}</span>
                </v-col>

                <v-col
                  lg="8"
                  sm="12"
                  cols="12"
                  :class="$vuetify.breakpoint.mdAndDown ? 'order-9' : 'order-8'"
                >
                  <span class="font-weight-medium">สี :</span>
                  <span class="font-weight-light">{{ pet.color }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="
                    $vuetify.breakpoint.mdAndDown ? 'order-6' : 'order-11'
                  "
                >
                  <span class="font-weight-medium">ตำหนิ :</span>
                  <span class="font-weight-light">{{ pet.earmark }}</span>
                </v-col>
                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="
                    $vuetify.breakpoint.mdAndDown ? 'order-8' : 'order-12'
                  "
                >
                  <span class="font-weight-medium">Microchip No :</span>
                  <span class="font-weight-light">{{ pet.microchipNo }}</span>
                </v-col>

                <v-col
                  lg="4"
                  sm="6"
                  cols="6"
                  :class="
                    $vuetify.breakpoint.mdAndDown ? 'order-12' : 'order-6'
                  "
                >
                  <span class="font-weight-medium">นัดหมายครั้งต่อไป :</span>
                  <span class="font-weight-light">
                    {{
                      pet.nextAppoint === ''
                        ? ''
                        : $moment(pet.nextAppoint).format('DD/MM/YYYY')
                    }}
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <v-col lg="1" md="2" cols="6">
              <!-- <sendcheckDialog :user-detail="customer" :pet-id="pet.id" /> -->
              <v-btn
                class="ma-2 px-0"
                :disabled="pet.death"
                color="cusblue3 white--text"
                block
                depressed
                @click="onClickCheck(pet.id)"
              >
                ส่งตรวจ
              </v-btn>
              <v-btn
                class="ma-2 px-0"
                :disabled="pet.death"
                color="cusblue3 white--text"
                block
                depressed
                @click="onClickDepo(pet.id)"
              >
                ฝากเลี้ยง
              </v-btn>
              <v-btn
                class="ma-2 px-0"
                :disabled="pet.death"
                color="cusblue3 white--text"
                block
                depressed
                @click="onClickApp(pet.id)"
              >
                ทำนัด
              </v-btn>
              <v-btn
                class="ma-2 px-0"
                color="cusblue3 white--text"
                block
                depressed
                :to="`/history/${pet.id}`"
              >
                ประวัติการรักษา
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
        <!-- -------Dialog------ -->
        <sendcheckDialog ref="checkDialog" />
        <depositDialog ref="depoDialog" />
        <appointDialog ref="appDialog" @updateAppoint="updateAppoint" />
        <confirmDialog ref="confirm" />
        <sendOwnerDialog ref="sendOwnerDialog" @removePet="updateOwner" />
      </div>

      <div v-else class="text-center pa-15 grey--text">Not Found Pet</div>
    </v-card>
  </div>
</template>

<script>
import sendcheckDialog from '@/components/Record/UserRecord/sendcheckDialog'
import depositDialog from '@/components/Record/UserRecord/depositDialog'
import appointDialog from '@/components/Record/UserRecord/appointDialog'
import sendOwnerDialog from '@/components/Record/UserRecord/sendOwnerDialog'
import confirmDialog from '@/components/Items/confirmDialog'
import userAvatar from '@/components/Setting/System/userAvatar'
import moment from 'moment'
export default {
  components: {
    sendcheckDialog,
    depositDialog,
    appointDialog,
    sendOwnerDialog,
    confirmDialog,
    userAvatar,
  },
  props: {
    pets: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return { isIncludeDeath: false }
  },
  computed: {
    petList() {
      if (this.pets === null || this.pets.length === 0) {
        return []
      }
      return this.pets.filter((pet) => {
        return this.isIncludeDeath || !pet.death
      })
    },
  },
  methods: {
    getPetAvatar(id) {
      return `${process.env.apiUrl}/api/pets/${id}/avatar`
    },
    onClickApp(id) {
      this.$refs.appDialog.open(id)
    },
    changeOwner(id) {
      this.$refs.sendOwnerDialog.open(id)
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
    updateOwner(id) {
      this.$emit('del', id)
    },
    async onClickCheck(id) {
      const check = await this.$axios.$get(`/api/visits//is-visit/${id}`, {
        progress: false,
      })
      if (check.status) {
        this.$refs.confirm
          .open(
            'ต้องการส่งอีกครั้งหรือไม่?',
            'สัตว์เลี้ยงตัวนี้ได้ถูกฝากเลี้ยงแล้วคุณต้องการส่งอีกครั้งหรือไม่',
            {
              width: 350,
              color: 'red',
            }
          )
          .then((confirm) => {
            this.$refs.checkDialog.open(id)
          })
          .catch(() => {})
      } else this.$refs.checkDialog.open(id)
    },
    async onClickDepo(id) {
      const check = await this.$axios.$get(`/api/visits/is-daycare/${id}`, {
        progress: false,
      })
      if (check.status) {
        this.$refs.confirm
          .open(
            'ต้องการส่งอีกครั้งหรือไม่?',
            'สัตว์เลี้ยงตัวนี้ได้ถูกส่งตรวจแล้วคุณต้องการส่งอีกครั้งหรือไม่',
            {
              width: 350,
              color: 'red',
            }
          )
          .then((confirm) => {
            this.$refs.depoDialog.open(id)
          })
          .catch(() => {})
      } else this.$refs.depoDialog.open(id)
    },
    deletePet(id) {
      this.$refs.confirm
        .open('คุณแน่ใจหรือไม่?', 'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้', {
          width: 290,
          color: 'red',
        })
        .then((confirm) => {
          this.$axios
            .$delete(`/api/pets/${id}`, { progress: false })
            .then((res) => {
              this.$emit('del', id)
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
    },
    petDead(id, isDeath) {
      this.$refs.confirm
        .open(
          'คุณแน่ใจหรือไม่?',
          `คุณแน่ใจหรือไม่ที่จะ${isDeath ? 'แจ้งตาย' : 'ยกเลิกแจ้งตาย'}`,
          {
            width: 290,
            color: 'red',
          }
        )
        .then((confirm) => {
          this.$axios
            .$patch(`/api/pets/${id}`, { death: isDeath }, { progress: false })
            .then((res) => {
              const index = this.pets.findIndex((pet) => {
                return pet.id === id
              })
              this.pets[index].death = isDeath
            })
            .catch((err) => {
              alert(err)
            })
        })
        .catch(() => {})
    },
    updateAppoint(val) {
      const index = this.pets.findIndex((pet) => {
        return pet.id === val.petId
      })
      if (this.pets[index].nextAppoint === '') {
        this.pets[index].nextAppoint = val.appointDate
      } else if (
        moment(val.appointDate) < moment(this.pets[index].nextAppoint)
      ) {
        this.pets[index].nextAppoint = val.appointDate
      }
    },
  },
}
</script>

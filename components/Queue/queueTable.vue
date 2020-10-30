<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="dessert"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <template v-slot:[`item.id`]="{ item }">
        <div class="text-center">
          {{ orderNum(dessert, item.id) }}
        </div>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <div v-if="item.visitStatus.id !== 6" class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none text-truncate"
            :to="
              item.visitStatus.id === 6 || item.visitStatus.id === 9
                ? '/queue/' + item.id + '/checklist'
                : '/queue/' + item.id
            "
            >{{ item.pet.owner.name }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon>
          </nuxt-link>
        </div>
        <div v-else>{{ item.pet.owner.name }}</div>
      </template>
      <template v-slot:[`item.pet`]="{ item }">
        <div>{{ item.pet.name + ' (' + item.pet.type + ')' }}</div>
      </template>
      <template v-slot:[`item.time`]="{ item }">
        <div>{{ $moment(item.visitAt).fromNow() }}</div>
      </template>
      <template v-slot:[`item.important`]="{ item }">
        <div>{{ item.visitPriority.label }}</div>
      </template>
      <template v-slot:[`item.doctor`]="{ item }">
        <div>{{ item.doctor !== null ? item.doctor.name : '' }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.visitStatus.id)" dark small label>
          {{ item.visitStatus.label }}
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu :offset-x="offset" nudge-left="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="cusblue2"
              dark
              v-bind="attrs"
              icon
              depressed
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
            <!-- OPD & IPD -->
            <div v-if="item.visitType.id === 1 || item.visitType.id === 2">
              <!-- รอตรวจ -->
              <div v-if="item.visitStatus.id === 1">
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 2, item.visitStatus.id)"
                >
                  เข้ารับการตรวจ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="
                    openSendDocs(
                      item.doctor !== null ? item.doctor.name : 'none',
                      item.id
                    )
                  "
                >
                  ส่งต่อ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 8, item.visitStatus.id)"
                >
                  ยกเลิกการรักษา
                </v-btn>
              </div>
              <!-- ตรวจรักษา -->
              <div v-else-if="item.visitStatus.id === 2">
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 3, item.visitStatus.id)"
                >
                  รอผลตรวจ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6, item.visitStatus.id)"
                >
                  จบการรักษา
                </v-btn>
              </div>
              <!-- รอผลตรวจ -->
              <div v-else-if="item.visitStatus.id === 3">
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 4, item.visitStatus.id)"
                >
                  รายงานผล
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6, item.visitStatus.id)"
                >
                  จบการรักษา
                </v-btn>
              </div>
              <!-- รายงานผล -->
              <div v-else-if="item.visitStatus.id === 4">
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 3, item.visitStatus.id)"
                >
                  รอผลตรวจ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6, item.visitStatus.id)"
                >
                  จบการรักษา
                </v-btn>
              </div>
              <!-- รอชำระเงิน -->
              <div v-else>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="discharge(item.id)"
                >
                  รับชำระเงิน
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 7, item.visitStatus.id)"
                >
                  จบการรับบริการ
                </v-btn>
              </div>
            </div>
            <!-- ฝากเลี้ยง -->
            <div v-else>
              <v-btn
                class="cusblue2--text"
                block
                text
                tile
                @click="backHome(item.id, item.visitAt)"
              >
                รับกลับบ้าน
              </v-btn>
              <v-btn
                class="cusblue2--text"
                block
                text
                tile
                @click="updateStatus(item.id, 8, item.visitStatus.id)"
              >
                ยกเลิก
              </v-btn>
            </div>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <sendDoctorDialog ref="sendDoctor" @updateDoctor="updateSend" />
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import sendDoctorDialog from '@/components/Queue/sendDoctorDialog'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    sendDoctorDialog,
    confirmDialog,
  },
  props: {
    dessert: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      offset: false,
      dialog: false,
      sendDoctor: false,

      headers: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
          class: 'font-weight-bold',
        },
        { text: 'เจ้าของ', value: 'name', sortable: false },
        { text: 'สัตว์เลี้ยง', value: 'pet', sortable: false },
        { text: 'ระยะเวลา', value: 'time', sortable: false },
        { text: 'ความสำคัญ', value: 'important', sortable: false },
        { text: 'แพทย์', value: 'doctor', sortable: false },
        { text: 'สถานะ', value: 'status', align: 'left', sortable: false },
        { text: 'Action', value: 'action', align: 'center', sortable: false },
      ],
    }
  },
  computed: {
    //
  },
  methods: {
    backHome(id, date) {
      console.log(id)
      console.log(date)
    },
    openSendDocs(name, id) {
      this.$refs.sendDoctor.open(name, id)
    },
    updateSend(res) {
      this.$emit('update', res)
    },
    orderNum(data, id) {
      return (
        data
          .map(function (x) {
            return x.id
          })
          .indexOf(id) + 1
      )
    },
    // ใช้เปลี่ยนสี Status
    getColor(status) {
      if (status === 1) return 'rgb(255, 98, 98)'
      else if (status === 2) return 'rgb(255, 191, 72)'
      else if (status === 3) return 'rgb(79, 155, 255)'
      else if (status === 4) return 'rgb(214, 185, 81)'
      else if (status === 9) return 'rgb(255, 145, 98)'
      else return 'rgb(87, 243, 87)'
    },
    updateStatus(id, status, statId) {
      this.$refs.confirm
        .open(
          `ยืนยัน${
            status === 2
              ? 'เข้ารับการตรวจ'
              : status === 3
              ? 'การรอผลตรวจ'
              : status === 4
              ? 'การรายงานผล'
              : status === 7
              ? 'การจบการรับบริการ'
              : status === 8 && statId === 9
              ? 'ยกเลิกการฝาก'
              : status === 8
              ? 'ยกเลิกการรักษา'
              : 'การจบการรักษา'
          }?`,
          `ต้องการยืนยัน${
            status === 2
              ? 'เข้ารับการตรวจ'
              : status === 3
              ? 'การรอผลตรวจ'
              : status === 4
              ? 'การรายงานผล'
              : status === 7
              ? 'การจบการรับบริการ'
              : status === 8 && statId === 9
              ? 'ยกเลิกการฝากเลี้ยง'
              : status === 8
              ? 'ยกเลิกการรักษา'
              : 'การจบการรักษา'
          }ใช่หรือไม่`,
          {
            width: 290,
            color:
              status === 8
                ? 'red'
                : status === 3
                ? 'primary'
                : status === 4
                ? 'rgb(214, 185, 81)'
                : 'green',
          }
        )
        .then((confirm) => {
          this.$axios
            .$patch(
              `/api/visits/${id}`,
              { visitStatusId: status },
              { progress: false }
            )
            .then((res) => {
              if (status === 2) {
                this.$router.push(`/queue/${id}`)
              } else if (status === 8) {
                this.$emit('delete', id)
                this.cancelQueueDialog = false
              } else {
                this.$emit('updateStatus', {
                  visitId: id,
                  visitStatusId: status,
                })
              }
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
    },
    discharge(id) {
      this.$refs.confirm
        .open(`ยืนยันการจบการรับชำระ?`, `ต้องการยืนยันรับชำระเงินใช่หรือไม่`, {
          width: 300,
          color: 'green',
        })
        .then((confirm) => {
          this.$axios
            .$patch(`/api/visits/${id}/status/discharge`, null, {
              progress: false,
            })
            .then((res) => {
              this.$router.push('/pos/' + res.id)
            })
            .catch((error) => {
              alert(error)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

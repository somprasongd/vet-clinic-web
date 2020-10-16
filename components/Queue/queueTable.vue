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
        <div class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none text-truncate"
            :to="
              item.visitStatus.id === 6
                ? '/queue/' + item.id + '/checklist'
                : '/queue/' + item.id
            "
            >{{ item.pet.owner.name }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon></nuxt-link
          >
        </div>
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
            <!-- OPD -->
            <div v-if="item.visitType.id === 1">
              <!-- รอตรวจ -->
              <div v-if="item.visitStatus.id === 1">
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 2)"
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
                  @click="confirmCancel(item.id)"
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
                  @click="updateStatus(item.id, 3)"
                >
                  รอผลตรวจ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6)"
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
                  @click="updateStatus(item.id, 4)"
                >
                  รายงานผล
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6)"
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
                  @click="updateStatus(item.id, 3)"
                >
                  รอผลตรวจ
                </v-btn>
                <v-btn
                  class="cusblue2--text"
                  block
                  text
                  tile
                  @click="updateStatus(item.id, 6)"
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
                  @click="updateStatus(item.id, 7)"
                >
                  จบการรับบริการ
                </v-btn>
              </div>
            </div>
            <!-- IPD -->
            <div v-else-if="item.visitType.id === 2"></div>
            <!-- ฝากเลี้ยง -->
            <div v-else></div>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="cancelQueueDialog" max-width="290">
      <v-card>
        <h2 class="pl-6 pt-3 pb-2">คุณแน่ใจหรือไม่?</h2>
        <v-card-text> คุณแน่ใจหรือไม่ที่จะยกเลิกการรักษา </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="updateStatus(cancelId, 8)">
            ใช่
          </v-btn>
          <v-btn color="grey" text @click="petDeath.petDeathDialog = false">
            ไม่
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <sendDoctorDialog ref="sendDoctor" @updateDoctor="updateSend" />
  </div>
</template>

<script>
import sendDoctorDialog from '@/components/Queue/sendDoctorDialog'
export default {
  components: {
    sendDoctorDialog,
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

      cancelQueueDialog: false,
      cancelId: '',

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
    // startCheck(id) {
    //   this.$axios
    //     .$patch(`/api/visits/${id}`, { visitStatusId: 2 })
    //     .then((res) => {
    //       this.$router.push(`/queue/${id}`)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    confirmCancel(id) {
      this.cancelId = id
      this.cancelQueueDialog = true
    },
    // cancelQueue(id) {
    //   this.$axios
    //     .$patch(`/api/visits/${id}`, { visitStatusId: 8 }, { progress: false })
    //     .then((res) => {
    //       this.$emit('delete', id)
    //       this.cancelQueueDialog = false
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    // endCheck(id) {
    //   this.$axios
    //     .$patch(`/api/visits/${id}`, { visitStatusId: 3 }, { progress: false })
    //     .then((res) => {
    //       this.$emit('update', id)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    updateStatus(id, status) {
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
            this.$emit('updateStatus', { visitId: id, visitStatusId: status })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

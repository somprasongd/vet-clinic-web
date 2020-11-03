<template>
  <div>
    <v-simple-table v-if="pets.length" dense fixed-header max-height="200">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center" width="115">ลำดับ</th>
            <th class="text-left">ชื่อสัตว์เลี้ยง</th>
            <th class="text-left">ประเภท</th>
            <th class="text-left">เพศ</th>
            <th class="text-left">สี</th>
            <th class="text-left" width="60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in pets" :key="pet.id">
            <td class="text-center">{{ orderNum(pets, pet.id) }}</td>
            <td>{{ pet.name }}</td>
            <td>{{ pet.type.label }}</td>
            <td>{{ pet.gender.label }}</td>
            <td>{{ pet.color }}</td>
            <td>
              <v-menu :offset-x="offset" nudge-left="150">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="cusblue2 white--text"
                    v-bind="attrs"
                    icon
                    depressed
                    v-on="on"
                  >
                    <v-icon>mdi-dots-horizontal-circle</v-icon>
                  </v-btn>
                </template>
                <v-list width="150">
                  <v-list-item dense>
                    <h5>Action</h5>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-btn
                    class="cusblue2--text"
                    block
                    text
                    tile
                    small
                    @click="onClickCheck(pet.id)"
                  >
                    ส่งตรวจ
                  </v-btn>
                  <v-btn
                    class="cusblue2--text"
                    block
                    text
                    tile
                    small
                    @click="onClickDepo(pet.id)"
                  >
                    ฝากเลี้ยง
                  </v-btn>
                  <v-btn
                    class="cusblue2--text"
                    block
                    text
                    tile
                    small
                    @click="onClickApp(pet.id)"
                  >
                    ทำนัด
                  </v-btn>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="text-center pa-8 grey--text">Not Found Pet</div>
    <sendcheckDialog ref="checkDialog" />
    <depositDialog ref="depoDialog" />
    <appointDialog ref="appDialog" />
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import confirmDialog from '@/components/Items/confirmDialog'
import sendcheckDialog from '@/components/Record/UserRecord/sendcheckDialog'
import depositDialog from '@/components/Record/UserRecord/depositDialog'
import appointDialog from '@/components/Record/UserRecord/appointDialog'
export default {
  components: {
    confirmDialog,
    sendcheckDialog,
    depositDialog,
    appointDialog,
  },
  props: {
    pets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      petDetail: [],
    }
  },
  // async mounted() {
  //   const pet = await this.$axios.$get(
  //     `/api/pets?ownerId=${this.owner}&limit=0`,
  //     { progress: false }
  //   )
  //   this.petDetail = pet.results
  // },
  methods: {
    orderNum(data, id) {
      return (
        data
          .map(function (x) {
            return x.id
          })
          .indexOf(id) + 1
      )
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
    onClickApp(id) {
      this.$refs.appDialog.open(id)
    },
  },
}
</script>

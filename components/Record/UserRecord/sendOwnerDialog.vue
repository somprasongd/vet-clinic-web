<template>
  <v-dialog
    v-model="sendOwner"
    max-width="850"
    scrollable
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
    transition="dialog-transition"
  >
    <v-card>
      <h2 class="pa-5 pb-2">เปลี่ยนเจ้าของ</h2>
      <v-divider></v-divider>
      <v-card-text class="py-3 px-7">
        <v-row dense>
          <v-col cols="4">
            <v-select
              v-model="searchKey"
              :items="items"
              item-text="label"
              item-value="value"
              label="ตัวเลือก"
              outlined
              rounded
              dense
              hide-details
              return-object
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-text-field
              id="id"
              v-model="search"
              label="ค้นหา"
              outlined
              rounded
              dense
              hide-details
              @keydown.enter="searchOwner(search)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="member"
          class="elevation-1 my-1"
          disable-pagination
          fixed-header
          hide-default-footer
          mobile-breakpoint="0"
          :height="this.$vuetify.breakpoint.xsOnly ? '70vh' : '60vh'"
        >
          <template v-slot:body>
            <tbody>
              <tr
                v-for="item in member"
                :key="item.id"
                v-ripple="{ class: 'cusblue--text' }"
                style="transform: scale(1); cursor: pointer"
                :class="owner.id !== item.id ? '' : 'light-blue lighten-4'"
                @click="owner.id !== item.id ? onClickRow(item) : (owner = '')"
              >
                <td class="px-2 py-1">
                  <div>
                    <v-avatar size="36" left>
                      <v-img
                        :src="getOwnerAvatar(item.id)"
                        :lazy-src="
                          require('~/assets/profile/defaultProfile.svg')
                        "
                      ></v-img>
                    </v-avatar>
                    <span class="px-1">
                      {{ item.fullName }}
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    {{ item.tels.join() }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item.houseNo + ' ' + item.address }}
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="cusblue2"
          :disabled="loading"
          text
          @click="sendOwner = false"
        >
          ยกเลิก
        </v-btn>
        <v-btn
          color="cusblue2"
          :disabled="(owner === '' ? true : false) || loading"
          text
          @click="submitSend"
        >
          <v-progress-circular
            v-show="loading"
            class="mr-2"
            indeterminate
            color="cusblue2"
            :size="15"
            :width="2"
          ></v-progress-circular>
          ยืนยัน
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    defaultSearchKey: {
      type: Object,
      required: false,
      default() {
        return { label: 'บ้านเลขที่', value: 'houseNo' }
      },
    },
  },
  data() {
    return {
      sendOwner: false,
      petId: '',
      search: null,
      owner: '',
      member: [],
      loading: false,
      loading1: false,
      timeout: null,
      searchKey: this.defaultSearchKey,
      items: [
        { label: 'บ้านเลขที่', value: 'houseNo' },
        { label: 'เบอร์โทร', value: 'tel' },
        { label: 'ชื่อเจ้าของ', value: 'firstName' },
        { label: 'นามสกุลเจ้าของ', value: 'lastName' },
        // { label: 'ชื่อสัตว์เลี้ยง', value: 'petName' },
        // { label: 'รหัสเจ้าของ', value: 'code' },
        // { label: 'Microchip No.', value: 'microchipNo' },
      ],
      headers: [
        {
          text: 'ชื่อเจ้าของ',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'เบอร์โทร',
          align: 'start',
          sortable: false,
          value: 'tel',
        },
        {
          text: 'ที่อยู่',
          align: 'start',
          sortable: false,
          value: 'address',
        },
      ],
    }
  },
  watch: {},
  methods: {
    open(id) {
      this.owner = ''
      this.petId = id
      this.sendOwner = true
    },
    getOwnerAvatar(id) {
      return `${process.env.apiUrl}/api/members/${id}/avatar`
    },
    searchOwner(val) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (val !== null && val !== '') {
          this.querySelections(val)
        } else {
          this.member = []
        }
      }, 500)
    },
    querySelections(v) {
      this.loading1 = true

      this.$axios
        .$get(`/api/members?${this.searchKey.value}=${v}`, {
          progress: false,
        })
        .then((res) => {
          this.owner = ''
          this.member = res.results
          this.loading1 = false
        })
        .catch((error) => {
          alert(error)
        })
    },
    submitSend() {
      this.loading = true
      this.$axios
        .$patch(`/api/pets/${this.petId}/owner/${this.owner.id}`, null, {
          progress: false,
        })
        .then((res) => {
          setTimeout(() => {
            this.sendOwner = false
            this.loading = false
            this.$emit('removePet', this.petId)
          }, 500)
        })
        .catch((error) => {
          this.loading = false
          alert(error)
        })
    },
    onClickRow(item) {
      this.owner = item
    },
  },
}
</script>

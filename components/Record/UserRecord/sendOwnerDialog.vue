<template>
  <v-dialog
    v-model="sendOwner"
    max-width="450"
    scrollable
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
    transition="dialog-transition"
  >
    <v-card>
      <h2 class="pa-5 pb-2">เปลี่ยนเจ้าของ</h2>
      <v-divider></v-divider>
      <v-card-text class="py-3 px-7">
        <v-autocomplete
          v-model="owner"
          :items="member"
          :search-input.sync="search"
          :loading="loading1"
          chips
          hide-no-data
          dense
          color="cusblue"
          label="เจ้าของใหม่"
          item-text="fullName"
          item-value="id"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              <v-avatar left>
                <v-img
                  :src="getOwnerAvatar(data.item.id)"
                  :lazy-src="require('~/assets/profile/defaultProfile.svg')"
                ></v-img>
              </v-avatar>
              {{ data.item.fullName }}
            </v-chip>
          </template>

          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <v-img
                  :src="getOwnerAvatar(data.item.id)"
                  :lazy-src="require('~/assets/profile/defaultProfile.svg')"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ data.item.fullName }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
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
        <v-btn color="cusblue2" :disabled="loading" text @click="submitSend">
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
    }
  },
  watch: {
    search(val) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (val !== null && val !== '') {
          this.querySelections(val)
        }
      }, 500)
    },
  },
  methods: {
    open(id) {
      this.owner = ''
      this.petId = id
      this.sendOwner = true
    },
    getOwnerAvatar(id) {
      return `${process.env.apiUrl}/api/members/${id}/avatar`
    },
    querySelections(v) {
      this.loading1 = true

      this.$axios
        .$get(`/api/members?firstName=${v}`, {
          progress: false,
        })
        .then((res) => {
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
        .$patch(`/api/pets/${this.petId}/owner/${this.owner}`, null, {
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
  },
}
</script>

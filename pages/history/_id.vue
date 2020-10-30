<template>
  <div>
    <hisNav @updateDate="updateDate" />

    <div v-if="showImages === false" class="custom-container">
      <v-row no-gutters>
        <v-col cols="12" md="2">
          <v-card class="elevation-4" height="100%">
            <v-list v-if="visit.length !== 0" class="py-5" dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in visit"
                  :key="i"
                  color="cusblue"
                  @click="showDetail(item)"
                >
                  <v-icon class="mr-3" color="cusblue3" x-small>
                    mdi-record
                  </v-icon>
                  <v-list-item-content>
                    <span>{{ $moment(item.visitAt).format('DD/MM/YYYY') }}</span
                    ><br />
                    <span>DX: {{ item.dx }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div v-else class="text-center pa-5 text--secondary">No data</div>
          </v-card>
        </v-col>
        <v-col
          v-if="!this.$vuetify.breakpoint.smAndDown"
          id="printMe"
          class="hidden-sm-and-down px-3"
          cols="12"
          md="10"
        >
          <printForm
            v-if="selectedVisit !== null"
            :visit="selectedVisit"
            :vs="vs"
            :lab="lab"
            :xray="xray"
            :order="order"
            @showimg="showImg"
          />
          <v-card v-else class="text-center elevation-4 custom-height">
            <v-icon
              class="gray--text text--disabled"
              style="font-size: 80px; top: 40%"
            >
              mdi-clipboard-text
            </v-icon>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        v-if="this.$vuetify.breakpoint.smAndDown"
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar flat dark color="cusblue">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Detail</v-toolbar-title>
          </v-toolbar>

          <v-card-text id="printMe" class="px-3">
            <printForm
              v-if="selectedVisit !== null"
              :visit="selectedVisit"
              :vs="vs"
              :lab="lab"
              :xray="xray"
              :order="order"
              @showimg="showImg"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div v-else class="custom-container">
      <div class="overflow-auto">
        <v-btn color="cusblue2" icon @click="showImages = false">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <span>
          {{ $moment(visit.visitAt).format('DD/MM/YYYY') }}
        </span>
        <span>DX : {{ visit.dx }}</span>
      </div>
      <images :images="images" />
    </div>
  </div>
</template>

<script>
import hisNav from '@/components/history/hisNav'
import printForm from '@/components/history/printForm'
import images from '@/components/Queue/insertImg/image'
import moment from 'moment'
export default {
  components: {
    hisNav,
    printForm,
    images,
  },
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 1 || role.id === 2
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  async asyncData({ $axios, params }) {
    const visit = await $axios.$get(
      `/api/visits?petId=${params.id}&dateRange0=${moment()
        .subtract(3, 'months')
        .toISOString()}&dateRange1=${moment().toISOString()}`,
      { progress: false }
    )
    return { visit: visit.results }
  },
  data() {
    return {
      dialog: false,
      selectedItem: null,
      date: null,

      selectedVisit: null,
      vs: null,
      lab: null,
      xray: null,
      order: null,

      showImages: false,
      images: [],
    }
  },
  methods: {
    showDetail(item) {
      this.selectedVisit = item
      this.getVS(item.id)
      this.getLab(item.id)
      this.getXray(item.id)
      this.getOrder(item.id)
      if (this.$vuetify.breakpoint.smAndDown) {
        this.dialog = true
      }
    },
    updateDate(val) {
      this.reset()
      this.date = val
      this.findVisit()
    },
    async findVisit() {
      const start = moment(this.date.startDate).add(1, 'days').toISOString()
      const end = moment(this.date.endDate).add(1, 'days').toISOString()
      const visit = await this.$axios.$get(
        `/api/visits?petId=${this.$route.params.id}&dateRange0=${start}&dateRange1=${end}`,
        { progress: false }
      )
      this.visit = visit.results
    },
    async getVS(id) {
      const vs = await this.$axios.$get(`/api/visits/${id}/vs`, {
        progress: false,
      })
      this.vs = vs
    },
    async getLab(id) {
      const lab = await this.$axios.$get(`/api/visits/${id}/results/lab`, {
        progress: false,
      })
      this.lab = lab.datas
    },
    async getXray(id) {
      const xray = await this.$axios.$get(`/api/visits/${id}/results/xray`, {
        progress: false,
      })
      this.xray = xray.datas
    },
    async getOrder(id) {
      const order = await this.$axios.$get(`/api/visits/${id}/orders`, {
        progress: false,
      })
      this.order = order.results
    },
    async showImg(id) {
      const img = await this.$axios.$get(`/api/visits/${id}/images`, {
        progress: false,
      })
      this.showImages = true
      this.images = img
    },
    reset() {
      this.dialog = false
      this.selectedItem = null
      this.date = null
      this.selectedVisit = null
      this.vs = null
      this.lab = null
      this.xray = null
      this.order = null
      this.showImages = false
      this.images = []
    },
  },
}
</script>

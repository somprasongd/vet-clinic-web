<template>
  <div>
    <div v-if="noCard" class="pa-3">
      <span class="font-weight-bold">Vital Sign</span>
      <v-row
        v-for="cardTb in loopOnce"
        :key="cardTb.index"
        class="text-left"
        align="center"
        justify="center"
        no-gutters
      >
        <v-col class="font-weight-medium" cols="5">{{ cardTb.header }}</v-col>
        <v-col cols="5">{{ cardTb.value }}</v-col>
        <v-col cols="2">{{ cardTb.unit }}</v-col>
      </v-row>
    </div>
    <v-card v-else class="my-1 mx-1" max-height="100%">
      <v-card-title class="pb-1 pt-3">
        Vital Sign
        <v-spacer></v-spacer>
        <v-btn color="cusblue2" icon @click="expand = !expand">
          <v-icon v-show="expand == false">mdi-chevron-down</v-icon>
          <v-icon v-show="expand == true">mdi-chevron-up</v-icon>
        </v-btn>
      </v-card-title>

      <v-expand-transition>
        <div v-show="expand">
          <v-divider class="darker-divider"></v-divider>

          <div class="pt-3 pb-4 px-7 card-content overflow-auto">
            <v-row
              v-for="cardTb in loopOnce"
              :key="cardTb.index"
              class="text-left"
              align="center"
              justify="center"
              dense
            >
              <v-col class="font-weight-medium" cols="5">
                {{ cardTb.header }}
              </v-col>
              <v-col cols="5">
                {{ cardTb.value }}
              </v-col>
              <v-col cols="2">{{ cardTb.unit }}</v-col>
            </v-row>
          </div>
          <v-card-actions class="customAction-right">
            <v-btn
              color="cusblue2"
              class="ma-0"
              :disabled="disable"
              text
              small
              @click.stop="openShow()"
            >
              Show All
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn
              color="cusblue2"
              class="ma-0"
              :disabled="disable"
              text
              fab
              x-small
              @click.stop="openCreate()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <VsDialog ref="vsDialog" :card-data="vs" />
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    noCard: {
      type: Boolean,
      required: false,
      default: false,
    },
    visitId: {
      type: Number,
      required: true,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      expand: !this.$vuetify.breakpoint.smAndDown,
      vs: [],
    }
  },
  computed: {
    loopOnce() {
      const temp = this.TempNotBlank(this.vs)
      const rr = this.RRNotBlank(this.vs)
      const sys = this.SysNotBlank(this.vs)
      const dia = this.DiaNotBlank(this.vs)
      const weight = this.WeightNotBlank(this.vs)
      const bp = sys === undefined && dia === undefined ? '' : sys + '/' + dia

      return {
        weight: {
          header: 'Weight',
          value: temp === null ? '-' : temp,
          unit: 'Kg',
        },
        temp: {
          header: 'Temp.',
          value: weight === null ? '-' : weight,
          unit: 'F',
        },
        bp: {
          header: 'BP',
          value: bp === null + '/' + null ? '-' : bp,
          unit: 'bpm',
        },
        r: { header: 'RR', value: rr === null ? '-' : rr, unit: '' },
      }
    },
  },
  async created() {
    const vs = await this.$axios.$get(`/api/visits/${this.visitId}/vs`, {
      progress: false,
    })
    this.vs = vs
  },
  methods: {
    openCreate() {
      this.$refs.vsDialog.openCreate()
    },
    openShow() {
      this.$refs.vsDialog.openShow()
    },
    TempNotBlank(data) {
      for (const num in data) {
        if (data[num].temp !== '' && data[num].temp !== null) {
          return data[num].temp
        }
      }
    },
    RRNotBlank(data) {
      for (const num in data) {
        if (data[num].rr !== '' && data[num].rr !== null) {
          return data[num].rr
        }
      }
    },
    SysNotBlank(data) {
      for (const num in data) {
        if (data[num].sys !== '' && data[num].sys !== null) {
          return data[num].sys
        }
      }
    },
    DiaNotBlank(data) {
      for (const num in data) {
        if (data[num].dia !== '' && data[num].dia !== null) {
          return data[num].dia
        }
      }
    },
    WeightNotBlank(data) {
      for (const num in data) {
        if (data[num].weight !== '' && data[num].weight !== null) {
          return data[num].weight
        }
      }
    },
  },
}
</script>

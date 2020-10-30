<template>
  <div>
    <div class="px-5 py-3 font-weight-medium">
      <div v-if="showPrint" class="overflow-auto">
        <span>
          {{ $moment(visit.visitAt).format('DD/MM/YYYY') }}
        </span>
        <span>DX : {{ visit.dx }}</span>
      </div>
      <div v-else style="text-align: center">
        <h3>
          {{ $moment(visit.visitAt).format('DD/MM/YYYY') }}<br />
          DX : {{ visit.dx }}
        </h3>
      </div>
      <v-btn
        v-if="showPrint"
        color="cusblue2"
        icon
        @click="$emit('showimg', visit.id)"
      >
        <v-icon>mdi-image-area</v-icon>
      </v-btn>
      <v-btn v-if="showPrint" color="cusblue2" text @click="print">
        <v-icon>mdi-printer</v-icon>Print
      </v-btn>
    </div>

    <hisCardTable
      :hide-tag="showPrint"
      :title="vsTitle"
      :heads="vsHead"
      :bodys="vs"
    >
      <template v-slot:body>
        <tr v-for="item in vs" :key="item.index">
          <td>{{ $moment(item.vitalSignAt).format('DD/MM/YYYY') }}</td>
          <td>{{ item.temp }}</td>
          <td>
            {{ item.bcs !== null ? item.bcs : '' }}
            {{ item.bcs !== null || item.dia !== null ? '/' : '' }}
            {{ item.dia !== null ? item.dia : '' }}
          </td>
          <td>{{ item.weight }}</td>
        </tr>
      </template>
    </hisCardTable>
    <hisCard :hide-tag="showPrint" :title="ccTitle" :content="visit.cc" />
    <hisCard :hide-tag="showPrint" :title="htTitle" :content="visit.ht" />
    <hisCard :hide-tag="showPrint" :title="peTitle" :content="visit.pe" />
    <hisCard :hide-tag="showPrint" :title="dxTitle" :content="visit.dx" />
    <hisCardTable
      :hide-tag="showPrint"
      :title="labTitle"
      :heads="labHead"
      :bodys="lab"
    >
      <template v-slot:body>
        <tr v-for="item in lab" :key="item.index">
          <td>{{ item.label }}</td>
          <td>{{ item.result }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.resultType }}</td>
          <td>{{ item.interpret }}</td>
          <td>
            <v-row
              v-if="/^[0-9]*\.?[0-9]+$/.test(item.result) && item.result !== ''"
              no-gutters
            >
              <!-- <v-col cols="4"> รายงานผล </v-col> -->
              <v-col>
                <labResult :num="item.interpretLevel" />
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </hisCardTable>
    <hisCardTable
      :hide-tag="showPrint"
      :title="xrayTitle"
      :heads="xrayHead"
      :bodys="xray"
    >
      <template v-slot:body>
        <tr v-for="item in xray" :key="item.index">
          <td>{{ item.label }}</td>
          <td>{{ item.result }}</td>
        </tr>
      </template>
    </hisCardTable>
    <hisCardTable
      :hide-tag="showPrint"
      :title="orderTitle"
      :heads="orderHead"
      :bodys="order"
    >
      <template v-slot:body>
        <tr v-for="item in order" :key="item.index">
          <td>{{ item.itemLabel }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </template>
    </hisCardTable>
  </div>
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'

import hisCard from '@/components/history/hisCard'
import hisCardTable from '@/components/history/hisCardTable'
import labResult from '@/components/Items/labResult'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    window.location.origin + '/kanit.css',
    window.location.origin + '/stylesheet.css',
    'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
  ],
}
Vue.use(VueHtmlToPaper, options)

export default {
  components: {
    hisCard,
    hisCardTable,
    labResult,
  },
  props: {
    visit: {
      type: Object,
      required: true,
    },
    vs: {
      type: Array,
      required: false,
      default: null,
    },
    lab: {
      type: Array,
      required: false,
      default: null,
    },
    xray: {
      type: Array,
      required: false,
      default: null,
    },
    order: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showPrint: true,

      vsTitle: 'Vital Sign',
      vsHead: ['Date time', 'Temp', 'BP', 'Weight'],

      ccTitle: 'CC (Chief Complaint)',
      htTitle: 'HT (History Ranking)',
      peTitle: 'PE (Physical Examination)',
      dxTitle: 'DX (Differential Diagnosis)',

      labTitle: 'Lab',
      labHead: [
        'Lab Name',
        'Result',
        'Unit',
        'Reference',
        'Interpret',
        'Status',
      ],

      xrayTitle: 'Xray',
      xrayHead: ['Xray Name', 'Result'],

      orderTitle: 'Order',
      orderHead: ['Order Name', 'QTY', 'Price'],
    }
  },
  methods: {
    print() {
      this.showPrint = false

      this.$nextTick(() => {
        this.$htmlToPaper('printMe', null, () => {
          // console.warn('done')
          this.showPrint = true
        })
      })
    },
  },
}
</script>

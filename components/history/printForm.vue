<template>
  <div>
    <div class="px-5 py-3 font-weight-medium">
      <span v-if="showPrint"> 12/19/2019 DX : xxxxxxxxxxxxxxxxxxxx </span>
      <div v-else style="text-align: center">
        <h3>
          12/19/2019<br />
          DX : xxxxxxxxxxxxxxxxxxxx
        </h3>
      </div>
      <v-btn v-if="showPrint" color="cusblue2" icon
        ><v-icon>mdi-image-area</v-icon></v-btn
      >
      <v-btn v-if="showPrint" color="cusblue2" text @click="print"
        ><v-icon>mdi-printer</v-icon>Print</v-btn
      >
    </div>

    <hisCardTable
      :hide-tag="showPrint"
      :title="vsTitle"
      :heads="vsHead"
      :bodys="vsBody"
    />
    <hisCard :hide-tag="showPrint" :title="ccTitle" :content="ccContent" />
    <hisCard :hide-tag="showPrint" :title="htTitle" :content="htContent" />
    <hisCard :hide-tag="showPrint" :title="peTitle" :content="peContent" />
    <hisCard :hide-tag="showPrint" :title="dxTitle" :content="dxContent" />
    <hisCardTable
      :hide-tag="showPrint"
      :title="labTitle"
      :heads="labHead"
      :bodys="labBody"
    >
      <template v-slot:body>
        <tr v-for="lab in labBody" :key="lab.index">
          <td>{{ lab.LabName }}</td>
          <td>{{ lab.Result }}</td>
          <td>{{ lab.Unit }}</td>
          <td>{{ lab.Reference }}</td>
          <td>{{ toStat(lab.Status) }}</td>
          <td>
            <v-row no-gutters>
              <v-col cols="4"> รายงานผล </v-col>
              <v-col>
                <labResult :num="lab.Status" />
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
      :bodys="xrayBody"
    />
    <hisCardTable
      :hide-tag="showPrint"
      :title="orderTitle"
      :heads="orderHead"
      :bodys="orderBody"
    />
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
    '/kanit.css',
    '/stylesheet.css',
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
  data() {
    return {
      showPrint: true,

      vsTitle: 'Vital Sign',
      vsHead: ['Date time', 'Temp', 'BP', 'Weight'],
      vsBody: [
        ['12:07', '100', '99', '10'],
        ['12:07', '100', '99', '10'],
        ['12:07', '100', '99', '10'],
        ['12:07', '100', '99', '10'],
      ],

      ccTitle: 'CC (Chief Complaint)',
      ccContent:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eveniet quaerat libero. Quae voluptas sint odit dicta tempora nihil quam quidem quasi blanditiis eaque. Fuga sequi delectus iure voluptate temporibus?',

      htTitle: 'HT (History Ranking)',
      htContent:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eveniet quaerat libero. Quae voluptas sint odit dicta tempora nihil quam quidem quasi blanditiis eaque. Fuga sequi delectus iure voluptate temporibus?',

      peTitle: 'PE (Physical Examination)',
      peContent:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eveniet quaerat libero. Quae voluptas sint odit dicta tempora nihil quam quidem quasi blanditiis eaque. Fuga sequi delectus iure voluptate temporibus?',

      dxTitle: 'DX (Differential Diagnosis)',
      dxContent:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eveniet quaerat libero. Quae voluptas sint odit dicta tempora nihil quam quidem quasi blanditiis eaque. Fuga sequi delectus iure voluptate temporibus?',

      labTitle: 'Lab',
      labHead: [
        'Lab Name',
        'Result',
        'Unit',
        'Reference',
        'Interpret',
        'Status',
      ],
      labBody: [
        {
          LabName: 'WBC (l01)',
          Result: '12121',
          Unit: 'ml/da/erw',
          Reference: '5-20',
          Status: 5,
        },
        {
          LabName: 'WBC (l01)',
          Result: '12121',
          Unit: 'ml/da/erw',
          Reference: '5-20',
          Status: 5,
        },
        {
          LabName: 'WBC (l01)',
          Result: '12121',
          Unit: 'ml/da/erw',
          Reference: '5-20',
          Status: 5,
        },
        {
          LabName: 'WBC (l01)',
          Result: '12121',
          Unit: 'ml/da/erw',
          Reference: '5-20',
          Status: 4,
        },
      ],

      xrayTitle: 'Xray',
      xrayHead: ['Xray Name', 'Result'],
      xrayBody: [
        ['xray ท้อง(x01)', 'asdasqqqqqq'],
        ['xray ท้อง(x01)', 'asdas'],
        ['xray ท้อง(x01)', 'asdas'],
        ['xray ท้อง(x01)', 'asdas'],
      ],

      orderTitle: 'Order',
      orderHead: ['Order Name', 'QTY', 'Price'],
      orderBody: [
        ['WBC (l01)', '1', '50'],
        ['xray ท้อง(x01)', '1', '50'],
      ],
    }
  },
  methods: {
    toStat(num) {
      switch (num) {
        case 1:
          return 'Low'
        case 2:
          return 'Nomal Low'
        case 3:
          return 'Nomal'
        case 4:
          return 'Nomal High'
        case 5:
          return 'High'
        default:
          // console.log(num)
          break
      }
    },
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

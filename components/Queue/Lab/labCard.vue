<template>
  <div>
    <v-data-table
      class="elevation-4 hidden-header"
      :headers="headers"
      :items="labItem"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <template v-slot:[`item.result`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.result"
          @save="saveResult(props.item)"
        >
          <span class="cusblue--text">
            {{ props.item.result }}
          </span>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.result"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.resultType`]="{ item }">
        <span>
          {{
            item.resultType === 'text'
              ? item.normalStr
              : item.normalMin + '-' + item.normalMax
          }}
        </span>
      </template>

      <template v-slot:[`item.interpret`]="{ item }">
        <v-row
          v-if="/^[0-9]*\.?[0-9]+$/.test(item.result) && item.result !== ''"
          no-gutters
        >
          <v-col cols="4">{{ item.interpret }}</v-col>
          <v-col cols="8">
            <labResult
              :num="item.interpretLevel === null ? 0 : item.interpretLevel"
            />
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`footer`]>
        <div class="pa-1 text-right" style="border-top: 1px solid #dadada">
          <v-row no-gutters align="center" justify="space-between">
            <v-btn
              v-if="isShowBtnReport"
              class="cusblue3 font-weight-regular text-capitalize"
              depressed
              dark
              @click="onClickReport"
            >
              รายงานผล
            </v-btn>
          </v-row>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import labResult from '@/components/Items/labResult'
export default {
  components: {
    labResult,
  },
  props: {
    labItem: {
      type: Array,
      required: false,
      default: null,
    },
    isShowBtnReport: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClickReport: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'รายการ',
          value: 'orderLabel',
          align: 'left',
          width: '180',
          sortable: false,
        },
        {
          text: 'ชื่อแล็บ',
          value: 'label',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ผล',
          value: 'result',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'หน่วย',
          value: 'unit',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'ค่าปกติ',
          value: 'resultType',
          align: 'center',
          width: '',
          sortable: false,
        },
        {
          text: 'แปลผล',
          value: 'interpret',
          align: 'left',
          width: '270',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    async saveResult(item) {
      const body = {
        result: item.result,
      }
      try {
        const result = await this.$axios.$patch(
          `/api/visits/${this.$route.params.queue}/results/lab/${item.id}`,
          body,
          { progress: false }
        )
        const targetIndex = this.labItem.findIndex(
          (labItem) => labItem.id === item.id
        )
        this.$set(this.labItem, targetIndex, result)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

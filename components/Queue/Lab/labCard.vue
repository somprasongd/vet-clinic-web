<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="labItem"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 110px)"
    >
      <template v-slot:[`item.result`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.result"
          @save="saveResult(props.item.id, props.item.result)"
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
          v-if="/^[0-9]*$/.test(item.result) && item.result !== ''"
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
    // toStat(num) {
    //   switch (num) {
    //     case 1:
    //       return 'Low'
    //     case 2:
    //       return 'Nomal Low'
    //     case 3:
    //       return 'Nomal'
    //     case 4:
    //       return 'Nomal High'
    //     case 5:
    //       return 'High'
    //     default:
    //       // console.log(num)
    //       break
    //   }
    // },
    saveResult(id, value) {
      const result = {
        result: value,
      }
      this.$axios
        .$patch(
          `/api/visits/${this.$route.params.queue}/results/lab/${id}`,
          result,
          { progress: false }
        )
        .then((res) => {
          console.log(res)
          const index = this.labItem.findIndex((lab) => lab.id === res.id)
          this.labItem[index].interpretLevel = res.interpretLevel
          this.labItem[index].interpret = res.interpret
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>

<template>
  <div>
    <v-data-table
      class="elevation-4 hidden-header"
      :headers="headers"
      :items="xrayItem"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
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
export default {
  props: {
    xrayItem: {
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
          value: 'label',
          align: 'left',
          width: '250',
          sortable: false,
        },
        {
          text: 'ผล',
          value: 'result',
          align: 'left',
          width: '',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    async saveResult(id, value) {
      const result = {
        result: value,
      }
      try {
        await this.$axios.$patch(
          `/api/visits/${this.$route.params.queue}/results/xray/${id}`,
          result,
          { progress: false }
        )
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

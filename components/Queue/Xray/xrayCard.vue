<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="xrayItem"
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
    saveResult(id, value) {
      const result = {
        result: value,
      }
      this.$axios
        .$patch(
          `/api/visits/${this.$route.params.queue}/results/xray/${id}`,
          result,
          { progress: false }
        )
        .then((res) => {
          // console.log(res)
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>

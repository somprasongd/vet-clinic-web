<template>
  <div>
    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="desserts"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 110px)"
    >
      <!-- <template v-slot:[`item.result`]="{ item }">
                <v-row no-gutters>
                    <v-col cols="9" sm="10" lg="11">
                        <v-text-field
                            class="long-textfild pr-3"
                            v-model="item.result"
                            solo
                            dense
                            hide-details
                            flat
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="3" sm="2" lg="1">
                        <v-btn class="text-none" color="cusblue3" dark>Save</v-btn>
                    </v-col>
                </v-row>
                
            </template> -->

      <template v-slot:[`item.result`]="props">
        <v-edit-dialog :return-value.sync="props.item.result">
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
  data() {
    return {
      headers: [
        {
          text: 'รายการ',
          value: 'list',
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
      desserts: [
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },

        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
        {
          list: 'XXXXXXXXXXXXXXXX',
          result: '20',
        },
      ],
    }
  },
}
</script>

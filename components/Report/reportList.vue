<template>
  <v-row no-gutters>
    <v-col cols="4" sm="3" md="2">
      <v-card class="elevation-4 custom-height">
        <v-list class="py-5" dense>
          <v-list-item
            v-for="item in reportList"
            :key="item.index"
            link
            :to="item.link"
          >
            <v-icon class="mr-3" color="cusblue3" x-small>mdi-record</v-icon>
            <v-list-item-content>
              {{ item.list }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="pl-5" cols="8" sm="9" md="10">
      <v-card class="text-center elevation-4 custom-height"
        ><v-icon
          class="gray--text text--disabled"
          style="font-size: 80px; top: 40%"
          >mdi-pdf-box</v-icon
        ></v-card
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      reportList: [
        { list: 'รายงาน A' },
        { list: 'รายงาน B' },
        { list: 'รายงาน C' },
        { list: 'รายงาน D' },
      ],
    }
  },
}
</script>

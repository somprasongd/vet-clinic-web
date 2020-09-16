<template>
  <div>
    <hisNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="12" md="2">
          <v-card class="elevation-4" height="100%">
            <v-list class="py-5" dense>
              <v-list-item
                v-for="item in historylist"
                :key="item.index"
                link
                :to="item.link"
                @click="dialog = true"
              >
                <v-icon class="mr-3" color="cusblue3" x-small
                  >mdi-record</v-icon
                >
                <v-list-item-content>
                  <span>{{ item.list }}</span
                  ><br />
                  <span>DX: {{ item.dx }}</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col id="printMe" class="hidden-sm-and-down px-3" cols="12" md="10">
          <printForm />
        </v-col>
      </v-row>
    </div>

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

        <v-card-text class="px-3">
          <printForm />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import hisNav from '@/components/history/hisNav'
import printForm from '@/components/history/printForm'

export default {
  components: {
    hisNav,
    printForm,
  },
  data() {
    return {
      historylist: [
        { list: '12/09/2019', dx: 'xxxx' },
        { list: '12/09/2019', dx: 'xxxx' },
      ],

      dialog: false,
    }
  },
  methods: {},
}
</script>

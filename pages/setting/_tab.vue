<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="4"
          md="3"
          lg="2"
        >
          <settingTab />
        </v-col>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="8"
          md="9"
          lg="10"
        >
          <Chief v-if="$route.params.tab == 'Chief-Complaint'" />
          <Differential
            v-else-if="$route.params.tab == 'Differential-Diagnosis'"
          />
          <History v-else-if="$route.params.tab == 'History-Ranking'" />
          <Physical v-else-if="$route.params.tab == 'Physical-Examination'" />

          <v-card v-else class="elevation-4 text-center" height="600">
            <v-icon
              class="gray--text text--disabled"
              style="font-size: 80px; top: 40%"
              >mdi-cog</v-icon
            >
          </v-card>
        </v-col>
      </v-row>
    </div>

    <helpDialog
      v-if="
        $route.params.tab == 'Chief-Complaint' ||
        $route.params.tab == 'Differential-Diagnosis' ||
        $route.params.tab == 'History-Ranking' ||
        $route.params.tab == 'Physical-Examination'
      "
    />
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'

import Chief from '@/components/Setting/Helper/Chief-Complaint'
import Differential from '@/components/Setting/Helper/Differential-Diagnosis'
import History from '@/components/Setting/Helper/History-Ranking'
import Physical from '@/components/Setting/Helper/Physical-Examination'

import helpDialog from '@/components/Setting/Helper/Template/helpDialog'

export default {
  components: {
    settingNav,
    settingTab,
    Chief,
    Differential,
    History,
    Physical,
    helpDialog,
  },
}
</script>

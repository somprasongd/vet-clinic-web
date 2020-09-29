<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="4" sm="3" md="2">
          <settingTab />
        </v-col>
        <v-col class="pl-5" cols="8" sm="9" md="10">
          <v-card class="elevation-4 text-center" height="600">
            <v-icon
              class="gray--text text--disabled"
              style="font-size: 80px; top: 40%"
              >mdi-cog</v-icon
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
export default {
  components: {
    settingNav,
    settingTab,
  },
}
</script>

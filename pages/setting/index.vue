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

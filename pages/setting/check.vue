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
          <Check />
        </v-col>
      </v-row>
    </div>
    <checkDialog />
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import Check from '@/components/Setting/Check/checkList'
import checkDialog from '@/components/Setting/Check/checkDialog'
export default {
  components: {
    settingNav,
    settingTab,
    Check,
    checkDialog,
  },
}
</script>

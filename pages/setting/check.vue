<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="4" sm="3" md="2">
          <settingTab />
        </v-col>
        <v-col class="pl-5" cols="8" sm="9" md="10">
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

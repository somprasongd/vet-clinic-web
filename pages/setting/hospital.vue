<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="4" sm="3" md="2">
          <settingTab />
        </v-col>
        <v-col class="pl-5" cols="8" sm="9" md="10">
          <hospitalForm />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import hospitalForm from '@/components/Setting/System/hospitalForm'
export default {
  components: {
    settingNav,
    settingTab,
    hospitalForm,
  },
}
</script>

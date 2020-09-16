<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col cols="4" sm="3" md="2">
          <v-card
            v-for="itemList in lists"
            :key="itemList.index"
            class="mb-3 elevation-4"
          >
            <v-card-title class="pa-0 pl-5 pt-3">{{
              itemList.title
            }}</v-card-title>
            <v-divider></v-divider>
            <v-list class="pa-0" dense>
              <v-list-item
                v-for="item in itemList.list"
                :key="item.index"
                link
                :to="item.link"
              >
                <v-icon class="mr-3" color="cusblue3" x-small
                  >mdi-record</v-icon
                >
                <v-list-item-content>
                  {{ item.name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col class="pl-5" cols="8" sm="9" md="10">
          <hospitalForm v-if="$route.params.tab == 'hospital'" />
          <userForm v-else-if="$route.params.tab == 'users'" />
          <Chief v-else-if="$route.params.tab == 'Chief-Complaint'" />
          <Differential
            v-else-if="$route.params.tab == 'Differential-Diagnosis'"
          />
          <History v-else-if="$route.params.tab == 'History-Ranking'" />
          <Physical v-else-if="$route.params.tab == 'Physical-Examination'" />
          <Check v-else-if="$route.params.tab == 'check'" />

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

    <div v-if="$route.params.tab != null && $route.params.tab != 'hospital'">
      <userDialog v-if="$route.params.tab == 'users'" />
      <checkDialog v-else-if="$route.params.tab == 'check'" />
      <helpDialog
        v-else-if="
          $route.params.tab == 'Chief-Complaint' ||
          $route.params.tab == 'Differential-Diagnosis' ||
          $route.params.tab == 'History-Ranking' ||
          $route.params.tab == 'Physical-Examination'
        "
      />
    </div>
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import hospitalForm from '@/components/Setting/System/hospitalForm'
import userForm from '@/components/Setting/System/userForm'
import Chief from '@/components/Setting/Helper/Chief-Complaint'
import Differential from '@/components/Setting/Helper/Differential-Diagnosis'
import History from '@/components/Setting/Helper/History-Ranking'
import Physical from '@/components/Setting/Helper/Physical-Examination'
import Check from '@/components/Setting/Check/checkList'

import userDialog from '@/components/Setting/System/userDialog'
import checkDialog from '@/components/Setting/Check/checkDialog'
import helpDialog from '@/components/Setting/Helper/Template/helpDialog'

export default {
  components: {
    settingNav,
    hospitalForm,
    userForm,
    Chief,
    Differential,
    History,
    Physical,
    Check,
    userDialog,
    checkDialog,
    helpDialog,
  },
  data() {
    return {
      lists: [
        {
          title: 'ระบบ',
          list: [
            { name: 'สถานพยาบาล', link: '/setting/hospital' },
            { name: 'ผู้ใช้งาน', link: '/setting/users' },
          ],
        },
        {
          title: 'ตัวช่วย',
          list: [
            { name: 'Chief Complaint', link: '/setting/Chief-Complaint' },
            {
              name: 'Differencial Diagnosis',
              link: '/setting/Differential-Diagnosis',
            },
            { name: 'History Ranking', link: '/setting/History-Ranking' },
            {
              name: 'Physical Examination',
              link: '/setting/Physical-Examination',
            },
          ],
        },
        {
          title: 'รายการตรวจ',
          list: [{ name: 'รายการตรวจ', link: '/setting/check' }],
        },
      ],
    }
  },
}
</script>

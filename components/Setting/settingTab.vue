<template>
  <div>
    <div v-if="this.$vuetify.breakpoint.smAndUp">
      <v-card
        v-for="itemList in lists"
        :key="itemList.index"
        class="mb-3 elevation-4"
      >
        <v-card-title class="pa-0 pl-5 pt-3">{{ itemList.title }}</v-card-title>
        <v-divider></v-divider>
        <v-list class="pa-0" dense>
          <v-list-item
            v-for="item in itemList.list"
            :key="item.index"
            link
            :to="item.link"
          >
            <v-icon class="mr-3" color="cusblue3" x-small>mdi-record</v-icon>
            <v-list-item-content>
              {{ item.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <!-- ************ mobile ************ -->
    <div v-else>
      <v-card class="mb-3 elevation-4">
        <v-tabs v-model="tab" color="cusblue3">
          <v-tab v-for="item in lists" :key="item.title">
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in lists" :key="item.title">
            <v-card flat>
              <v-list class="pa-0" dense>
                <v-list-item
                  v-for="list in item.list"
                  :key="list.index"
                  link
                  :to="list.link"
                >
                  <v-icon class="mr-3" color="cusblue3" x-small
                    >mdi-record</v-icon
                  >
                  <v-list-item-content>
                    {{ list.name }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
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
  created() {
    const path = this.$nuxt.$route.path
    if (
      path === '/setting/Chief-Complaint' ||
      path === '/setting/Differential-Diagnosis' ||
      path === '/setting/History-Ranking' ||
      path === '/setting/Physical-Examination'
    )
      this.tab = 1
    else if (path === '/setting/check') this.tab = 2
    else this.tab = 0
  },
}
</script>

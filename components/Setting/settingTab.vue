<template>
  <div>
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
</template>

<script>
export default {
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

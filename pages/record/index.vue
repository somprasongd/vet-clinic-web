<template>
  <div>
    <recordNav @search="filter" />

    <div class="custom-container">
      <recordTable :dessert="member" />
    </div>
    <!-- {{ this.customer }} -->
    <recordDialog :update="updateMember" />
  </div>
</template>

<script>
import recordNav from '@/components/Record/recordNav'
import recordTable from '@/components/Record/recordTable'
import recordDialog from '@/components/Record/recordDialog'
export default {
  components: {
    recordNav,
    recordTable,
    recordDialog,
  },
  async asyncData({ $axios }) {
    try {
      const member = await $axios.$get('/api/registration')
      return { member: member.results }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      allMemmber: [],
    }
  },
  computed: {
    customer() {
      return this.$store.getters.getCustomer
    },
  },
  methods: {
    async filter(val) {
      try {
        const filterMember = await this.$axios.$get(
          `/api/registration?limit=0${
            val[1] !== '' ? '&' + val[0] + '=' + val[1] : ''
          }`,
          { progress: false }
        )
        this.member = filterMember.results
        console.log(this.member)
      } catch (err) {
        console.log(err)
      }
    },
    updateMember(val) {
      //
    },
  },
}
</script>

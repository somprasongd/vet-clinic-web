<template>
  <div>
    <userRecordNav :title="oneMember.firstName + ' ' + oneMember.lastName" />

    <div class="custom-container">
      {{ oneMember }}
      <ownerCard :owner="oneMember" />
      <div class="pt-5">
        <!-- <petCard /> -->
      </div>
    </div>

    <petDialog />
  </div>
</template>

<script>
import userRecordNav from '@/components/Record/UserRecord/userRecordNav'
import ownerCard from '@/components/Record/UserRecord/ownerCard'
// import petCard from '@/components/Record/UserRecord/petCard'
import petDialog from '@/components/Record/UserRecord/petDialog'
export default {
  components: {
    userRecordNav,
    ownerCard,
    // petCard,
    petDialog,
  },
  async asyncData({ $axios, params }) {
    const id = params.owner
    const member = await $axios.$get(`/api/members/${id}`)
    console.log(member)
    return { oneMember: member }
  },
  data() {
    return {
      ownerDetail: {},
    }
  },
  // computed: {
  //   one_customer() {
  //     return this.check_customer()
  //     // return this.$store.state.record.customerRecord[0].name
  //   },
  // },
  // methods: {
  //   check_customer() {
  //     return this.$store.getters.getCustomerById(this.$route.params.owner)
  //   },
  // },
  // async validate({ params, $axios }) {
  //   // return store.state.customerState.some(
  //   //   (customer) => customer.id === params.owner
  //   // )
  //   const id = params.owner
  //   const member = await $axios.$get(`/api/members/${id}`)
  //   return member.some((mem) => mem.id === id)
  // },
}
</script>

<template>
  <div>
    <userRecordNav :title="one_customer.name" />

    <div class="custom-container">
      <ownerCard :owner="one_customer" />
      <div class="pt-5">
        <petCard :customer="one_customer" />
      </div>
    </div>

    <petDialog />
  </div>
</template>

<script>
import userRecordNav from '@/components/Record/UserRecord/userRecordNav'
import ownerCard from '@/components/Record/UserRecord/ownerCard'
import petCard from '@/components/Record/UserRecord/petCard'
import petDialog from '@/components/Record/UserRecord/petDialog'
export default {
  components: {
    userRecordNav,
    ownerCard,
    petCard,
    petDialog,
  },
  data() {
    return {
      ownerDetail: {},
    }
  },
  computed: {
    one_customer() {
      return this.check_customer()
      // return this.$store.state.record.customerRecord[0].name
    },
  },
  methods: {
    check_customer() {
      return this.$store.getters.getCustomerById(this.$route.params.owner)
    },
  },
  validate({ params, store }) {
    return store.state.customerState.some(
      (customer) => customer.id === params.owner
    )
  },
}
</script>

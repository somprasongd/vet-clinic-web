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
      ownerDetail: {
        name: 'นายเอ สามสกุลบี',
        tel: '098-765-4321',
        email: 'myemailaddress@gmail.com',
        address: '55/55 ต.กระทู้ อำเภอเมือง จังหวัดภูเก็ต',
      },
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
      const nowId = parseInt(this.$route.params.owner)
      for (const data in this.$store.getters.getCustomer) {
        if (this.$store.getters.getCustomer[data].id === nowId) {
          return this.$store.getters.getCustomer[data]
        }
      }
    },
  },
}
</script>

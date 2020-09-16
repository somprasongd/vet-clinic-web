<template>
  <div>
    <recordNav />

    <div class="custom-container">
      <recordTable :dessert="customer" />
    </div>
    <!-- {{ this.customer }} -->
    <recordDialog />
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
  computed: {
    customer() {
      return this.$store.getters.getCustomer
    },
  },
}
</script>

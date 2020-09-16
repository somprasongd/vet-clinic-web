<template>
  <div>
    <appointNav />

    <div class="custom-container">
      <appointTable />
    </div>

    <appointDialog />
  </div>
</template>

<script>
import appointNav from '@/components/appoint/appointNav'
import appointTable from '@/components/appoint/appointTable'
import appointDialog from '@/components/appoint/appointDialog'
export default {
  components: {
    appointNav,
    appointTable,
    appointDialog,
  },
}
</script>

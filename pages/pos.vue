<template>
  <div>
    <posNav />

    <div class="custom-container">
      <posTable />
    </div>
  </div>
</template>

<script>
import posNav from '@/components/POS/posNav'
import posTable from '@/components/POS/posTable'
export default {
  components: {
    posNav,
    posTable,
  },
}
</script>

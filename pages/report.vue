<template>
  <div>
    <reportNav />

    <div class="custom-container">
      <reportList />
    </div>
  </div>
</template>

<script>
import reportNav from '@/components/Report/reportNav'
import reportList from '@/components/Report/reportList'
export default {
  components: {
    reportNav,
    reportList,
  },
}
</script>

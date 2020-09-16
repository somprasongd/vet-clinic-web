<template>
  <div>
    <imgNav />
    <div class="custom-container">
      <v-row>
        <imgCard /><imgCard /><imgCard /><imgCard /><imgCard /><imgCard />
      </v-row>
    </div>
    <insertDialog />
  </div>
</template>

<script>
import imgNav from '@/components/insertImg/imgNav'
import imgCard from '@/components/insertImg/imgCard'
import insertDialog from '@/components/insertImg/insertDialog'
export default {
  components: {
    imgNav,
    imgCard,
    insertDialog,
  },
}
</script>

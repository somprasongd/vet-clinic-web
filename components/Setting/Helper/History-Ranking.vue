<template>
  <div>
    <help title="History Ranking" :item-new="listItem" />
  </div>
</template>

<script>
import help from '@/components/Setting/Helper/Template/helpTemplate'
export default {
  components: {
    help,
  },
  data() {
    return {
      listItem: [{ item: 'item 1' }, { item: 'item 2' }, { item: 'item 3' }],
    }
  },
}
</script>

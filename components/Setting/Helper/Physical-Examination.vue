<template>
  <div>
    <help title="Physical Examination" :item-new="listItem" />
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

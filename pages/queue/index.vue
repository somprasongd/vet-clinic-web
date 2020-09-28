<template>
  <div>
    <queueNav
      :type-default="defaultType"
      :type-check="checkType"
      @selectType="Type"
    />

    <div class="custom-container">
      <queueTable :dessert="customer" :selected-type="defaultType" />
    </div>
    <queueDialog />
  </div>
</template>

<script>
import queueNav from '@/components/Queue/queueNav'
import queueTable from '@/components/Queue/queueTable'
import queueDialog from '@/components/Queue/queueDialog'
export default {
  components: {
    queueNav,
    queueTable,
    queueDialog,
  },
  data() {
    return {
      defaultType: 'OPD',
      checkType: ['OPD', 'IPD', 'ฝากเลี้ยง'],
    }
  },
  computed: {
    customer() {
      return this.$store.state.queue.customerQueue
    },
  },

  methods: {
    Type(select) {
      this.defaultType = select
    },
  },
}
</script>

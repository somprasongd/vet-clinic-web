<template>
  <v-rating
    v-model="getNum"
    length="14"
    empty-icon="mdi-square"
    x-small
    dense
    readonly
  >
    <template v-slot:item="props">
      <v-btn
        :class="checkClass(props.index)"
        :color="true ? genColor(props.index) : 'grey lighten-2'"
        x-small
        tile
        depressed
        @click="props.click"
      >
        <div v-if="props.index == getNum && props.index < 7" class="vl"></div>
        <div
          v-else-if="props.index == getNum && props.index > 6"
          class="vls"
        ></div>
      </v-btn>
    </template>
  </v-rating>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      numRate: this.num,
      colors: [
        '#ff5252',
        '#ff5252',
        '#f5a442',
        '#f5a442',
        '#ffde3c',
        '#ffde3c',
        '#1adf27',
        '#1adf27',
        '#ffde3c',
        '#ffde3c',
        '#f5a442',
        '#f5a442',
        '#ff5252',
        '#ff5252',
      ],
    }
  },
  computed: {
    getNum() {
      return this.num
    },
  },
  methods: {
    genColor(i) {
      return this.colors[i]
    },
    // toStat(num) {
    //   switch (num) {
    //     case 1:
    //       return 'Low'
    //     case 2:
    //       return 'Nomal Low'
    //     case 3:
    //       return 'Nomal'
    //     case 4:
    //       return 'Nomal High'
    //     case 5:
    //       return 'High'
    //     default:
    //       // console.log(num)
    //       break
    //   }
    // },
    checkClass(index) {
      let addClass
      switch (index) {
        case 0:
          addClass = 'left'
          break
        case 13:
          addClass = 'right'
          break
      }
      return addClass
    },
  },
}
</script>

<style lang="scss">
.v-rating {
  .v-btn:not(.v-btn--round).v-size--x-small {
    min-width: 10px;
    height: 15px;
    padding: 0;
  }
  .left {
    border-radius: 10px 0px 0px 10px;
  }
  .right {
    border-radius: 0px 10px 10px 0px;
  }
  .vl {
    position: absolute;
    z-index: 1;
    width: 15px;
    border-right: 5px solid rgba(133, 133, 133, 0.8);
    border-left: none;
    height: 18px;
  }
  .vls {
    position: absolute;
    z-index: 1;
    width: 13px;
    border-left: 5px solid rgba(133, 133, 133, 0.8);
    border-right: none;
    height: 18px;
  }
}
</style>

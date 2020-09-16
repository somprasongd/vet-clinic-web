<template>
  <v-card class="my-1">
    <v-card-title
      v-if="hideTag"
      v-ripple
      class="custom-cardTitle pb-1 pt-3"
      @click="isExpand = !isExpand"
    >
      <v-btn color="cusblue2" icon>
        <v-icon v-show="isExpand == false">mdi-chevron-down</v-icon>
        <v-icon v-show="isExpand == true">mdi-chevron-up</v-icon>
      </v-btn>
      {{ title }}
    </v-card-title>
    <div v-else style="background-color: rgb(226, 226, 226); margin-top: 10px">
      <h3 style="padding: 5px">{{ title }}</h3>
      <v-divider></v-divider>
    </div>

    <v-expand-transition>
      <div v-show="isExpand">
        <v-divider class="darker-divider"></v-divider>

        <div class="pa-5" :style="hideTag ? '' : 'padding:10px'">
          {{ content }}
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
      required: false,
    },
    hideTag: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isExpand: true,
    }
  },
}
</script>

<style lang="scss">
.custom-cardTitle.v-card__title {
  cursor: pointer;
}
</style>

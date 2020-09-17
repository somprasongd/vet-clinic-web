<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      v-ripple
      :elevation="hover ? 12 : 2"
      style="cursor: pointer !important"
      class="mb-4 mx-2"
      min-width="282"
      width="282"
      @click="$emit('imgclick', keys)"
    >
      <v-img :src="url" height="180px"></v-img>

      <v-card-title> {{ imgtitle }} </v-card-title>

      <v-card-subtitle> {{ imgdate }} </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    keys: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    imgtitle: {
      type: String,
      required: true,
    },
    imgdate: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.v-card {
  transition: 0.2s ease-in-out;
}
</style>

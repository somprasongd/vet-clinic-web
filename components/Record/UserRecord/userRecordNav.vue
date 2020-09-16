<template>
  <v-row class="cusblue1 px-10" align="center" justify="center" dense>
    <v-col md="12" cols="12">
      <h1 class="font-weight-medium">{{ title }}</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

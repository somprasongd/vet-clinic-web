<template>
  <v-app dark>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="text-center" color="transparent" flat>
            <div class="display-3 mt-5">
              <span>
                {{ error.statusCode === 404 ? pageNotFound : otherError }}
              </span>
            </div>
            <v-btn color="primary" to="/" text>Back to homepage</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'LoginLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.paragraph-text {
  font-size: 18px;
}
</style>

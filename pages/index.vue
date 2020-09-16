<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <LoginForm />
        <v-btn color="primary" to="/queue">Next</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/Form/Login'
export default {
  components: {
    LoginForm,
  },
  layout: 'LoginLayout',
}
</script>

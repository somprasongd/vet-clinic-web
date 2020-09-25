<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/Form/Login'
export default {
  auth: 'guest',
  components: {
    LoginForm,
  },
  layout: 'LoginLayout',
}
</script>

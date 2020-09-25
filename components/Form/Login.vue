<template>
  <v-card class="elevation-4" rounded="0" color="white">
    <v-card-text>
      <div align="center">
        <v-img
          width="300"
          :src="require('~/assets/Login/VetClinicLogo.png')"
        ></v-img>
        <v-img width="400" :src="require('~/assets/Login/DogCat.png')"></v-img>
      </div>

      <v-form class="px-14" autocomplete="off">
        <v-text-field
          ref="username"
          v-model="loginData.username"
          :color="color"
          type="text"
          name="username"
          label="username"
          @keydown.enter="onEnter('password')"
        ></v-text-field>

        <v-text-field
          ref="password"
          v-model="loginData.password"
          :color="color"
          :type="showPass ? 'text' : 'password'"
          name="password"
          label="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          @keydown.enter="submitLogin"
        ></v-text-field>

        <v-alert
          v-model="alert"
          dense
          text
          color="red"
          transition="scroll-y-transition"
          dismissible
        >
          {{ error }}
        </v-alert>

        <v-btn
          class="cusblue text-none white--text my-10"
          :color="color"
          block
          rounded
          large
          depressed
          @click="submitLogin"
          >Sign in to your account</v-btn
        >

        <!-- <v-checkbox
          v-model="rmbrMe"
          label="Remember me"
          :color="color"
          @click="rmbr"
        ></v-checkbox> -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      color: 'cusblue',
      showPass: false,
      rmbrMe: false,
      loginData: {
        username: '',
        password: '',
      },
      alert: false,
      error: null,
    }
  },
  methods: {
    async submitLogin() {
      try {
        // const response = await this.$auth.loginWith('local', {
        //   data: this.loginData,
        // })
        await this.$auth.loginWith('local', {
          data: this.loginData,
        })
      } catch (err) {
        this.error = err.response.data.error.message
        this.alert = true
      }
    },
    rmbr() {
      if (this.rmbrMe) {
        alert(this.rmbrMe)
      } else {
        alert(this.rmbrMe)
      }
    },
    onEnter(ref) {
      this.$refs[ref].focus()
    },
  },
}
</script>

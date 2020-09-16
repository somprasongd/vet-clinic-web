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

      <v-form class="pr-15 pl-15" autocomplete="off" @submit="submitLogin">
        <v-text-field
          v-model="loginData.username"
          :color="color"
          type="text"
          name="username"
          label="username"
        ></v-text-field>

        <v-text-field
          v-model="loginData.password"
          :color="color"
          :type="showPass ? 'text' : 'password'"
          name="password"
          label="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
        ></v-text-field>

        <v-btn
          class="cusblue text-none white--text"
          :color="color"
          type="submit"
          block
          rounded
          large
          depressed
          >Sign in to your account</v-btn
        >

        <v-checkbox
          v-model="rmbrMe"
          label="Remember me"
          :color="color"
          @click="rmbr"
        ></v-checkbox>
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
    }
  },
  methods: {
    submitLogin() {
      alert(
        'username : ' +
          this.loginData.username +
          '\n password : ' +
          this.loginData.password
      )
    },
    rmbr() {
      if (this.rmbrMe) {
        alert(this.rmbrMe)
      } else {
        alert(this.rmbrMe)
      }
    },
  },
}
</script>

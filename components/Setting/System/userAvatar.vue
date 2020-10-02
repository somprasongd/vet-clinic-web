<template>
  <div class="userAvatar elevation-2">
    <v-avatar class="avatarImg" size="120" @click="onClickAvatar">
      <v-img
        :src="userAvatar"
        :lazy-src="require('~/assets/profile/defaultProfile.svg')"
      >
        <v-row
          v-if="!loadingAvatar"
          class="fill-height ma-0 hoverAvatar"
          align="center"
          justify="center"
        >
          <v-icon color="white">mdi-cloud-upload</v-icon>
        </v-row>
        <v-row
          v-else
          class="fill-height ma-0 loadingAvatar"
          align="center"
          justify="center"
        >
          <v-progress-circular
            v-if="avatarErr"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon v-else color="red">mdi-alert</v-icon>
        </v-row>
      </v-img>
    </v-avatar>
    <input
      ref="inputAvatar"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFilePicked"
    />
    <v-btn
      class="del-avatar pa-3"
      color="red"
      fab
      x-small
      dark
      @click="deleteProfile(avatarid)"
    >
      <v-icon>mdi-trash-can</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    avatarid: {
      type: Number,
      required: true,
    },
    avatars: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      avatar: this.avatars,
      loadingAvatar: false,
      avatarErr: true,
    }
  },
  computed: {
    userAvatar() {
      return this.avatar
    },
  },
  methods: {
    onClickAvatar() {
      this.$refs.inputAvatar.click()
    },
    onFilePicked(e) {
      // เลือกไฟล์แล้วเปลี่ยนรูป Preview
      const file = e.target.files[0]
      this.uploadProfile(this.avatarid, file)
    },
    uploadProfile(id, img) {
      this.loadingAvatar = true
      const formData = new FormData()
      formData.append('avatar', img)

      this.$axios
        .$post(`/api/users/${id}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((data) => {
          this.avatarSuccess(URL.createObjectURL(img))
        })
        .catch((error) => {
          this.avatarError(error)
        })
    },
    deleteProfile(id) {
      this.loadingAvatar = true
      this.$axios
        .$delete(`/api/users/${id}/avatar`)
        .then((data) => {
          // this.updateSuccess(response)
          this.avatarSuccess(require('~/assets/profile/defaultProfile.svg'))
        })
        .catch((error) => {
          this.avatarError(error)
        })
    },
    avatarSuccess(img) {
      setTimeout(() => {
        this.loadingAvatar = false
        this.avatar = img
      }, 1000)
    },
    avatarError() {
      this.avatarErr = false
      setTimeout(() => {
        this.avatarErr = true
        this.loadingAvatar = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.userAvatar {
  position: relative;
  background: #ffffff;
  width: 130px;
  height: 130px;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  text-align: center;
  line-height: 127px;
  .avatarImg {
    background: white;
  }
  .del-avatar {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .loadingAvatar {
    transition: 0.2s;
    background: rgba(0, 0, 0, 0.5);
  }
  .hoverAvatar {
    opacity: 0;
    transition: 0.2s;
    background: rgba(0, 0, 0, 0.5);
    &:hover {
      transition: 0.2s;
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>

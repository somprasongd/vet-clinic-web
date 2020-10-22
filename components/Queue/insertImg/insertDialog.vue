<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="openDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <div id="painterro" ref="paint"></div>

    <v-dialog v-model="assignModal" max-width="500" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">อัพโหลดไฟล์</h2>
        <v-divider class="darker-divider"></v-divider>
        <v-card-text class="px-7">
          <div class="preview-img">
            <v-img
              class="pa-3"
              :src="addImg.previewImg"
              height="300"
              contain
            ></v-img>
          </div>
          <v-select
            v-model="addImg.type"
            :disabled="loading"
            class="rounded-lg"
            :items="type"
            item-text="label"
            item-value="id"
            item-color="cusblue"
            label="ประเภท"
          >
          </v-select>
          <v-textarea
            v-model="addImg.description"
            :disabled="loading"
            color="cusblue"
            label="รายละเอียด"
            auto-grow
            row-height="24"
            rows="1"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="loading"
            class="cusblue2--text text-none"
            text
            @click="submitImg"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="cusblue2"
              :size="15"
              :width="2"
            ></v-progress-circular>
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Painterro from 'painterro'
import Vue from 'vue'

export default {
  data() {
    return {
      assignModal: false,
      painterro: null,
      type: this.$store.state.form.mediaType,
      loading: false,
      addImg: {
        img: '',
        previewImg: '',
        description: '',
        type: 1,
      },
    }
  },
  watch: {
    assignModal(val) {
      if (val === false) {
        this.addImg = {
          img: '',
          previewImg: '',
          description: '',
          type: 1,
        }
      }
    },
  },
  mounted() {
    if (this.$store.state.form.mediaType.length === 0) {
      this.$store.dispatch('form/addMedia').then((res) => {
        this.type = res
      })
    }
    Vue.nextTick(() => {
      this.painterro = Painterro({
        id: 'painterro',
        colorScheme: {
          main: '#49bfe8',
          control: '#148cad',
          controlContent: '#ffffff',
          activeControl: '#0d6c86',
          activeControlContent: '#c9c9c9',
          toolControlNameColor: '#148cad',
          hoverControlContent: 'rgb(211, 211, 211)',
        },
        saveHandler: (image, done) => {
          this.addImg.img = image
          this.addImg.previewImg = image.asDataURL() // preview base 64
          done(true) // done and hide painterro
          this.assignModal = true
        },
      })
    })
  },
  methods: {
    openDialog() {
      this.painterro.show()
    },
    submitImg() {
      this.loading = true
      const addImg = { ...this.addImg }
      const type = 'image/png'
      const file = new File([addImg.img.asBlob(type)], 'file.png', {
        type: 'image/png',
      })
      const formData = new FormData()
      formData.append('image', file)
      formData.append('description', addImg.description)
      formData.append('typeId', addImg.type)

      this.$axios
        .$post(`/api/visits/${this.$route.params.queue}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          progress: false,
        })
        .then((data) => {
          setTimeout(() => {
            this.$emit('add', data)
            this.loading = false
            this.assignModal = false
          }, 500)
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>

<style lang="scss">
#painterro {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  opacity: 1;
  transition: opacity 300ms;
  /* transition: visibility 0s linear 0.33s, opacity 0.33s linear; */
}
.preview-img {
  max-height: 300px;
  max-height: 100%;
  background: rgb(240, 240, 240);
  border-radius: 10px;
  margin: 10px 0px;
}
.ptro-icon-btn,
.ptro-settings-widget,
.ptro-pallet,
.ptro-resize-widget {
  border-radius: 10px;
  transition: 300ms;
}
.ptro-named-btn {
  border-radius: 10px;
  padding: 0 10px;
}
.ptro-icon-btn[disabled='true'] {
  color: rgb(158, 158, 158);
  background: #1397bb;
}
.ptro-settings-widget-wrapper[hidden='true'],
.ptro-color-widget-wrapper[hidden='true'],
.ptro-resize-widget-wrapper[hidden='true'] {
  opacity: 0;
  transition: opacity 300ms;
}
.ptro-settings-widget-wrapper,
.ptro-color-widget-wrapper,
.ptro-resize-widget-wrapper {
  opacity: 1;
  transition: opacity 300ms;
}
[hidden] {
  display: block;
  visibility: hidden;
  #painterro-wrapper {
    opacity: 0;
    transition: opacity 300ms;
  }
  #painterro-bar {
    opacity: 0;
    transition: opacity 300ms;
  }
}
#painterro-wrapper {
  opacity: 1;
  transition: opacity 300ms;
}
#painterro-bar {
  opacity: 1;
  transition: opacity 300ms;
}
</style>

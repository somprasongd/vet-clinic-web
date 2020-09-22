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
            <v-img class="pa-3" :src="uploadImg" height="300" contain></v-img>
          </div>
          <v-text-field color="cusblue" label="รายละเอียด"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>บันทึก</v-btn>
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
      uploadImg:
        'https://img.wongnai.com/p/256x256/2019/12/17/0166201f723943989a21210575ef1f15.jpg',
    }
  },
  mounted() {
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
          // const type = 'image/png'
          // const file = new File([image.asBlob(type)], 'file.png', {
          //   type: 'image/png',
          // })
          // this.add_file(file) // do something with file e.g. upload to server
          this.uploadImg = image.asDataURL() // preview base 64
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

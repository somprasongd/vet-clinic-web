<template>
  <div>
    <v-layout row wrap>
      <v-flex
        v-for="(img, i) in images"
        :key="i"
        xs12
        sm6
        md4
        xl3
        class="lg5-custom"
      >
        <imgCard
          class="mx-auto"
          :keys="i"
          :img="img"
          :delbtn="deletes"
          @imgclick="showImg"
          @delete="delImg"
        />
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogImg"
      max-width="100%"
      transition="dialog-transition"
      fullscreen
    >
      <v-card class="pa-0" height="100vh" tile>
        <v-btn
          class="white--text ma-4"
          color="rgba(0, 0, 0, 0.5)"
          depressed
          absolute
          fab
          small
          @click="dialogImg = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-card-text class="pa-0">
          <v-carousel v-model="imgShowing" height="100vh" hide-delimiters>
            <v-carousel-item
              v-for="(img, i) in images"
              :key="i"
              :src="img.media.url"
            >
              <v-sheet color="rgba(0, 0, 0, 0.5)" height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <div class="responsive-img">
                    <v-img
                      :src="img.media.url"
                      :lazy-src="img.media.url_thumbnail_sm"
                    />
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-dialog>
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import imgCard from '@/components/Queue/insertImg/imgCard'
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    imgCard,
    confirmDialog,
  },
  props: {
    images: {
      default: null,
      type: Array,
      required: false,
    },
    deletes: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dialogImg: false,
      imgShowing: 0,
    }
  },
  methods: {
    showImg(id) {
      this.dialogImg = true
      this.imgShowing = id
    },
    delImg(id) {
      this.$refs.confirm
        .open('คุณแน่ใจหรือไม่?', 'คุณแน่ใจหรือไม่ที่จะลบภาพนี้', {
          width: 290,
          color: 'red',
        })
        .then((confirm) => {
          this.$axios
            .$delete(`/api/visits/${this.$route.params.queue}/images/${id}`, {
              progress: false,
            })
            .then(() => {
              this.$emit('delete', id)
            })
            .catch((error) => alert(error))
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss">
@media screen and (orientation: portrait) {
  .responsive-img {
    max-height: 100%;
    max-width: 100%;
  }
}
@media screen and (orientation: landscape) {
  .responsive-img {
    max-height: 100vh;
    max-width: 100vh;
  }
}

@media (min-width: 1264px) and (max-width: 1903px) {
  .flex.lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>

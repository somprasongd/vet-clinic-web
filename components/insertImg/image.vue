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
          :imgtitle="img.title"
          :imgdate="img.date"
          :url="img.url"
          :delbtn="deletes"
          @imgclick="showImg"
        />
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogImg"
      max-width="100%"
      transition="dialog-transition"
    >
      <v-card class="pa-0" height="90vh" tile>
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
          <v-carousel v-model="imgShowing" height="90vh" hide-delimiters>
            <v-carousel-item v-for="(img, i) in images" :key="i" :src="img.url">
              <v-sheet color="rgba(0, 0, 0, 0.5)" height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <div class="responsive-img">
                    <v-img :src="img.url" />
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import imgCard from '@/components/insertImg/imgCard'
export default {
  components: {
    imgCard,
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
  },
}
</script>

<style lang="scss">
.responsive-img {
  max-height: 100%;
  max-width: 100%;
}
@media (min-width: 1264px) and (max-width: 1903px) {
  .flex.lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>

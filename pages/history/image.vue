<template>
  <div>
    <hisNav />
    <div class="custom-container">
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
              <v-carousel-item
                v-for="(img, i) in images"
                :key="i"
                :src="img.url"
              >
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
  </div>
</template>

<script>
import hisNav from '@/components/history/hisNav'
import imgCard from '@/components/history/imgCard'
export default {
  components: {
    hisNav,
    imgCard,
  },
  methods: {
    showImg(id) {
      this.dialogImg = true
      this.imgShowing = id
    },
  },
  data() {
    return {
      dialogImg: false,
      imgShowing: 0,
      images: [
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://www.dogsclip.com/img/upload/02Articles/CoverImg/dsc_artiCoverImg7431631557701007.jpg',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://www.thairath.co.th/media/HCtHFA7ele6Q2dULjnz2JwCVK4qJVrU0gwxNnODOiCHKJkRUuHJnnXVLI2dP1T3y2J.jpg',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://i2.wp.com/www.nextsteptv.com/wp-content/uploads/2017/04/1-83.jpg?resize=735%2C400',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://i.pinimg.com/originals/ce/02/44/ce0244625a14f0652dacfa2deb1dc012.jpg',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://www.iconarchive.com/download/i107326/google/noto-emoji-animals-nature/22215-dog.ico',
        },
        {
          title: 'หมาน้อย',
          date: '16/08/2020',
          url:
            'https://img.wongnai.com/p/256x256/2019/12/17/0166201f723943989a21210575ef1f15.jpg',
        },
      ],
    }
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

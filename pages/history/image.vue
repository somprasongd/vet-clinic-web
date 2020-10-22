<template>
  <div>
    <hisNav />
    <div class="custom-container">
      <imgCard :images="images" />
    </div>
  </div>
</template>

<script>
import hisNav from '@/components/history/hisNav'
import imgCard from '@/components/Queue/insertImg/image'
export default {
  components: {
    hisNav,
    imgCard,
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

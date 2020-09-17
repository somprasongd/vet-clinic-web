<template>
  <div>
    <imgNav />
    <div class="custom-container">
      <images :images="images" :deletes="true" />
    </div>
    <insertDialog />
  </div>
</template>

<script>
import imgNav from '@/components/insertImg/imgNav'
import images from '@/components/insertImg/image'
import insertDialog from '@/components/insertImg/insertDialog'
export default {
  components: {
    imgNav,
    images,
    insertDialog,
  },
  data() {
    return {
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

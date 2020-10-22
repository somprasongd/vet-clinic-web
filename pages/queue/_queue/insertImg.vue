<template>
  <div>
    <imgNav @select="changeSelect" />
    <div class="custom-container">
      <images :images="filterImg" :deletes="true" @delete="deleteImg" />
    </div>
    <insertDialog @add="addImg" />
  </div>
</template>

<script>
import imgNav from '@/components/Queue/insertImg/imgNav'
import images from '@/components/Queue/insertImg/image'
import insertDialog from '@/components/Queue/insertImg/insertDialog'
export default {
  components: {
    imgNav,
    images,
    insertDialog,
  },
  async validate({ $axios, params, query, store }) {
    const visit = await $axios.$get(`/api/visits/${params.queue}`, {
      progress: false,
    })
    if (
      visit.visitStatus.id === 1 ||
      visit.visitStatus.id === 2 ||
      visit.visitStatus.id === 3 ||
      visit.visitStatus.id === 4
    )
      return true
    else return false
  },
  async asyncData({ $axios, params }) {
    const img = await $axios.$get(`/api/visits/${params.queue}/images`, {
      progress: false,
    })
    return {
      images: img,
    }
  },
  data() {
    return {
      type: '',
    }
  },
  computed: {
    filterImg() {
      return this.images.filter((img) => {
        if (this.type === '') {
          return img.typeId
        } else {
          return img.typeId === this.type
        }
      })
    },
  },
  methods: {
    changeSelect(id) {
      console.log(id)
      this.type = id
    },
    addImg(img) {
      const images = {
        id: img.id,
        description: img.description,
        media: {
          id: img.image.id,
          url: img.image.url,
          url_thumbnail: img.image.url_thumbnail,
          url_thumbnail_sm: img.image.url_thumbnail_sm,
        },
        typeId: img.typeId,
        visitId: img.visitId,
      }
      this.images.push(images)
    },
    deleteImg(id) {
      const index = this.images.findIndex((img) => img.id === id)
      this.images.splice(index, 1)
    },
  },
}
</script>

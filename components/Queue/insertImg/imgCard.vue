<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mb-4 mx-2 overflow-auto"
      min-width="282"
      width="282"
      height="270"
    >
      <v-img
        v-ripple
        class="img-cus"
        :lazy-src="img.media.url_thumbnail_sm"
        :src="img.media.url"
        height="180px"
        @click="$emit('imgclick', keys)"
      >
        <v-row
          v-if="hover"
          align="center"
          justify="center"
          class="lightbox fill-height text-center cus-row"
        >
          <v-col>
            <v-icon class="cus-icon" large>mdi-arrow-expand-all</v-icon>
          </v-col>
        </v-row>
      </v-img>

      <v-card-title> {{ img.description }} </v-card-title>

      <v-card-subtitle> {{ getType(img.typeId) }} </v-card-subtitle>
      <v-btn
        v-if="delbtn"
        class="mb-2"
        bottom
        right
        absolute
        icon
        @click="$emit('delete', img.id)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    keys: {
      type: Number,
      required: true,
    },
    img: {
      type: Object,
      required: true,
    },
    delbtn: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      type: this.$store.state.form.mediaType,
    }
  },
  mounted() {
    if (this.$store.state.form.mediaType.length === 0) {
      this.$store.dispatch('form/addMedia').then((res) => {
        this.type = res
      })
    }
  },
  methods: {
    getType(id) {
      if (this.type.length !== 0) {
        const index = this.type.findIndex((type) => type.id === id)
        return this.type[index].label
      }
    },
  },
}
</script>

<style lang="scss">
.v-card {
  transition: 0.2s ease-in-out;
}
.img-cus {
  cursor: pointer !important;
  .cus-row {
    transition: 0.2s ease-in-out;
    background: rgba(0, 0, 0, 0);
  }
  .cus-icon {
    color: rgba(255, 255, 255, 0) !important;
  }
  &:hover {
    .cus-icon {
      color: rgba(255, 255, 255, 1) !important;
    }
    .cus-row {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

<template>
  <div>
    <settingNav />

    <div class="custom-container">
      <v-row no-gutters>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="4"
          md="3"
          lg="2"
        >
          <settingTab />
        </v-col>
        <v-col
          :class="this.$vuetify.breakpoint.smAndUp ? 'px-2' : ''"
          cols="12"
          sm="8"
          md="9"
          lg="10"
        >
          <checkList :items="item" @edit="openDialog" @delete="delItem" />
        </v-col>
      </v-row>
    </div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="openDialog()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <checkDialog ref="checkDialog" :item-list="item" @add="addItem" />
  </div>
</template>

<script>
import settingNav from '@/components/Setting/settingNav'
import settingTab from '@/components/Setting/settingTab'
import checkList from '@/components/Setting/Check/checkList'
import checkDialog from '@/components/Setting/Check/checkDialog'
export default {
  components: {
    settingNav,
    settingTab,
    checkList,
    checkDialog,
  },
  async asyncData({ $axios }) {
    const item = await $axios.$get('/api/config/items', { progress: false })
    return { item: item.results }
  },
  methods: {
    async addItem(val) {
      const item = await this.$axios.$get('/api/config/items', {
        progress: false,
      })
      this.item = item.results
    },
    openDialog(id) {
      this.$refs.checkDialog.open(id)
    },
    delItem(id) {
      this.$axios
        .$delete(`/api/config/items/${id}`)
        .then((res) => {
          const index = this.item.findIndex((item) => {
            return item.id === id
          })
          this.item.splice(index, 1)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

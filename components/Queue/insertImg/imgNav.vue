<template>
  <v-row class="cusblue1 second-nav1" align="center" justify="center" dense>
    <v-col lg="10" md="9" sm="8" cols="6">
      <h1 class="font-weight-medium">แนบรูป</h1>
    </v-col>
    <v-col lg="2" md="3" sm="4" cols="6">
      <v-select
        v-model="select"
        :items="type"
        item-text="label"
        item-value="id"
        class="rounded-lg cus-input mr-3"
        background-color="cusblue3"
        item-color="cusblue"
        label="ทั้งหมด"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      >
        <template v-slot:prepend-item>
          <v-list-item
            :style="select === '' ? 'background-color: #e2f5fc' : ''"
            ripple
            @click="select = ''"
          >
            <v-list-item-content>
              <v-list-item-title :class="select === '' ? 'cusblue--text' : ''">
                แสดงทั้งหมด
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      type: this.$store.state.form.mediaType,
      select: '',
    }
  },
  watch: {
    select(id) {
      this.$emit('select', id)
    },
  },
  mounted() {
    if (this.$store.state.form.mediaType.length === 0) {
      this.$store.dispatch('form/addMedia').then((res) => {
        this.type = res
      })
    }
  },
}
</script>

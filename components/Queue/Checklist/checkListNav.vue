<template>
  <div>
    <v-row class="px-5" align="center" justify="center" dense>
      <v-col md="2" cols="5">
        <v-select
          v-model="select"
          class="rounded-lg"
          :items="type"
          item-text="label"
          item-value="id"
          item-color="cusblue"
          :menu-props="{ closeOnContentClick: true }"
          label="ประเภท"
          light
          filled
          rounded
          single-line
          dense
          flat
          hide-details
        >
          <template v-slot:prepend-item>
            <v-list-item
              :style="select === null ? 'background-color: #e2f5fc' : ''"
              ripple
              @click="select = null"
            >
              <v-list-item-content>
                <v-list-item-title
                  :class="select === null ? 'cusblue--text' : ''"
                >
                  ทั้งหมด
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </v-col>

      <v-col md="10" cols="7">
        <v-row no-gutters>
          <v-col cols="8" md="10">
            <v-autocomplete
              v-model="value"
              class="rounded-lg"
              :items="items"
              item-text="label"
              item-value="id"
              item-color="cusblue2"
              :search-input.sync="search"
              :loading="loading"
              return-object
              light
              filled
              rounded
              single-line
              dense
              flat
              hide-details
              hide-no-data
              @change="selectedItem"
              @focus="value = null"
            >
              <template v-slot:append>
                <v-icon>mdi-magnify</v-icon>
              </template>

              <template v-slot:selection="data">
                <span>{{ data.item.name }}</span>
              </template>

              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="data.item.label"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4" md="2">
            <v-text-field
              v-model="count"
              prepend-icon="mdi-close"
              class="ml-2 rounded-lg text-nav"
              filled
              rounded
              single-line
              dense
              flat
              hide-details
              @keypress="isNumber($event)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$store.state.form.itemGroup,
      select: null,
      // search: '',

      timeout: null,
      items: [],
      search: null,
      value: null,
      loading: false,

      count: 1,
    }
  },
  watch: {
    search(val) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (val !== '') {
          this.querySelections(val)
        } else {
          this.items = []
          this.loading = false
        }
      }, 500)
    },
  },
  mounted() {
    if (this.$store.state.form.itemGroup.length === 0) {
      this.$store.dispatch('form/addItemGroup').then((res) => {
        this.type = res
      })
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true

      this.$axios
        .$get(
          `/api/config/items?label=${v}${
            this.select !== null ? `&groupId=${this.select}` : ''
          }`,
          {
            progress: false,
          }
        )
        .then((res) => {
          this.items = res.results
          this.loading = false
        })
        .catch((error) => {
          alert(error)
        })
    },
    selectedItem() {
      // if (this.value.itemGroup.id === 1) {
      //   this.showModal()
      // } else {
      //   console.log('not Drug')
      // }
      const order = { ...this.value }
      const count = parseInt(this.count)
      const sendOrder = {
        itemId: order.id,
        qty: count,
      }
      this.$axios
        .$post(`/api/visits/${this.$route.params.queue}/orders`, sendOrder, {
          progress: false,
        })
        .then((res) => {
          this.$emit('add', res)
          this.count = 1
        })
        .catch((error) => {
          alert(error)
        })
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
    // showModal() {
    //   if (this.value != null) {
    //     this.assignModal = true
    //     this.addData.nameList = this.value.label
    //     this.addData.type = this.value.itemGroup.label
    //   }
    // },
  },
}
</script>

<style lang="scss">
.short-textfilds.v-text-field.v-text-field--enclosed .v-input__slot {
  padding: 0px !important;
  width: 60px;
  margin: 0 auto;
  border: 1px solid rgb(180, 180, 180);
  input {
    text-align: center;
  }
  .long-little {
    width: 60px;
  }
}
// .v-menu__content{

// }
// .menuable__content__active .v-autocomplete__content{
//     background: red;
// }
.v-autocomplete__content {
  border-radius: 5px !important;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(161, 161, 161);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background: white;
    border-radius: 10px;
  }
}
</style>

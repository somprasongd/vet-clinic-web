<template>
  <div>
    <h3 class="pl-5 pt-3 font-weight-medium">รายการตรวจ</h3>
    <v-divider class="darker-divider"></v-divider>
    <v-row class="pt-3" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-4" height="540">
          <div class="px-7 py-5">
            <v-row dense>
              <v-col cols="2">
                <v-select
                  v-model="select"
                  :items="type"
                  item-text="label"
                  item-value="id"
                  item-color="cusblue"
                  :menu-props="{ closeOnContentClick: true }"
                  label="ประเภท"
                  color="cusblue"
                  class="rounded-lg"
                  light
                  outlined
                  rounded
                  dense
                  flat
                  hide-details
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      :style="
                        select === null ? 'background-color: #e2f5fc' : ''
                      "
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
              <v-col cols="10">
                <v-text-field
                  v-model="search"
                  class="rounded-lg"
                  color="cusblue"
                  label="ค้นหา"
                  append-icon="mdi-magnify"
                  outlined
                  single-line
                  dense
                  flat
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>
          <div class="px-7 py-5">
            <v-card-title class="pa-0 px-3 py-1"> ชื่อ/ประเภท </v-card-title>
            <v-divider></v-divider>
            <v-virtual-scroll
              :items="filterItem"
              :item-height="50"
              height="400  "
            >
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.label }}
                      <span class="text--secondary">({{ item.code }})</span>
                      <span v-if="select === null" class="text--secondary">
                        - {{ item.itemGroup.label }}
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-btn
                          class="mr-1"
                          icon
                          x-small
                          @click="editItem(item.id)"
                        >
                          <v-icon color="black">mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          class="ml-1"
                          :disabled="item.id === 1 ? true : false"
                          icon
                          x-small
                          @click="delItem(item.id)"
                        >
                          <v-icon color="black">mdi-trash-can</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <confirmDialog ref="confirm" />
  </div>
</template>

<script>
import confirmDialog from '@/components/Items/confirmDialog'
export default {
  components: {
    confirmDialog,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      confirmDel: false,
      newItemDialog: false,
      type: this.$store.state.form.itemGroup,
      select: null,
      search: '',
    }
  },
  computed: {
    filterItem() {
      return this.items.filter((item) => {
        if (this.select !== null) {
          return (
            (item.label.toLowerCase().includes(this.search.toLowerCase()) &&
              item.itemGroup.id === this.select) ||
            (item.code.toLowerCase().includes(this.search.toLowerCase()) &&
              item.itemGroup.id === this.select)
          )
        } else {
          return (
            item.label.toLowerCase().includes(this.search.toLowerCase()) ||
            item.code.toLowerCase().includes(this.search.toLowerCase())
          )
        }
      })
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
    editItem(id) {
      this.$emit('edit', id)
    },
    delItem(id) {
      this.$refs.confirm
        .open('คุณแน่ใจหรือไม่?', 'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้', {
          width: 290,
          color: 'red',
        })
        .then((confirm) => {
          this.$emit('delete', id)
        })
        .catch(() => {})
    },
  },
}
</script>

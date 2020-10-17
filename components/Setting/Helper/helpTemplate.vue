<template>
  <div>
    <h3 class="pl-5 pt-3 font-weight-medium">{{ title }}</h3>
    <v-divider class="darker-divider"></v-divider>
    <v-row class="pt-3" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-4" height="540">
          <div class="px-7 py-5">
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
            ></v-text-field>
          </div>

          <div class="px-7 py-5">
            <v-card-title class="pa-0 px-3 py-1"> List </v-card-title>
            <v-divider></v-divider>
            <v-list class="pa-0 px-5">
              <v-list-item v-for="help in filterHelper" :key="help.index">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ help.label }}
                    <span class="text--secondary">({{ help.code }})</span>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-btn
                        class="mr-1"
                        icon
                        x-small
                        @click.stop="editHelper(help.id)"
                      >
                        <v-icon color="black">mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        class="ml-1"
                        icon
                        x-small
                        @click.stop="delHelper(help.id)"
                      >
                        <v-icon color="black">mdi-trash-can</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </v-list>
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
    title: {
      type: String,
      required: true,
    },
    helper: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    filterHelper() {
      return this.helper.filter((help) => {
        return (
          help.label.toLowerCase().includes(this.search.toLowerCase()) ||
          help.code.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },
  methods: {
    editHelper(id) {
      this.$emit('editHelper', id)
    },
    delHelper(id) {
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

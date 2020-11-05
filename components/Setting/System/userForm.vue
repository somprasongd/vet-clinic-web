<template>
  <div>
    <h3 class="pl-5 pt-3 font-weight-medium">ผู้ใช้งาน</h3>
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
              autocomplete="off"
            ></v-text-field>
          </div>
          <div class="px-7 py-5">
            <v-card-title class="pa-0 px-3 py-1"> User List </v-card-title>
            <v-divider></v-divider>
            <v-virtual-scroll
              :items="filterUser"
              :item-height="50"
              height="400  "
            >
              <template v-slot="{ item }">
                <v-list-item class="pa-0 px-5">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.username }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-btn
                          class="mr-1"
                          icon
                          x-small
                          @click="$emit('edituser', item.id)"
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
                          @click="deleteUser(item.id)"
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
    alluser: {
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
    filterUser() {
      return this.alluser.filter((user) => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods: {
    async deleteUser(id) {
      const confirm = await this.$refs.confirm.open(
        `คุณแน่ใจหรือไม่?`,
        `คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้`,
        {
          width: 290,
          color: 'red',
        }
      )

      if (!confirm) {
        return
      }

      try {
        await this.$axios.$delete(`/api/users/${id}`, { progress: false })
        this.$emit('removed', id)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

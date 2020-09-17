<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="500" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">อัพโหลดไฟล์</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row>
            <v-col cols="12">
              <v-file-input
                chips
                multiple
                label="ค้นหาไฟล์"
                accept="image/*"
                prepend-icon
                append-icon="mdi-folder-multiple-image"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field color="cusblue" label="รายละเอียด"></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text>บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignModal: false,
    }
  },
}
</script>

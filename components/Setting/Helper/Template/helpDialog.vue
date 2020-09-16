<template>
  <div>
    <v-btn
      :key="$nuxt.$route.path"
      class="v-btn--example"
      color="cusblue2"
      fab
      large
      dark
      bottom
      right
      @click.stop="assignModal = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card height="270">
        <h2 class="pa-5 pb-2">แก้ไข</h2>
        <v-divider class="darker-divider"></v-divider>
        <div class="px-7">
          <v-row dense>
            <v-col cols="6"><v-text-field label="รหัส"></v-text-field></v-col>
            <v-col cols="12"
              ><v-text-field label="ข้อความ"></v-text-field
            ></v-col>
          </v-row>
        </div>

        <v-card-actions style="position: absolute; bottom: 0px; right: 0px">
          <v-btn class="cusblue2--text text-none" text>New</v-btn>
          <v-btn class="cusblue2--text text-none" text>Delete</v-btn>
          <v-btn class="cusblue2--text text-none" text>Save</v-btn>
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

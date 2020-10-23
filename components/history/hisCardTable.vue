<template>
  <v-card class="my-1">
    <v-card-title
      v-if="hideTag"
      v-ripple
      class="custom-cardTitle pb-1 pt-3"
      @click="isExpand = !isExpand"
    >
      <v-btn color="cusblue2" icon>
        <v-icon v-show="isExpand == false">mdi-chevron-down</v-icon>
        <v-icon v-show="isExpand == true">mdi-chevron-up</v-icon>
      </v-btn>
      {{ title }}
    </v-card-title>
    <div v-else style="background-color: rgb(226, 226, 226); margin-top: 10px">
      <h3 style="padding: 5px">{{ title }}</h3>
      <v-divider></v-divider>
    </div>

    <v-expand-transition>
      <div v-show="isExpand">
        <v-divider class="darker-divider"></v-divider>

        <div v-if="bodys !== null && bodys !== [] && bodys.length !== 0">
          <v-simple-table class="custable px-5" dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in heads"
                    :key="head.index"
                    style="
                      text-align: left;
                      font-size: 16px;
                      color: black;
                      font-weight: 500;
                      border: none;
                    "
                  >
                    {{ head }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <slot name="body">
                  <!-- <tr v-for="body in bodys" :key="body.index">
                    <td
                      v-for="item in body"
                      :key="item.index"
                      style="border: none"
                    >
                      {{ item }}
                    </td>
                  </tr> -->
                </slot>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div v-else class="text-center pa-5 text--secondary">No data</div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    heads: {
      type: Array,
      required: true,
    },
    bodys: {
      default: null,
      type: Array,
      required: false,
    },
    hideTag: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isExpand: true,
    }
  },
}
</script>

<style lang="scss">
.custom-cardTitle.v-card__title {
  cursor: pointer;
}
</style>

<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="dessert"
      item-key="i"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <template slot="item" scope="props">
        <tr>
          <td class="text-center">{{ props.index + 1 }}</td>
          <td class="font-weight-medium">
            <nuxt-link
              class="bold-owner text-decoration-none"
              :to="'/record/' + props.item.id"
              >{{ props.item.name }}
              <v-icon color="cusblue2" small
                >mdi-chevron-right</v-icon
              ></nuxt-link
            >
          </td>
          <td>{{ props.item.tel }}</td>
          <td>{{ props.item.address }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.bold-owner {
  padding: 5px;
  border-radius: 15px;
}
.bold-owner:hover {
  background-color: rgb(212, 212, 212);
  cursor: pointer;
  transition: 0.5s;
}
</style>

<script>
export default {
  props: {
    dessert: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { text: 'เจ้าของ', value: 'name', sortable: false },
        { text: 'เบอร์ติดต่อ', value: 'tel', sortable: false },
        { text: 'ที่อยู่', value: 'address', width: '50%', sortable: false },
      ],
    }
  },
}
</script>

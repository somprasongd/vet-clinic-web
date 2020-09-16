<template>
  <div>
    <v-data-table
      class="elevation-4 overflow-y-auto"
      :headers="headers"
      :items="dessert"
      disable-pagination
      hide-default-footer
      height="calc(100vh - 160px)"
    >
      <!-- <template slot="item" slot-scope="props">
          <tr>
            <td class="text-center">{{ props.item.id }}</td>
            <td class="font-weight-medium"><span style="cursor:pointer" @click="ownDetail(props.item.owner)">{{ props.item.owner }}</span></td>
            <td>{{ props.item.tel }}</td>
            <td>{{ props.item.address }}</td>
          </tr>
        </template> -->

      <template v-slot:[`item.name`]="{ item }">
        <td class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none"
            :to="'/record/' + item.id"
            >{{ item.name }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon></nuxt-link
          >
        </td>
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
  methods: {
    ownDetail(id) {
      this.$router.push('/record/' + id)
    },
  },
}
</script>

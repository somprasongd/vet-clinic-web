<template>
  <div>
    <v-simple-table v-if="petDetail.length" dense fixed-header max-height="200">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center" width="115">ลำดับ</th>
            <th class="text-left">ชื่อสัตว์เลี้ยง</th>
            <th class="text-left">ประเภท</th>
            <th class="text-left">เพศ</th>
            <th class="text-left">สี</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in petDetail" :key="pet.id">
            <td class="text-center">{{ orderNum(petDetail, pet.id) }}</td>
            <td>{{ pet.name }}</td>
            <td>{{ pet.type.label }}</td>
            <td>{{ pet.gender.label }}</td>
            <td>{{ pet.color }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="text-center pa-8 grey--text">Not Found Pet</div>
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      petDetail: [],
    }
  },
  async mounted() {
    const pet = await this.$axios.$get(
      `/api/pets?ownerId=${this.owner}&limit=0`,
      { progress: false }
    )
    this.petDetail = pet.results
  },
  methods: {
    orderNum(data, id) {
      return (
        data
          .map(function (x) {
            return x.id
          })
          .indexOf(id) + 1
      )
    },
  },
}
</script>

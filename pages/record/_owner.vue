<template>
  <div>
    <userRecordNav :title="oneMember.firstName + ' ' + oneMember.lastName" />

    <div class="custom-container">
      <ownerCard :owner="oneMember" @update="updateMember" />
      <div class="pt-5">
        <petCard :pets="ownPets" @update="updatePetDialog" @del="delPet" />
      </div>
    </div>
    <petDialog ref="addPetDialog" @update="updatePet" />

    <v-btn
      :key="$nuxt.$route.path"
      color="cusblue2"
      fixed
      fab
      large
      dark
      bottom
      right
      @click.stop="addPetDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import userRecordNav from '@/components/Record/UserRecord/userRecordNav'
import ownerCard from '@/components/Record/UserRecord/ownerCard'
import petCard from '@/components/Record/UserRecord/petCard'
import petDialog from '@/components/Record/UserRecord/petDialog'
export default {
  components: {
    userRecordNav,
    ownerCard,
    petCard,
    petDialog,
  },
  async asyncData({ $axios, params }) {
    const id = params.owner
    const member = await $axios.$get(`/api/members/${id}`)
    const pets = await $axios.$get(`/api/pets?ownerId=${id}&limit=0`)
    return { oneMember: member, ownPets: pets.results }
  },
  data() {
    return {
      // ownerDetail: {},
    }
  },
  validate({ params, $axios }) {
    return /^[0-9]*$/.test(params.owner)
  },
  methods: {
    addPetDialog() {
      this.$refs.addPetDialog.open()
    },
    updatePetDialog(pet) {
      this.$refs.addPetDialog.open(pet)
    },
    updateMember(val) {
      this.oneMember = val
    },
    async updatePet(val) {
      const id = this.$route.params.owner
      const pets = await this.$axios.$get(`/api/pets?ownerId=${id}&limit=0`, {
        progress: false,
      })
      this.ownPets = pets.results
    },
    delPet(id) {
      const index = this.ownPets.findIndex((pet) => {
        return pet.id === id
      })
      this.ownPets.splice(index, 1)
    },
  },
}
</script>

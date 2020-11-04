<template>
  <div>
    <div class="custom-container">
      <ownerCard :owner="oneMember" @update="updateMember" />
      <div class="pt-5">
        <petCard :pets="ownPets" @update="updatePetDialog" @del="delPet" />
      </div>
    </div>
    <petDialog ref="addPetDialog" @update="updatePet" />

    <v-btn
      :key="$nuxt.$route.path"
      v-shortkey="['ctrl', 'alt', 'n']"
      color="cusblue2"
      fixed
      fab
      :small="this.$vuetify.breakpoint.mobile"
      :large="!this.$vuetify.breakpoint.mobile"
      dark
      bottom
      right
      @shortkey="addPetDialog"
      @click.stop="addPetDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import ownerCard from '@/components/Record/UserRecord/ownerCard'
import petCard from '@/components/Record/UserRecord/petCard'
import petDialog from '@/components/Record/UserRecord/petDialog'
export default {
  components: {
    ownerCard,
    petCard,
    petDialog,
  },
  validate({ store }) {
    return (
      store.getters.loggedInUser.roles.some((role) => {
        return role.id === 1 || role.id === 2
      }) || store.getters.loggedInUser.isAdmin
    )
  },
  async asyncData({ $axios, params }) {
    const id = params.owner
    const member = await $axios.$get(`/api/members/${id}`, { progress: false })
    const pets = await $axios.$get(`/api/pets?ownerId=${id}&limit=0`, {
      progress: false,
    })
    for (const pet in pets.results) {
      const date = await $axios.$get(
        `/api/appoints?petId=${pets.results[pet].id}&limit=1`,
        { progress: false }
      )
      Object.assign(pets.results[pet], {
        nextAppoint:
          date.results.length === 0 ? '' : date.results[0].appointDate,
      })
    }
    return { oneMember: member, ownPets: pets.results }
  },
  data() {
    return {
      // ownerDetail: {},
    }
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
      const pets = await this.$axios.$get(`/api/pets?ownerId=${id}`, {
        progress: false,
      })
      for (const pet in pets.results) {
        const date = await this.$axios.$get(
          `/api/appoints?petId=${pets.results[pet].id}&limit=1`,
          { progress: false }
        )
        Object.assign(pets.results[pet], {
          nextAppoint:
            date.results.length === 0 ? '' : date.results[0].appointDate,
        })
      }
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

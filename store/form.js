export const state = () => ({
  prefixes: [],
  petGender: [],
  petType: [],
})

export const mutations = {
  setPrefixes(state, prefix) {
    state.prefixes = prefix
  },
  setGender(state, gender) {
    state.petGender = gender
  },
  setType(state, type) {
    state.petType = type
  },
}

export const actions = {
  async addPrefixes({ commit }) {
    const prefix = await this.$axios.$get('/api/master/prefixes', {
      progress: false,
    })
    commit('setPrefixes', prefix.results)
    return prefix.results
  },
  async addGender({ commit }) {
    const gender = await this.$axios.$get('/api/master/pet-genders', {
      progress: false,
    })
    commit('setGender', gender.results)
    return gender.results
  },
  async addType({ commit }) {
    const type = await this.$axios.$get('/api/master/pet-types', {
      progress: false,
    })
    commit('setType', type.results)
    return type.results
  },
}

export const getters = {}

export const state = () => ({
  prefixes: [],
  petGender: [],
  petType: [],
  doctor: [],
  visitType: [],
  priority: [],
  helper: null,
  itemGroup: [],
  labGroup: [],
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
  setDoctor(state, doctor) {
    state.doctor = doctor
  },
  setvsType(state, vsType) {
    state.visitType = vsType
  },
  setPriority(state, priority) {
    state.priority = priority
  },
  setHelper(state, helper) {
    state.helper = helper
  },
  setItemGroup(state, item) {
    state.itemGroup = item
  },
  setlabGroup(state, lab) {
    state.labGroup = lab
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
  async addDoctor({ commit }) {
    const doctor = await this.$axios.$get('/api/users?roleId=2', {
      progress: false,
    })
    commit('setDoctor', doctor.results)
    return doctor.results
  },
  async addVisitType({ commit }) {
    const vsType = await this.$axios.$get('/api/master/visit-types', {
      progress: false,
    })
    commit('setvsType', vsType.results)
    return vsType.results
  },
  async addPriority({ commit }) {
    const priority = await this.$axios.$get('/api/master/visit-priorities', {
      progress: false,
    })
    commit('setPriority', priority.results)
    return priority.results
  },
  async addItemGroup({ commit }) {
    const item = await this.$axios.$get('/api/master/item-groups', {
      progress: false,
    })
    commit('setItemGroup', item.results)
    return item.results
  },
  async addlabGroup({ commit }) {
    const lab = await this.$axios.$get('/api/master/item-lab-groups', {
      progress: false,
    })
    commit('setlabGroup', lab.results)
    return lab.results
  },
}

export const getters = {}

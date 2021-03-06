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
  mediaType: [],
  appointType: [],
  paymentType: [],
  creditCard: [],
  creditFee: [],
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
  setMedia(state, media) {
    state.mediaType = media
  },
  setappointType(state, type) {
    state.appointType = type
  },
  setpaymentType(state, type) {
    state.appointType = type
  },
  setcreditCard(state, card) {
    state.appointType = card
  },
  setcreditFee(state, fee) {
    state.appointType = fee
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
  async addMedia({ commit }) {
    const media = await this.$axios.$get('/api/master/media-types', {
      progress: false,
    })
    commit('setlabGroup', media.results)
    return media.results
  },
  async addappointType({ commit }) {
    const type = await this.$axios.$get('/api/master/appoint-types', {
      progress: false,
    })
    commit('setappointType', type.results)
    return type.results
  },
  async addpaymentType({ commit }) {
    const type = await this.$axios.$get('/api/master/payment-types', {
      progress: false,
    })
    commit('setappointType', type.results)
    return type.results
  },
  async addcreditCard({ commit }) {
    const card = await this.$axios.$get('/api/master/credit-card-issuers', {
      progress: false,
    })
    commit('setappointType', card.results)
    return card.results
  },
  async addcreditFee({ commit }) {
    const fee = await this.$axios.$get('/api/master/credit-card-fees-methods', {
      progress: false,
    })
    commit('setappointType', fee.results)
    return fee.results
  },
}

export const getters = {}

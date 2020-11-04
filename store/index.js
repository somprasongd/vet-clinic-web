export const state = () => ({
  navTab: {
    check: false,
    checkList: false,
    lab: false,
    xray: false,
    // queueCount: 0,
  },
  auth: null,
  avatarImg: null,
  visitStatus: [
    'waiting',
    'treatment',
    'waiting-result',
    'reported',
    'waiting-pharmacy',
    'doctor-discharge',
    'discharge',
    'cancel',
    'take-home',
  ],
})

export const mutations = {
  setNavTab(state, tab) {
    state.navTab = tab
  },
  setQueue(state, queue) {
    state.queueCount = queue
  },
  setAvatar(state, avatar) {
    state.avatarImg = avatar
  },
  setMe(state, me) {
    state.auth.user = me
  },
  // addQueue(state, value) {
  //   state.queueCount += value
  // },
}

export const actions = {
  // async getQueue({ commit }) {
  //   const queue = await this.$axios.$get('/api/visits', { progress: false })
  //   commit('setQueue', queue.count)
  //   return queue.count
  // },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
  getVisitStatus(state) {
    return (statusId) => state.visitStatus[Number(statusId) - 1]
  },
}

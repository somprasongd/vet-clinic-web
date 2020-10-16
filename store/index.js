export const state = () => ({
  navTab: {
    check: false,
    checkList: false,
    lab: false,
    xray: false,
  },
})

export const mutations = {
  setNavTab(state, tab) {
    state.navTab = tab
  },
}

export const actions = {}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
}

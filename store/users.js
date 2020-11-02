export const state = () => ({
  userList: [],
})

export const mutations = {
  setUser(state, users) {
    state.userList = users
  },
}

export const actions = {
  async getUsers({ commit }) {
    await this.$axios.get('/api/users', { progress: false }).then((res) => {
      commit('setUser', res.data)
    })
  },
}

export const getters = {
  getuserList(state) {
    return state.userList
  },
}

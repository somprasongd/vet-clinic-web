import data from '~/static/customerRecord.json'

export const state = () => ({
  customerState: data,
})

export const mutations = {
  setCustomer(state, customer) {
    state.customerState = customer
  },
  addCustomerState(state, customer) {
    state.customerState.push(customer)
  },
  addPet(state, petContext) {
    state.customerState[
      state.customerState.findIndex((customer) => customer.id === petContext.id)
    ].pet.unshift({
      id: Date.now().toString(),
      name: petContext.pet.name,
      status: petContext.pet.status,
      microship: petContext.pet.microship,
      bd: petContext.pet.bd,
      type: petContext.pet.type,
      specie: petContext.pet.specie,
      gender: petContext.pet.gender,
      color: petContext.pet.color,
      sterile: petContext.pet.sterile,
      scar: petContext.pet.scar,
      appoint: petContext.pet.appoint,
    })
  },
}

export const actions = {
  nuxtServerInit(vuexContext, customer) {
    // const data = [
    //   {
    //     id: 1,
    //     name: 'นายเอ สามสกุลบี',
    //     address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
    //     email: 'myemailaddress@gmail.com',
    //     tel: '098-765-4321',
    //     other: 'ไม่มี',
    //     pet: [
    //       {
    //         id: 1,
    //         name: 'Snow',
    //         status: 'ทั่วไป',
    //         microship: '',
    //         bd: '2014-11-05',
    //         type: 'หมา',
    //         specie: 'บางแก้ว',
    //         gender: 'เมีย',
    //         color: 'ขาวน้ำตาล',
    //         sterile: 'ทำแล้ว',
    //         scar: '-',
    //         appoint: '10/08/2020',
    //       },
    //       {
    //         id: 2,
    //         name: 'Snow',
    //         status: 'ทั่วไป',
    //         microship: '',
    //         bd: '2014-11-05',
    //         type: 'หมา',
    //         specie: 'บางแก้ว',
    //         gender: 'เมีย',
    //         color: 'ขาวน้ำตาล',
    //         sterile: 'ทำแล้ว',
    //         scar: '-',
    //         appoint: '10/08/2020',
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     name: 'นายเอ สามสกุลบี',
    //     address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
    //     email: 'myemailaddress@gmail.com',
    //     tel: '098-765-4321',
    //     other: 'ไม่มี',
    //     status: null,
    //     pet: [
    //       {
    //         id: 1,
    //         name: 'Snow',
    //         status: 'ทั่วไป',
    //         microship: '',
    //         bd: '2014-11-05',
    //         type: 'หมา',
    //         specie: 'บางแก้ว',
    //         gender: 'เมีย',
    //         color: 'ขาวน้ำตาล',
    //         sterile: 'ทำแล้ว',
    //         scar: '-',
    //         appoint: '10/08/2020',
    //       },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     name: 'นายเอ สามสกุลบี',
    //     address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
    //     email: 'myemailaddress@gmail.com',
    //     tel: '098-765-4321',
    //     other: 'ไม่มี',
    //     status: null,
    //     pet: [
    //       {
    //         id: 1,
    //         name: 'Snow',
    //         status: 'ทั่วไป',
    //         microship: '',
    //         bd: '2014-11-05',
    //         type: 'หมา',
    //         specie: 'บางแก้ว',
    //         gender: 'เมีย',
    //         color: 'ขาวน้ำตาล',
    //         sterile: 'ทำแล้ว',
    //         scar: '-',
    //         appoint: '10/08/2020',
    //       },
    //     ],
    //   },
    // ]
    // vuexContext.commit('setCustomer', data)
  },
  async addCustomer(vuexContext, customer) {
    const addCus = {
      id: Date.now().toString(),
      name: customer.prefix + customer.f_name + ' ' + customer.l_name,
      address: customer.address,
      email: customer.email,
      tel:
        customer.tel.slice(0, 3) +
        '-' +
        customer.tel.slice(3, 6) +
        '-' +
        customer.tel.slice(6, 11),
      other: customer.other,
      pet: [],
    }
    vuexContext.commit('addCustomerState', await addCus)
  },
  addPet(vuexContext, pet) {
    vuexContext.commit('addPet', pet)
  },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },

  getCustomer(state) {
    return state.customerState
  },
  getCustomerById: (state) => (id) => {
    return state.customerState.find((customer) => customer.id === id)
  },
}

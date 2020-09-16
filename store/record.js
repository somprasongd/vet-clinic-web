export const state = () => ({
  customerRecord: [
    {
      id: 1,
      name: 'นายเอ สามสกุลบี',
      address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
      email: 'myemailaddress@gmail.com',
      tel: '098-765-4321',
      other: 'ไม่มี',
      pet: [
        {
          name: 'Snow',
          status: 'ทั่วไป',
          microship: '',
          bd: '2014-11-05',
          type: 'หมา',
          specie: 'บางแก้ว',
          gender: 'เมีย',
          color: 'ขาวน้ำตาล',
          sterile: 'ทำแล้ว',
          scar: '-',
          appoint: '10/08/2020',
        },
        {
          name: 'Snow',
          status: 'ทั่วไป',
          microship: '',
          bd: '2014-11-05',
          type: 'หมา',
          specie: 'บางแก้ว',
          gender: 'เมีย',
          color: 'ขาวน้ำตาล',
          sterile: 'ทำแล้ว',
          scar: '-',
          appoint: '10/08/2020',
        },
      ],
    },
    {
      id: 2,
      name: 'นายเอ สามสกุลบี',
      address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
      email: 'myemailaddress@gmail.com',
      tel: '098-765-4321',
      other: 'ไม่มี',
      pet: [
        {
          name: 'Snow',
          status: 'ทั่วไป',
          microship: '',
          bd: '2014-11-05',
          type: 'หมา',
          specie: 'บางแก้ว',
          gender: 'เมีย',
          color: 'ขาวน้ำตาล',
          sterile: 'ทำแล้ว',
          scar: '-',
          appoint: '10/08/2020',
        },
      ],
    },
    {
      id: 3,
      name: 'นายเอ สามสกุลบี',
      address: '55/55 ต.รัษฎา อ.เมือง จ.ภูเก็ต',
      email: 'myemailaddress@gmail.com',
      tel: '098-765-4321',
      other: 'ไม่มี',
      pet: [
        {
          name: 'Snow',
          status: 'ทั่วไป',
          microship: '',
          bd: '2014-11-05',
          type: 'หมา',
          specie: 'บางแก้ว',
          gender: 'เมีย',
          color: 'ขาวน้ำตาล',
          sterile: 'ทำแล้ว',
          scar: '-',
          appoint: '10/08/2020',
        },
      ],
    },
  ],
})

export const mutations = {
  add(state, customer) {
    // console.log(customer)
    state.customerRecord.push({
      id: Date.now(),
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
    })
  },
  addPet(state, pet) {
    // console.log(state.customerRecord)
    for (const data in state.customerRecord) {
      if (state.customerRecord[data].id === pet[1]) {
        state.customerRecord[data].pet.unshift({
          name: pet[0].name,
          status: pet[0].status,
          microship: pet[0].microship,
          bd: pet[0].bd,
          type: pet[0].type,
          specie: pet[0].specie,
          gender: pet[0].gender,
          color: pet[0].color,
          sterile: pet[0].sterile,
          scar: pet[0].scar,
          appoint: pet[0].appoint,
        })
      }
    }
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}

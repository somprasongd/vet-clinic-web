<template>
  <div>
    <v-dialog v-model="assignModal" max-width="700" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">{{ itemData.id !== '' ? 'แก้ไข' : 'เพิ่ม' }}</h2>
        <v-divider class="darker-divider"></v-divider>

        <v-card-text class="pa-0">
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-card class="elevation-0 px-7 py-2" :disabled="disableFirst">
              <v-row dense>
                <v-col cols="6">
                  <v-text-field
                    v-model="itemData.code"
                    :disabled="loading"
                    :rules="rules.code"
                    color="cusblue"
                    label="รหัส"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="itemData.name"
                    :disabled="loading"
                    :rules="rules.name"
                    color="cusblue"
                    label="ชื่อ"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="itemData.itemGroup"
                    :rules="rules.itemGroup"
                    :disabled="editing || loading"
                    color="cusblue"
                    :items="type"
                    item-text="label"
                    item-value="id"
                    item-color="cusblue"
                    :menu-props="{ closeOnContentClick: true }"
                    label="ประเภท"
                  >
                  </v-select>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="itemData.isSet"
                    :disabled="editing || loading"
                    label="Lab ชุด"
                    color="cusblue2"
                  >
                  </v-checkbox>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="itemData.cost"
                    :disabled="loading"
                    :rules="rules.cost"
                    color="cusblue"
                    label="ราคาทุน"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="itemData.price"
                    :disabled="loading"
                    :rules="rules.price"
                    color="cusblue"
                    label="ราคาขาย"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                class="cusblue2--text text-none my-1"
                :disabled="!valid || loading"
                outlined
                block
                @click.stop="itemData.id !== '' ? updateFirst() : fristSubmit()"
              >
                <v-progress-circular
                  v-show="loading"
                  class="mr-2"
                  indeterminate
                  color="cusblue2"
                  :size="15"
                  :width="2"
                ></v-progress-circular>
                {{ itemData.id !== '' ? 'Save' : 'Add' }}
              </v-btn>
            </v-card>
          </v-form>

          <!-- SECOND -->
          <v-form
            v-if="itemData.itemGroup === 1 || itemData.itemGroup === 3"
            ref="form1"
            v-model="valid1"
            lazy-validation
            autocomplete="off"
          >
            <v-divider class="dash-divider"></v-divider>
            <v-card class="elevation-0 px-7 py-2" :disabled="disableSecond">
              <v-row v-if="itemData.itemGroup === 1" dense>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkData.instruction"
                    :disabled="loading1"
                    :rules="rules1.instruction"
                    color="cusblue"
                    label="Instruction"
                  ></v-text-field
                ></v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkData.dose"
                    :disabled="loading1"
                    :rules="rules1.dose"
                    color="cusblue"
                    label="Dose"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkData.unit"
                    :disabled="loading1"
                    :rules="rules1.unit"
                    color="cusblue"
                    label="Unit"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkData.frequency"
                    :disabled="loading1"
                    :rules="rules1.frequency"
                    color="cusblue"
                    label="Frequency"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkData.caution"
                    :disabled="loading1"
                    :rules="rules1.caution"
                    color="cusblue"
                    label="Caution"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div v-else-if="itemData.itemGroup === 3">
                <div v-if="itemData.isSet === true">
                  <v-autocomplete
                    v-model="value"
                    class="rounded-lg"
                    color="cusblue"
                    :items="items"
                    item-text="label"
                    item-value="id"
                    item-color="cusblue"
                    label="ค้นหา Labs"
                    append-icon="mdi-magnify"
                    :search-input.sync="search"
                    return-object
                    light
                    outlined
                    dense
                    hide-details
                    hide-no-data
                    @change="addSubList"
                    @focus="value = null"
                  >
                    <template v-slot:append>
                      <v-icon>mdi-magnify</v-icon>
                    </template>

                    <template v-slot:selection="data">
                      <span>{{ data.item.label }}</span>
                    </template>

                    <template v-slot:item="data">
                      <template>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="data.item.label"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-card class="pa-5 my-2" height="250">
                    <span class="font-weight-medium">รายการ Lab ย่อย</span>
                    <span class="font-weight-medium float-right">Action</span>
                    <br />
                    <v-divider class="medium-divider"></v-divider>
                    <div v-if="subLab.length !== 0">
                      <div
                        v-for="item in subLab"
                        :key="item.index"
                        class="mt-3"
                      >
                        <span>{{ item.label }}</span>
                        <v-btn
                          class="float-right mr-1 mt-n2"
                          color="red"
                          dark
                          icon
                          depressed
                          @click="delSubLab(item.id)"
                        >
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                        <v-divider></v-divider>
                      </div>
                    </div>
                    <div v-else class="text-center pa-5 text--secondary">
                      No data
                    </div>
                  </v-card>
                </div>
                <div v-else-if="itemData.isSet === false">
                  <v-select
                    v-model="checkData.groupId"
                    :disabled="loading1"
                    :rules="rules1.groupId"
                    class="rounded-lg"
                    color="cusblue"
                    :items="groupLab"
                    item-text="label"
                    item-value="id"
                    item-color="cusblue"
                    label="กลุ่ม Lab"
                    dense
                    outlined
                  >
                  </v-select>
                  <v-row dense>
                    <v-col cols="6">
                      <v-select
                        v-model="checkData.resultType"
                        :disabled="loading1"
                        :rules="rules1.resultType"
                        color="cusblue"
                        :items="LabResult"
                        item-text="label"
                        item-value="value"
                        label="ประเภทผล Lab"
                        menu-props="auto"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6"></v-col>
                    <v-col v-if="checkData.resultType === 'text'" cols="12">
                      <v-text-field
                        v-model="checkData.normalStr"
                        :disabled="loading1"
                        :rules="rules1.normalStr"
                        color="cusblue"
                        label=" ค่าปกติ"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col v-if="checkData.resultType === 'numeric'" cols="6">
                      <v-text-field
                        v-model="checkData.normalMin"
                        :disabled="loading1"
                        :rules="rules1.normalMin"
                        color="cusblue"
                        label="ค่าปกติ (min)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col v-if="checkData.resultType === 'numeric'" cols="6">
                      <v-text-field
                        v-model="checkData.normalMax"
                        :disabled="loading1"
                        :rules="rules1.normalMax"
                        color="cusblue"
                        label="ค่าปกติ (max)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="checkData.labUnit"
                        :disabled="loading1"
                        :rules="rules1.labUnit"
                        color="cusblue"
                        label="หน่วย"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <v-btn
                v-if="
                  itemData.itemGroup === 1 ||
                  (itemData.itemGroup === 3 && itemData.isSet === false)
                "
                dense
                :disabled="!valid1 || loading1"
                class="cusblue2--text text-none col-6"
                block
                outlined
                @click.stop="
                  itemData.id !== '' && !changeToCreate
                    ? updateData()
                    : submitData()
                "
              >
                <v-progress-circular
                  v-show="loading1"
                  class="mr-2"
                  indeterminate
                  color="cusblue2"
                  :size="15"
                  :width="2"
                ></v-progress-circular>
                {{ itemData.id !== '' && !changeToCreate ? 'Save' : 'Add' }}
              </v-btn>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions style="border-top: 1px solid rgb(202, 201, 201)">
          <v-spacer></v-spacer>
          <v-btn class="cusblue2--text text-none" text @click="newItem">
            New
          </v-btn>
          <v-btn
            class="cusblue2--text text-none"
            text
            @click="assignModal = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      assignModal: false,
      type: this.$store.state.form.itemGroup,
      groupLab: this.$store.state.form.labGroup,
      LabResult: [
        { label: 'ข้อความ', value: 'text' },
        { label: 'ตัวเลข', value: 'numeric' },
      ],

      res: null,
      loading: false,
      loading1: false,

      timeout: null,
      search: null,
      value: '',
      items: [],
      subLab: [],

      disableFirst: false,
      disableSecond: true,
      editing: false,
      changeToCreate: false,

      valid: false,
      valid1: false,
      itemData: {
        id: '',
        code: '',
        name: '',
        itemGroup: 1,
        cost: '',
        price: '',
        isSet: false,
      },
      checkData: {
        // drug
        instruction: '',
        dose: '',
        unit: '',
        frequency: '',
        caution: '',
        remark: '',
        // lab
        groupId: '',
        resultType: 'text',
        normalStr: '',
        normalMin: '',
        normalMax: '',
        labUnit: '',
      },
      rules: {
        code: [
          (v) => !!v || 'กรุณากรอกโค้ด',
          (v) => (v && v.length <= 50) || 'ไม่ควรกรอกชื่อเกิน 50 ตัวอักษร',
          (v) => (v && this.checkDuplicate(v)) || 'โค้ดถูกใช้งานแล้ว',
        ],
        name: [
          (v) => !!v || 'กรุณากรอกข้อความ',
          (v) => (v && v.length <= 50) || 'ไม่ควรกรอกข้อความเกิน 50 ตัวอักษร',
        ],
        itemGroup: [(v) => !!v || 'กรุณาเลือกประเภท'],
        cost: [(v) => (v && /^[0-9]*$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น'],
        price: [(v) => (v && /^[0-9]*$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น'],
      },
      rules1: {
        // drug
        instruction: [
          (v) => !!v || 'กรุณากรอกคำแนะนำ',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกคำแนะนำเกิน 100 ตัวอักษร',
        ],
        dose: [(v) => (v && /^[0-9]*$/.test(v)) || 'กรุณากรอกตัวเลขเท่านั้น'],
        unit: [
          (v) => !!v || 'กรุณากรอกหน่วย',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกหน่วยเกิน 100 ตัวอักษร',
        ],
        frequency: [
          (v) => !!v || 'กรุณากรอกความถี่',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร',
        ],
        caution: [
          (v) => !!v || 'กรุณากรอกข้อควรระวัง',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกความถี่เกิน 100 ตัวอักษร',
        ],
        // lab
        groupId: [(v) => !!v || 'กรุณาเลือกกลุ่ม'],
        resultType: [(v) => !!v || 'กรุณาเลือกประเภท'],
        normalStr: [
          (v) => !!v || 'กรุณากรอกค่าปกติ',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกค่าปกติ 100 ตัวอักษร',
        ],
        normalMin: [
          (v) =>
            (v && /^[0-9.]*$/.test(v)) || 'กรุณากรอกตัวเลขหรือทศนิยมเท่านั้น',
        ],
        normalMax: [
          (v) =>
            (v && /^[0-9.]*$/.test(v)) || 'กรุณากรอกตัวเลขหรือทศนิยมเท่านั้น',
        ],
        labUnit: [
          (v) => !!v || 'กรุณากรอกหน่วย',
          (v) => (v && v.length <= 100) || 'ไม่ควรกรอกหน่วยเกิน 100 ตัวอักษร',
        ],
      },
    }
  },
  watch: {
    search(val) {
      if (val !== '') {
        val && val !== this.value && this.querySelections(val)
      } else {
        this.items = []
      }
    },
    assignModal(val) {
      if (val === false) {
        this.newItem()
      }
    },
  },
  mounted() {
    if (this.$store.state.form.itemGroup.length === 0) {
      this.$store.dispatch('form/addItemGroup').then((res) => {
        this.type = res
      })
    }
    if (this.$store.state.form.labGroup.length === 0) {
      this.$store.dispatch('form/addlabGroup').then((res) => {
        this.groupLab = res
      })
    }
  },
  methods: {
    open(id) {
      if (id !== undefined) {
        const index = this.itemList.findIndex((item) => {
          return item.id === id
        })
        const editItem = { ...this.itemList[index] }
        this.itemData = {
          id: editItem.id,
          code: editItem.code,
          name: editItem.label,
          itemGroup: editItem.itemGroup.id,
          cost: editItem.cost,
          price: editItem.price,
          isSet: editItem.isSet,
        }
        this.disableSecond = false
        this.editing = true
        if (editItem.itemGroup.id === 1) {
          this.$axios
            .$get(`/api/config/items/${editItem.id}/drugs`, {
              progress: false,
            })
            .then((res) => {
              this.checkData = {
                // drug
                instruction: res.instruction,
                dose: res.dose,
                unit: res.unit,
                frequency: res.frequency,
                caution: res.caution,
                remark: res.remark,
                // lab
                groupId: '',
                resultType: 'text',
                normalStr: '',
                normalMin: '',
                normalMax: '',
                labUnit: '',
              }
              this.changeToCreate = false
            })
            .catch((error) => {
              this.changeToCreate = true
              console.log(error)
            })
        } else if (editItem.itemGroup.id === 3 && editItem.isSet === false) {
          this.$axios
            .$get(`/api/config/items/${editItem.id}/labs`, {
              progress: false,
            })
            .then((res) => {
              this.checkData = {
                // drug
                instruction: '',
                dose: '',
                unit: '',
                frequency: '',
                caution: '',
                remark: '',
                // lab
                groupId: res.groupId,
                resultType: res.resultType,
                normalStr: res.normalStr,
                normalMin: res.normalMin,
                normalMax: res.normalMax,
                labUnit: res.unit,
              }
              this.changeToCreate = false
            })
            .catch(() => {
              this.changeToCreate = true
            })
        } else if (editItem.itemGroup.id === 3 && editItem.isSet === true) {
          this.res = { id: editItem.id }
          this.$axios
            .$get(`/api/config/items/${editItem.id}/set`, {
              progress: false,
            })
            .then((res) => {
              this.subLab = res
            })
            .catch((error) => {
              alert(error)
            })
        }
      }
      this.assignModal = true
    },
    checkDuplicate(val) {
      if (this.itemData.id === '') {
        return !this.itemList.some((item) => {
          return item.code.toLowerCase() === val.toLowerCase()
        })
      } else {
        return !this.itemList.some((item) => {
          return (
            item.code.toLowerCase() === val.toLowerCase() &&
            item.code !== this.itemData.code
          )
        })
      }
    },
    querySelections(v) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$axios
          .$get(`/api/config/items?itemGroupId=3&isSet=false&label=${v}`, {
            progress: false,
          })
          .then((res) => {
            this.items = res.results
          })
          .catch((error) => {
            alert(error)
          })
      }, 500)
    },
    fristSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const item = { ...this.itemData }
        const sendItem = {
          code: item.code,
          label: item.name,
          cost: item.cost,
          price: item.price,
          isSet: item.isSet,
          itemGroupId: item.itemGroup,
        }
        this.$axios
          .$post('/api/config/items', sendItem, { progress: false })
          .then((res) => {
            setTimeout(() => {
              this.loading = false
              this.$emit('add', res)
              if (item.itemGroup === 1 || item.itemGroup === 3) {
                this.disableFirst = true
                this.disableSecond = false
                this.res = res
              } else {
                this.assignModal = false
              }
            }, 500)
          })
          .catch((error) => {
            this.loading = false
            alert(error)
          })
      }
    },
    submitData() {
      if (this.$refs.form1.validate()) {
        this.loading1 = true
        const data = { ...this.checkData }
        const item = this.changeToCreate
          ? {
              id: this.itemData.id,
              itemGroupId: this.itemData.itemGroup,
              isSet: this.itemData.isSet,
            }
          : this.res
        console.log(item)
        if (item.itemGroupId === 1) {
          const drug = {
            unit: data.unit,
            dose: data.dose,
            caution: data.caution,
            frequency: data.frequency,
            instruction: data.instruction,
          }
          this.$axios
            .$post(`/api/config/items/${item.id}/drugs`, drug, {
              progress: false,
            })
            .then(() => {
              setTimeout(() => {
                this.loading1 = false
                this.assignModal = false
              }, 500)
            })
            .catch((error) => {
              this.loading1 = false
              alert(error)
            })
        } else if (item.itemGroupId === 3 && item.isSet === false) {
          const lab =
            data.resultType === 'numeric'
              ? {
                  groupId: data.groupId,
                  resultType: data.resultType,
                  normalMin: data.normalMin,
                  normalMax: data.normalMax,
                  unit: data.labUnit,
                }
              : {
                  groupId: data.groupId,
                  resultType: data.resultType,
                  normalStr: data.normalStr,
                  unit: data.labUnit,
                }
          this.$axios
            .$post(`/api/config/items/${item.id}/labs`, lab, {
              progress: false,
            })
            .then(() => {
              setTimeout(() => {
                this.loading1 = false
                this.assignModal = false
              }, 500)
            })
            .catch((error) => {
              this.loading1 = false
              alert(error)
            })
        }
      }
    },
    updateFirst() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const item = { ...this.itemData }
        const sendItem = {
          code: item.code,
          label: item.name,
          cost: item.cost,
          price: item.price,
          isSet: item.isSet,
          itemGroupId: item.itemGroup,
        }
        this.$axios
          .$put(`/api/config/items/${item.id}`, sendItem, { progress: false })
          .then((res) => {
            setTimeout(() => {
              this.loading = false
              this.$emit('add', item.id)
            }, 500)
          })
          .catch((error) => {
            this.loading = false
            alert(error)
          })
      }
    },
    updateData() {
      if (this.$refs.form1.validate()) {
        this.loading1 = true
        const data = { ...this.checkData }
        const item = this.itemData
        console.log(this.changeToCreate)
        if (item.itemGroup === 1) {
          const drug = {
            unit: data.unit,
            dose: data.dose,
            caution: data.caution,
            frequency: data.frequency,
            instruction: data.instruction,
          }
          this.$axios
            .$put(`/api/config/items/${item.id}/drugs`, drug, {
              progress: false,
            })
            .then(() => {
              setTimeout(() => {
                this.loading1 = false
                this.assignModal = false
              }, 500)
            })
            .catch((error) => {
              this.loading1 = false
              alert(error)
            })
        } else if (item.itemGroup === 3 && item.isSet === false) {
          const lab =
            data.resultType === 'numeric'
              ? {
                  groupId: data.groupId,
                  resultType: data.resultType,
                  normalMin: data.normalMin,
                  normalMax: data.normalMax,
                  unit: data.labUnit,
                }
              : {
                  groupId: data.groupId,
                  resultType: data.resultType,
                  normalStr: data.normalStr,
                  unit: data.labUnit,
                }
          this.$axios
            .$put(`/api/config/items/${item.id}/labs`, lab, {
              progress: false,
            })
            .then(() => {
              setTimeout(() => {
                this.loading1 = false
                this.assignModal = false
              }, 500)
            })
            .catch((error) => {
              this.loading1 = false
              alert(error)
            })
        }
      }
    },
    addSubList() {
      if (this.value != null) {
        this.$axios
          .$post(`/api/config/items/${this.res.id}/set/${this.value.id}`, {
            progress: false,
          })
          .then(() => {
            this.subLab.push(this.value)
            this.value = ''
          })
          .catch((error) => {
            alert(error)
          })
      }
    },
    delSubLab(id) {
      this.$axios
        .$delete(`/api/config/items/${this.res.id}/set/${id}`, {
          progress: false,
        })
        .then(() => {
          const index = this.subLab.findIndex((lab) => {
            return lab.id === id
          })
          this.subLab.splice(index, 1)
        })
        .catch((error) => {
          alert(error)
        })
    },
    newItem() {
      this.itemData = {
        id: '',
        code: '',
        name: '',
        itemGroup: 1,
        cost: '',
        price: '',
        isSet: false,
      }
      this.checkData = {
        // drug
        instruction: '',
        dose: '',
        unit: '',
        frequency: '',
        caution: '',
        remark: '',
        // lab
        groupId: '',
        resultType: 'text',
        normalStr: '',
        normalMin: '',
        normalMax: '',
        labUnit: '',
      }
      this.res = null
      this.subLab = []
      this.disableFirst = false
      this.disableSecond = true
      this.editing = false
      this.$refs.form.resetValidation()
      if (this.$refs.form1 !== undefined) {
        this.$refs.form1.resetValidation()
      }
    },
  },
}
</script>

<template>
  <v-card color="grey lighten-4" flat tile>
    <v-row
      :class="`second-nav cusblue1 ${
        this.$vuetify.breakpoint.xsOnly ? 'pb-2' : ''
      }`"
      height="55"
      align="center"
      justify="center"
      dense
      flat
    >
      <h1 class="font-weight-medium col-sm-4 col-12">POS</h1>

      <v-spacer></v-spacer>

      <v-subheader
        v-show="!this.$vuetify.breakpoint.smAndDown"
        class="cus-subhead"
        >ค้นหารายการ :
      </v-subheader>
      <v-autocomplete
        v-model="value"
        class="rounded-lg cus-longfield"
        background-color="cusblue3"
        :items="items"
        item-text="name"
        item-value="name"
        item-color="cusblue2"
        :search-input.sync="search"
        :loading="loading"
        return-object
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
        hide-no-data
        @change="showModal"
        @focus="value = null"
      >
        <template v-slot:append>
          <v-icon>mdi-magnify</v-icon>
        </template>

        <template v-slot:selection="data">
          <span>{{ data.item.name }}</span>
        </template>

        <template v-slot:item="data">
          <template>
            <v-list-item-content>
              <v-list-item-title v-text="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>

      <v-text-field
        v-model="count"
        prepend-icon="mdi-close"
        class="ml-2 rounded-lg text-navs"
        background-color="cusblue3"
        style="max-width: 100px"
        dark
        filled
        rounded
        single-line
        dense
        flat
        hide-details
      ></v-text-field>
    </v-row>

    <v-dialog v-model="assignModal" max-width="600" scrollable>
      <v-card>
        <h2 class="pa-5 pb-2">เพิ่มรายการ</h2>
        <v-divider></v-divider>

        <div class="pa-8">
          <v-row align="center" justify="center">
            <v-col cols="6">รายการ : {{ addData.nameList }}</v-col>
            <v-col cols="6">ประเภท : {{ addData.type }}</v-col>
            <v-col cols="6">
              <v-row align="center" justify="center">
                <v-col cols="3">
                  <span>จำนวน</span>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="addData.num"
                    class="short-textfilds"
                    solo
                    dense
                    hide-details
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <span>เม็ด</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="5">
                  <span>ราคาต่อหน่วย</span>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="addData.num"
                    class="short-textfilds"
                    solo
                    dense
                    hide-details
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <span>บาท</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="addData.instr"
                label="Instruction"
                color="cusblue2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="addData.dose"
                label="Dose"
                color="cusblue2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="addData.freq"
                label="Frequency"
                color="cusblue2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="addData.caution"
                label="Caution"
                color="cusblue2"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cusblue2" text @click="assignModal = false"
            >ยกเลิก</v-btn
          >

          <v-btn color="cusblue2" text @click="assignModal = false"
            >บันทึก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  <!-- <v-row class="cusblue1 custom-nav" align="center" justify="center" dense>
    <v-col md="4" cols="12">
      <h1 class="font-weight-medium">POS</h1>
    </v-col>
    <v-col md="1" cols="3"> ค้นหารายการ : </v-col>
    <v-col md="7" cols="9">
      <v-row no-gutters>
        <v-col cols="8" md="10">
          <v-autocomplete
            v-model="value"
            class="cusblue3 rounded-lg"
            :items="items"
            item-text="name"
            item-value="name"
            item-color="cusblue2"
            :search-input.sync="search"
            :loading="loading"
            return-object
            dark
            filled
            rounded
            single-line
            dense
            flat
            hide-details
            hide-no-data
            @change="showModal"
            @focus="value = null"
          >
            <template v-slot:append>
              <v-icon>mdi-magnify</v-icon>
            </template>

            <template v-slot:selection="data">
              <span>{{ data.item.name }}</span>
            </template>

            <template v-slot:item="data">
              <template>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="data.item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="4" md="2">
          <v-text-field
            v-model="count"
            prepend-icon="mdi-close"
            class="ml-2 rounded-lg text-navs"
            dark
            filled
            rounded
            single-line
            dense
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-dialog v-model="assignModal" max-width="600" scrollable>
        <v-card>
          <h2 class="pa-5 pb-2">เพิ่มรายการ</h2>
          <v-divider></v-divider>

          <div class="pa-8">
            <v-row align="center" justify="center">
              <v-col cols="6">รายการ : {{ addData.nameList }}</v-col>
              <v-col cols="6">ประเภท : {{ addData.type }}</v-col>
              <v-col cols="6">
                <v-row align="center" justify="center">
                  <v-col cols="3">
                    <span>จำนวน</span>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="addData.num"
                      class="short-textfilds"
                      solo
                      dense
                      hide-details
                      flat
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <span>เม็ด</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="5">
                    <span>ราคาต่อหน่วย</span>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="addData.num"
                      class="short-textfilds"
                      solo
                      dense
                      hide-details
                      flat
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <span>บาท</span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="addData.instr"
                  label="Instruction"
                  color="cusblue2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addData.dose"
                  label="Dose"
                  color="cusblue2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addData.freq"
                  label="Frequency"
                  color="cusblue2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="addData.caution"
                  label="Caution"
                  color="cusblue2"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cusblue2" text @click="assignModal = false"
              >ยกเลิก</v-btn
            >

            <v-btn color="cusblue2" text @click="assignModal = false"
              >บันทึก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row> -->
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      loading: false,
      items: [],
      search: null,
      value: null,
      drug: [
        { name: 'kkkk', type: 'เม็ด' },
        { name: 'www', type: 'น้ำ' },
        { name: 'kkss', type: 'เม็ด' },
        { name: 'kwkkk', type: 'เม็ด' },
        { name: 'wfww', type: 'น้ำ' },
        { name: 'kwkss', type: 'เม็ด' },
        { name: 'kkfkk', type: 'เม็ด' },
        { name: 'wwww', type: 'น้ำ' },
        { name: 'kfkss', type: 'เม็ด' },
        { name: 'kwkkk', type: 'เม็ด' },
        { name: 'wfww', type: 'น้ำ' },
        { name: 'kwkss', type: 'เม็ด' },
      ],

      assignModal: false,
      addData: {
        nameList: '',
        type: '',
        num: '',
        price: '',
        instr: '',
        dose: '',
        freq: '',
        caution: '',
      },
    }
  },
  watch: {
    search(val) {
      val && val !== this.value && this.querySelections(val)
    },
    assignModal() {
      if (this.assignModal === false) this.count = 1
    },
  },
  methods: {
    showModal() {
      if (this.value != null) {
        this.assignModal = true
        this.addData.nameList = this.value.name
        this.addData.type = this.value.type
      }
    },
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.drug
        this.loading = false
      }, 500)
    },
  },
}
</script>

<style lang="scss">
.short-textfilds.v-text-field.v-text-field--enclosed .v-input__slot {
  padding: 0px !important;
  width: 60px;
  margin: 0 auto;
  border: 1px solid rgb(180, 180, 180);
  input {
    text-align: center;
  }
  .long-little {
    width: 60px;
  }
}
.menuable__content__active .v-autocomplete__content {
  background: red;
}
.v-autocomplete__content {
  border-radius: 5px !important;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(161, 161, 161);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background: white;
    border-radius: 10px;
  }
}
</style>

<template>
  <div>
    <v-data-table
      ref="vDataTable"
      class="elevation-4 overflow-y-auto"
      :headers="header"
      :items="dessert"
      :expanded.sync="expanded"
      show-expand
      item-key="id"
      disable-pagination
      hide-default-footer
      fixed-header
      height="calc(100vh - 160px)"
    >
      <!-- <template v-slot:item="{ item, isMobile, headers, index }">
        <tr v-if="!isMobile">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="font-weight-medium">
              <nuxt-link
                class="bold-owner text-decoration-none"
                :to="'/record/' + item.id"
                >{{ item.fullName }}
                <v-icon color="cusblue2" small
                  >mdi-chevron-right</v-icon
                ></nuxt-link
              >
            </div>
          </td>
          <td>
            <div v-for="tel in item.tels" :key="tel">{{ dashPhone(tel) }},</div>
          </td>
          <td>{{ item.address }}</td>
        </tr>
        <tr v-else class="v-data-table__mobile-table-row">
          <td class="v-data-table__mobile-row">
            <div class="v-data-table__mobile-row__header">{{ headers[0] }}</div>
            <div class="v-data-table__mobile-row__cell">{{ index + 1 }}</div>
          </td>
          <td class="v-data-table__mobile-row">
            <div class="v-data-table__mobile-row__header">{{ headers[1] }}</div>
            <div class="v-data-table__mobile-row__cell">
              <div class="font-weight-medium">
                <nuxt-link
                  class="bold-owner text-decoration-none"
                  :to="'/record/' + item.id"
                  >{{ item.fullName }}
                  <v-icon color="cusblue2" small
                    >mdi-chevron-right</v-icon
                  ></nuxt-link
                >
              </div>
            </div>
          </td>
          <td class="v-data-table__mobile-row">
            <div class="v-data-table__mobile-row__header">{{ headers[2] }}</div>
            <div class="v-data-table__mobile-row__cell">
              {{ dashPhone(tel) }},
            </div>
          </td>
          <td class="v-data-table__mobile-row">
            <div class="v-data-table__mobile-row__header">{{ headers[3] }}</div>
            <div class="v-data-table__mobile-row__cell">{{ item.address }}</div>
          </td>
        </tr>
      </template> -->
      <template v-slot:[`item.id`]="{ item }">
        <div>{{ orderNum(dessert, item.id) }}</div>
      </template>
      <template v-slot:[`item.fullName`]="{ item }">
        <div class="font-weight-medium">
          <nuxt-link
            class="bold-owner text-decoration-none"
            :to="'/record/' + item.id"
            >{{ item.fullName }}
            <v-icon color="cusblue2" small>mdi-chevron-right</v-icon></nuxt-link
          >
        </div>
      </template>
      <!-- <template v-slot:[`item.tels`]="{ item }">
        <div v-for="tel in item.tels" :key="tel">{{ dashPhone(tel) }},</div>
      </template> -->
      <template v-slot:[`item.data-table-expand`]="props">
        <v-icon
          :class="{
            'v-data-table__expand-icon': true,
            'v-data-table__expand-icon--active':
              props.isExpanded && transitioned[getItemId(props.item)],
          }"
          @click="toggleExpand(props)"
        >
          mdi-chevron-down
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <v-expand-transition>
          <td
            :colspan="headers.length"
            :class="{
              'ma-0 pa-0': true,
              'expanded-closing': !transitioned[getItemId(item)],
            }"
            style="height: auto"
          >
            <v-expand-transition>
              <!-- Container we'll transition -->
              <div v-show="transitioned[getItemId(item)]">
                <!-- container for content. replace with whatever you want -->
                <div class="pa-2" style="min-height: 100px">
                  <petTable :owner="item.id" />
                </div>
              </div>
            </v-expand-transition>
          </td>
        </v-expand-transition>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import petTable from '@/components/Record/petTable'
export default {
  components: {
    petTable,
  },
  props: {
    dessert: {
      default: null,
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      expanded: [],
      transitioned: [],
      closeTimeouts: {},
      singleExpand: false,
      header: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { text: 'รหัส', width: '150', value: 'code', sortable: false },
        { text: 'เจ้าของ', value: 'fullName', sortable: false },
        { text: 'เบอร์ติดต่อ', value: 'tels', sortable: false },
        { text: 'ที่อยู่', value: 'fullAddress', sortable: false },
        {
          text: 'ข้อมูลสัตว์เลี้ยง',
          align: 'center',
          width: '120',
          value: 'data-table-expand',
        },
      ],
    }
  },
  methods: {
    orderNum(data, id) {
      return (
        data
          .map(function (x) {
            return x.id
          })
          .indexOf(id) + 1
      )
    },
    dashPhone(num) {
      return num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6, 11)
    },

    // expand table row
    getItemId(item) {
      return item.id // Must be uid of record (would be nice if v-data-table exposed a "getItemKey" method)
    },
    toggleExpand(props) {
      const item = props.item
      const id = this.getItemId(item)
      if (props.isExpanded && this.transitioned[id]) {
        // If we're expanded and not in the process of closing, close
        this.closeExpand(item)
      } else {
        // If we're closed or in the process of closing, expand
        // Stop us from closing if a close transition was started
        clearTimeout(this.closeTimeouts[id])
        // Tell v-data-table to add the expansion content for the item
        props.expand(true)
        // Show expansion content with transition animation after it's had time to get added to the DOM
        this.$nextTick(() => this.$set(this.transitioned, id, true))
        // Hide all other expanded items if single-expand
        if (this.singleExpand)
          this.$nextTick(() =>
            this.expanded.forEach((i) => i !== item && this.closeExpand(i))
          )
      }
    },
    closeExpand(item) {
      const id = this.getItemId(item)
      // Mark that this item is in the process of closing
      this.$set(this.transitioned, id, false)
      // Remove expansion content from DOM after transition animation has had enough time to finish
      this.closeTimeouts[id] = setTimeout(
        () => this.$refs.vDataTable.expand(item, false),
        600
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.bold-owner {
  padding: 5px;
  border-radius: 15px;
}
.bold-owner:hover {
  background-color: rgb(212, 212, 212);
  cursor: pointer;
  transition: 0.5s;
}
.expanded-closing {
  border-bottom: none !important;
}
</style>

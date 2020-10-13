<template>
  <v-card class="my-1 mx-1" max-height="100%">
    <v-card-title class="pb-1 pt-3">
      {{ cardTitle }}
      <v-chip
        v-if="isEditing == true"
        class="ma-2"
        color="warning"
        outlined
        pill
        x-small
      >
        Editing
      </v-chip>

      <v-spacer></v-spacer>
      <v-btn color="cusblue2" icon @click="isExpand = !isExpand">
        <v-icon v-show="isExpand == false">mdi-chevron-down</v-icon>
        <v-icon v-show="isExpand == true">mdi-chevron-up</v-icon>
      </v-btn>
    </v-card-title>

    <v-expand-transition>
      <div v-show="isExpand" class="card-content">
        <v-divider class="darker-divider"></v-divider>

        <div>
          <Mentionable
            :keys="['@']"
            :items="items"
            offset="6"
            insert-space
            @open="onOpen"
          >
            <textarea
              v-model="textContents"
              placeholder="write something...."
              :readonly="isEditing == false"
            />

            <template #no-result>
              <div class="dim">No result</div>
            </template>

            <template #item-@="{ item }">
              <div class="user">
                {{ item.value }}
                <span class="dim"> ({{ item.firstName }}) </span>
              </div>
            </template>
          </Mentionable>
        </div>

        <v-card-actions class="customAction">
          <v-btn
            v-if="isEditing == false"
            color="cusblue2"
            class="ma-0"
            text
            fab
            x-small
            @click="isEditing = true"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="cusblue2"
            class="ma-0"
            text
            fab
            x-small
            @click=";(isEditing = false), (textContents = Format(textContents))"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { Mentionable } from 'vue-mention'

export default {
  components: {
    Mentionable,
  },
  props: {
    cardTitle: {
      type: String,
      required: true,
    },
    textContent: {
      default: null,
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isEditing: false,
      isExpand: !this.$vuetify.breakpoint.smAndDown,

      textContents: this.textContent,
      items: [],
      users: [
        {
          value: 'akryum',
          firstName: 'Guillaume',
        },
        {
          value: 'posva',
          firstName: 'Eduardo',
        },
        {
          value: 'atinux',
          firstName: 'Sébastien',
        },
      ],
    }
  },
  methods: {
    onOpen(key) {
      this.items = key === '@' ? this.users : null
    },
    Format(content) {
      // console.log(content)
      // content = content.replace("@", "")
      return content
        .replace(/@+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .replace(/[ \t\r]+/g, ' ')
    },
  },
}
</script>

<style lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 5px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.3);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
.customAction {
  padding: 0px;
  bottom: 0px;
  position: absolute;
  border-top: 1px solid rgb(207, 207, 207);
  border-right: 1px solid rgb(207, 207, 207);
  border-radius: 0px 5px 0px 5px !important;
  background: rgba(255, 255, 255, 0.7);
}

.customAction-right {
  padding: 0px;
  right: 0px;
  bottom: 0px;
  position: absolute;
  border-top: 1px solid rgb(207, 207, 207);
  border-left: 1px solid rgb(207, 207, 207);
  border-radius: 5px 0px 5px 0px !important;
  background: rgba(255, 255, 255, 0.7);
}
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
  // background: white;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}

.mention-selected {
  background: #49bfe8;
  color: white;
  transition: 0.3s;
  cursor: pointer;
}
.mentionable {
  textarea {
    resize: none;
    width: 100%;
    height: calc(30vh - 80px);
    border: none;
    padding: 0px 16px;
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(161, 161, 161);
      border-radius: 10px;
    }
    // &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    // }
  }
}
</style>

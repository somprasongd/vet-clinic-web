<template>
  <v-dialog
    v-model="show"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <h2 class="pl-6 pt-3 pb-2">{{ title }}</h2>
      <v-card-text v-show="!!message"> {{ message }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="options.color" text @click.native="agree"> ใช่ </v-btn>
        <v-btn color="grey" text @click.native="cancel"> ไม่ </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 290,
      zIndex: 200,
    },
  }),
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        this.dialog = value
        if (value === false) {
          this.cancel()
        }
      },
    },
  },
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
      this.$emit('onOk')
    },
    cancel() {
      this.dialog = false
      this.resolve(false)
      this.$emit('onCancel')
    },
  },
}
</script>

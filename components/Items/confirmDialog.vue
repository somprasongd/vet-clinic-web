<template>
  <v-dialog
    v-model="isShowDialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <h2 class="pl-6 pt-3 pb-2">{{ title }}</h2>
      <v-card-text v-show="!!message"> {{ message }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn ref="btnOk" :color="options.color" text @click.native="agree">
          ใช่
        </v-btn>
        <v-btn ref="cancelDialog" color="grey" text @click.native="cancel">
          ไม่
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    isShowDialog: false,
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
  methods: {
    open(title, message, options) {
      this.isShowDialog = true
      this.$nextTick(() => this.$refs.cancelDialog.$el.focus())
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.isShowDialog = false
      this.resolve(true)
      this.$emit('onOk')
    },
    cancel() {
      this.isShowDialog = false
      this.resolve(false)
      this.$emit('onCancel')
    },
  },
}
</script>

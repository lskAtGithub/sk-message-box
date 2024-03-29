import { createApp, defineComponent, h } from 'vue'
import Dialog from './Dialog.vue'

interface MessageBox {
  title?: string
  content?: string
  closeBtnText?: string
  confirmBtnText?: string
}

function MessageBox() {
  return {
    alert(props: MessageBox) {
      return new Promise((resolve) => {
        const container = document.createElement('div')
        const messageBox = createApp(Dialog, {
          ...props,
          modelValue: true,
          confirmFn: onClose,
          closeFn: onClose,
          isDeclarative: true,
          isShowCloseBtn: false
        })
        messageBox.mount(container)
        document.body.appendChild(container)
        function onClose() {
          resolve(undefined)
          messageBox.unmount()
          document.body.removeChild(container)
        }
      })
    },
    confirm(props: MessageBox) {
      return new Promise((resolve, reject) => {
        const container = document.createElement('div')
        const messageBox = createApp(Dialog, {
          ...props,
          modelValue: true,
          closeFn: onClose,
          confirmFn: onConfirm,
          isDeclarative: true
        })
        messageBox.mount(container)
        document.body.appendChild(container)
        function onClose() {
          reject(undefined)
          messageBox.unmount()
          document.body.removeChild(container)
        }
        function onConfirm() {
          resolve(undefined)
          messageBox.unmount()
          document.body.removeChild(container)
        }
      })
    }
  }
}

const useMessageBox = MessageBox()
const SkMessageBox = defineComponent({
  props: {
    modelValue: Boolean,
    title: String,
    content: String,
    closeBtnText: String,
    confirmBtnText: String,
    isShowConfirmBtn: {
      type: Boolean,
      default: () => true
    },
    isShowCloseBtn: {
      type: Boolean,
      default: () => true
    }
  },
  render() {
    return h(
      Dialog,
      {
        ...this.$props,
        'onUpdate:modelValue': (value: boolean) => this.$emit('update:modelValue', value)
      },
      this.$slots
    )
  }
})

export { useMessageBox, SkMessageBox }

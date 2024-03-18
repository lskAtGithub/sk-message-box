<script setup lang="ts">
import { withDefaults } from 'vue'
import './dialog.css'
import close from './close.png'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    content?: string
    closeBtnText?: string
    confirmBtnText?: string
    isShowConfirmBtn?: boolean
    isShowCloseBtn?: boolean
    closeFn?: Function
    confirmFn?: Function
    isDeclarative?: boolean
  }>(),
  {
    closeBtnText: '取 消',
    confirmBtnText: '确 认',
    isShowConfirmBtn: true,
    isShowCloseBtn: true,
    isDeclarative: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', onClose: Function): void
}>()

function isRunCloseFn() {
  if (props.isDeclarative) {
    if (props.closeFn && typeof props.closeFn === 'function') {
      props.closeFn()
      return false
    }
  }
  return true
}
function isRunConfirmFn() {
  if (props.isDeclarative) {
    if (props.confirmFn && typeof props.confirmFn === 'function') {
      props.confirmFn(props.closeFn!)
      return false
    }
  }
  return true
}

function onConfirm() {
  if (isRunConfirmFn()) {
    emit('confirm', onClose)
  }
}
function onClose() {
  if (!isRunCloseFn()) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <div class="--sk-wrapper" v-if="modelValue" @click.self="onClose">
    <div class="--sk-wrapper_body">
      <div class="--sk-wrapper_title">
        <span>{{ title }}</span>
        <img
          @click="onClose"
          class="--sk-wrapper_title_close_icon"
          :src="close"
          alt="x"
        />
      </div>
      <div class="--sk-wrapper_content">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
      <div class="--sk-wrapper_footer">
        <slot name="footer">
          <div class="--sk-wrapper_footer_button_box">
            <button
              v-if="isShowConfirmBtn"
              class="--sk-wrapper_footer_button __primary"
              @click="onConfirm"
            >
              {{ confirmBtnText }}
            </button>
            <button
              v-if="isShowCloseBtn"
              class="--sk-wrapper_footer_button"
              @click="onClose"
            >
              {{ closeBtnText }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
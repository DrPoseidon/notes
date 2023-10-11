<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import CloseIcon from '@/assets/icons/close.svg'
  import { watch } from 'vue'

  const props = withDefaults(
    defineProps<{
      isShow: boolean
      title: string
    }>(),
    {
      isShow: false,
      title: ''
    }
  )

  const emit = defineEmits<{
    (e: 'close-popup'): void
  }>()

  watch(
    () => props.isShow,
    (value) => {
      document.body.style.overflow = value ? 'hidden' : ''
    }
  )
</script>

<template>
  <div v-if="isShow" class="app-popup">
    <div class="app-popup__window">
      <div class="app-popup__window-header">
        <h4>{{ title }}</h4>

        <a class="app-popup__close" @click="emit('close-popup')">
          <app-svg-icon :icon="CloseIcon" />
        </a>
      </div>

      <div class="app-popup__window-body">
        <slot name="body" />
      </div>

      <div class="app-popup__window-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue'
  import type { IProps } from './types'

  const props = withDefaults(defineProps<IProps>(), {
    width: 20,
    height: 20,
    size: 0
  })

  /**
   * Выбор ширины
   */
  const svgWidth = computed(() => (props.size ? props.size : props.width))

  /**
   * Выбор высоты
   */
  const svgHeight = computed(() => (props.size ? props.size : props.height))

  // const viewBox = ref(`0 0 ${svgWidth.value} ${svgHeight.value}`)

  const symbolId = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" :width="svgWidth" :height="svgHeight">
    <use :href="symbolId" fill="black" />
  </svg>
</template>

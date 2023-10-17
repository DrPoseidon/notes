<script setup lang="ts">
  import { computed, Ref } from 'vue'
  import { IProps } from './module'

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

  type TViewBox = string | undefined

  const viewBox: Ref<TViewBox> = computed(() => {
    if (props.icon.render) {
      const { width, height } = props.icon.render().props
      return `0 0 ${width} ${height}`
    }
    return `0 0 ${svgWidth.value} ${svgHeight.value}`
  })
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    :width="svgWidth"
    :height="svgHeight"
    :viewBox="viewBox"
  />
</template>

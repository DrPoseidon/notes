<script setup lang="ts">
  import {
    computed,
    defineAsyncComponent,
    ref,
    shallowRef,
    watch,
    Ref
  } from 'vue'
  import { IProps } from './module'

  const props = withDefaults(defineProps<IProps>(), {
    width: 20,
    height: 20,
    size: 0
  })

  const svg = shallowRef('')

  /**
   * Выбор ширины
   */
  const svgWidth = computed(() => (props.size ? props.size : props.width))

  /**
   * Выбор высоты
   */
  const svgHeight = computed(() => (props.size ? props.size : props.height))

  type ViewBoxType = string | null

  const viewBox: Ref<ViewBoxType> = ref(
    `0 0 ${svgWidth.value} ${svgHeight.value}`
  )

  /**
   * Загрузка иконки
   */
  async function loadIcon() {
    try {
      const path = `/src/assets/icons/${props.name}.svg`
      svg.value = defineAsyncComponent(() => import(/* @vite-ignore */ path))
      viewBox.value = await getViewBox(path)
    } catch (err) {
      console.error('Ошибка при обновлении SVG', err)
    }
  }

  const getViewBox = async (filePath: string): Promise<ViewBoxType> => {
    const response = await fetch(filePath)
    const svgText = await response.text()
    const parser = new DOMParser()
    const svgDocument = parser.parseFromString(svgText, 'image/svg+xml')
    return (
      svgDocument.querySelector('svg')?.getAttribute('viewBox') || viewBox.value
    )
  }

  watch(
    () => props.name,
    () => {
      loadIcon()
    }
  )

  loadIcon()
</script>

<template>
  <component
    :is="svg"
    v-if="svg"
    :width="svgWidth"
    :height="svgHeight"
    :viewBox="viewBox"
    class="app-svg-icon"
  />
</template>

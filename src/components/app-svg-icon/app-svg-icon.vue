<script setup lang="ts">
  import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue'
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
  const iconInstance = shallowRef('')

  /**
   * Выбор высоты
   */
  const svgHeight = computed(() => (props.size ? props.size : props.height))

  const viewBox = ref(`0 0 ${svgWidth.value} ${svgHeight.value}`)

  function loadIcon() {
    iconInstance.value = defineAsyncComponent(() =>
      import(`../../assets/icons/${props.name}.svg`).then((module) => {
        const { width, height } = module.default.render().props
        viewBox.value = `0 0 ${width} ${height}`
        return module
      })
    )
  }

  watch(
    () => props.name,
    () => {
      loadIcon()
    },
    { immediate: true }
  )
</script>

<template>
  <component
    :is="iconInstance"
    v-if="iconInstance"
    :width="svgWidth"
    :height="svgHeight"
    :viewBox="viewBox"
  />
</template>

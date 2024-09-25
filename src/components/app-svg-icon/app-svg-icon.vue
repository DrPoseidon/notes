<script setup lang="ts">
  import {
    defineAsyncComponent,
    type Component,
    watch,
    shallowReactive,
    AsyncComponentLoader
  } from 'vue'

  // TODO: нужно разобраться с типизацией по названиям иконок
  const iconFiles: Record<string, AsyncComponentLoader> = import.meta.glob(
    '../../assets/icons/*.svg'
  )

  const props = withDefaults(
    defineProps<{
      name: string
      size?: number
    }>(),
    {
      size: 24
    }
  )

  const getIconComponent = (path: string) =>
    defineAsyncComponent(() => iconFiles[path]())

  const icons: Record<string, Component> = shallowReactive({})

  // Преобразуем пути файлов в компоненты и добавим их в объект icons
  Object.keys(iconFiles).forEach((filePath) => {
    const iconName = filePath.split('/').pop()?.replace('.svg', '')
    if (iconName) {
      icons[iconName] = getIconComponent(filePath)
    }
  })

  watch(
    () => props.name,
    (value) => {
      if (!icons[value]) {
        console.warn(`[WARN]: Нет иконки с именем ${props.name}`)
      }
    },
    {
      immediate: true
    }
  )
</script>

<template>
  <component
    :is="icons[name]"
    v-if="icons[name]"
    :width="size"
    :height="size"
    class="app-svg-icon"
  />
</template>

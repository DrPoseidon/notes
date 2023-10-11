<script setup lang="ts">
  import AppCheckbox from '@/components/app-checkbox'
  import AppSvgIcon from '@/components/app-svg-icon'
  import PlusSquareIcon from '@/assets/icons/plus-square.svg'

  withDefaults(
    defineProps<{
      tasks: Array<{ id: PropertyKey; name: string; done: boolean }>
    }>(),
    {
      tasks: () => []
    }
  )

  const emit = defineEmits<{
    (e: 'add-task'): void
    (e: 'change-task', id: PropertyKey, value: boolean): void
  }>()

  function addTask() {
    emit('add-task')
  }

  function onChange(id: PropertyKey, value: boolean) {
    emit('change-task', id, value)
  }
</script>

<template>
  <div class="app-tasks">
    <a href="" class="app-tasks__add" @click.prevent="addTask">
      <app-svg-icon :icon="PlusSquareIcon" />
    </a>

    <div class="app-tasks__checkboxes">
      <app-checkbox
        v-for="task in tasks"
        :key="task.id"
        :value="{ id: task.id, label: task.name, checked: task.done }"
        @change="onChange"
      />
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

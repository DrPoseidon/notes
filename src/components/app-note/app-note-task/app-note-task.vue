<script setup lang="ts">
  import AppTextarea from '@/components/app-textarea'
  import AppPopup from '@/components/app-popup'
  import { computed, ref } from 'vue'
  import { useNoteStore } from '@/stores/useNoteStore'
  import AppSvgIcon from '@/components/app-svg-icon/app-svg-icon.vue'
  const noteStore = useNoteStore()

  const isShowPopup = computed(() => noteStore.isShowAddPopup)
  const task = ref('')

  function addTask() {
    noteStore.addTask(task.value)
    task.value = ''
  }
</script>

<template>
  <app-popup
    :is-show="isShowPopup"
    title="Добавление задачи"
    @close-popup="noteStore.toggleAddPopup"
  >
    <template #body>
      <app-textarea
        v-model="task"
        :max-length="30"
        class="app-note-task__input"
      />
    </template>

    <template #footer>
      <button
        class="app-note-task__button"
        :class="{ 'app-note-task__button_disabled': !task }"
        @click="addTask"
      >
        <app-svg-icon name="plus" />
        <span> Добавить </span>
      </button>
    </template>
  </app-popup>
</template>

<style>
  @import './style.css';
</style>

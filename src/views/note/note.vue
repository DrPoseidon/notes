<script setup lang="ts">
  import AppNoteTextField from '@/components/app-note/app-note-text-field'
  import AppTasks from '@/components/app-tasks'
  import AppSvgIcon from '@/components/app-svg-icon'
  import { computed, nextTick, ref, Ref, watch } from 'vue'
  import { useNoteStore } from '@/stores/useNoteStore'
  import { INote } from '@/modules'

  const noteStore = useNoteStore()
  const currentNote: Ref<INote | undefined> = ref(undefined)

  watch(
    () => noteStore.selectedNote,
    (value) => {
      currentNote.value = undefined

      nextTick(() => {
        currentNote.value = value
      })
    }
  )

  const titleValue = computed({
    get: () => currentNote.value?.title || '',
    set(value) {
      if (currentNote.value) {
        noteStore.updateTitle(currentNote.value?.id, value)
      }
    }
  })

  const textValue = computed({
    get: () => currentNote.value?.additionalText || '',
    set(value) {
      if (currentNote.value) {
        noteStore.updateAdditionalText(currentNote.value?.id, value)
      }
    }
  })

  function toggleAddPopup() {
    noteStore.toggleAddPopup()
  }

  function onTaskChange(id: PropertyKey, value: boolean) {
    noteStore.changeTask(id, value)
  }
</script>

<template>
  <div class="note">
    <div v-if="currentNote">
      <app-note-text-field
        v-model:text="titleValue"
        placeholder="Введите заголовок для заметки"
      />

      <app-tasks
        style="margin: 20px 0"
        :tasks="currentNote.tasks"
        @add-task="toggleAddPopup"
        @change-task="onTaskChange"
      />

      <app-note-text-field
        v-model:text="textValue"
        placeholder="Введите текст заметки"
        text-field="textarea"
      />
    </div>

    <div v-if="!currentNote" class="note__empty-text">
      <app-svg-icon name="meh" style="margin-right: 10px" />

      <span> Нет выбранной заметки </span>
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

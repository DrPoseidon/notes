<script setup lang="ts">
  import AppNote from '@/components/app-note'
  import { ref, Ref } from 'vue'
  import AppSidebar from '@/components/app-sidebar'
  import { INote } from '@/modules'

  import { useNoteStore } from '@/stores/useNoteStore'
  const { notes } = useNoteStore()

  const currentNote: Ref<INote | undefined> = ref(undefined)

  function selectNote(note: INote) {
    currentNote.value = note
  }
</script>

<template>
  <div class="home">
    <app-sidebar
      :notes="Object.values(notes)"
      style="width: 20%"
      @select-note="selectNote"
    />
    <app-note
      v-if="currentNote"
      :key="currentNote.id"
      v-model:title="currentNote.title"
      v-model:additional-text="currentNote.additionalText"
      :tasks="currentNote.tasks"
      style="width: 100%"
    />
  </div>
</template>

<style>
  @import './style.css';
</style>

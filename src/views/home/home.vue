<script setup lang="ts">
  import AppNote from '@/components/app-note'
  import { ref, Ref } from 'vue'
  import notesStub from './notes'
  import AppSidebar from '@/components/app-sidebar'
  import { Note } from '@/modules'

  const notes: Ref<Note[]> = ref(notesStub)
  const currentNote: Ref<Note | undefined> = ref(undefined)

  function selectNote(note: Note) {
    currentNote.value = note
  }
</script>

<template>
  <div class="home">
    <app-sidebar :notes="notes" style="width: 20%" @select-note="selectNote" />
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

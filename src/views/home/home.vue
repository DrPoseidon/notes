<script setup lang="ts">
    import AppNote from '@/components/app-note'
    import { ref } from 'vue'
    import notesStub from './notes.ts'
    import AppSidebar from '@/components/app-sidebar/app-sidebar.vue'

    const notes = ref(notesStub)
    const currentNote = ref(undefined)

    function selectNote(note) {
        currentNote.value = note
    }
</script>

<template>
    <div class="home">
        <app-sidebar :notes='notes' style='width: 20%' @select-note='selectNote'/>
        <app-note
          v-if='currentNote'
          :key='currentNote.id'
          v-model:title='currentNote.title'
          v-model:text='currentNote.text'
          :tasks='currentNote.tasks'
          style='width: 100%'
        />
    </div>
</template>

<style>
@import "./style.css";
</style>

<script setup lang="ts">
  import AppHeader from '@/components/app-header'
  import AppSidebar from '@/components/app-sidebar'

  import { useNoteStore } from '@/stores/useNoteStore'
  import { computed, CSSProperties, Ref } from 'vue'
  import AppNoteTask from '@/components/app-note/app-note-task/app-note-task.vue'
  const noteStore = useNoteStore()

  const style: Ref<CSSProperties> = computed(() => ({
    display: 'flex',
    'flex-direction': 'row',
    height: 'calc(100vh - 60px)'
  }))
</script>

<template>
  <app-note-task />

  <app-header ref="header" />

  <div :style="style">
    <app-sidebar
      :notes="Object.values(noteStore.notes)"
      @select-note="noteStore.selectNote"
    />

    <router-view />
  </div>
</template>

<style>
  * {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #fffeff;
  }

  a {
    color: black;
    text-decoration: none;
  }
</style>

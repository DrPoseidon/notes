<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import { useNoteStore } from '@/stores/useNoteStore'

  const noteStore = useNoteStore()
</script>

<template>
  <div class="app-header">
    <a @click.prevent="noteStore.createNote()">
      <app-svg-icon name="create" class="app-header__icon" />
    </a>

    <a @click.prevent="noteStore.deleteNote()">
      <app-svg-icon name="trash" class="app-header__icon" />
    </a>
  </div>
</template>

<style>
  @import './style.css';
</style>

<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import { useNoteStore } from '@/stores/useNoteStore'
  import CreateIcon from '@/assets/icons/create.svg'
  import TrashIcon from '@/assets/icons/trash.svg'

  const noteStore = useNoteStore()
</script>

<template>
  <div class="app-header">
    <a @click.prevent="noteStore.createNote()">
      <app-svg-icon :icon="CreateIcon" class="app-header__icon" />
    </a>

    <a @click.prevent="noteStore.deleteNote()">
      <app-svg-icon :icon="TrashIcon" class="app-header__icon" />
    </a>
  </div>
</template>

<style>
  @import './style.css';
</style>

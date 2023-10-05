<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import { useNoteStore } from '@/stores/useNoteStore'

  const { createNote } = useNoteStore()
</script>

<template>
  <div class="app-header">
    <a href="" @click.prevent="createNote">
      <app-svg-icon name="create" class="app-header__icon" />
    </a>
  </div>
</template>

<style>
  @import './style.css';
</style>

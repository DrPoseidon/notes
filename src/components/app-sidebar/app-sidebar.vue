<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import type { INote } from '@/types'
  import { useNoteStore } from '@/stores/useNoteStore'

  const noteStore = useNoteStore()

  const props = withDefaults(
    defineProps<{
      notes: INote[]
    }>(),
    {
      notes: () => []
    }
  )

  const emit = defineEmits<{
    (e: 'select-note', note: PropertyKey): void
  }>()

  const currentId = computed(() => noteStore.selectedNote?.id)

  function isShowHr(id: PropertyKey, index: number) {
    return (
      currentId.value !== id &&
      props.notes?.[index + 1] &&
      props.notes[index + 1].id !== currentId.value
    )
  }

  function getSubTitle(text: string) {
    return text || 'Нет дополнительного текста'
  }

  function getTitle(title: string) {
    return title || 'Новая заметка'
  }

  function selectNote(id: PropertyKey) {
    emit('select-note', id)
  }

  onMounted(() => {
    if (props.notes.length) {
      selectNote(props.notes[0].id)
    }
  })
</script>

<template>
  <div v-if="notes.length" class="app-sidebar">
    <div
      v-for="(note, index) in notes"
      :key="note.id"
      class="app-sidebar__element"
      :class="{ 'app-sidebar__element_active': currentId === note.id }"
      @click="selectNote(note.id)"
    >
      <span class="app-sidebar__element-title app-side-bar_clamp">
        {{ getTitle(note.title) }}
      </span>

      <span class="app-sidebar__element-text app-side-bar_clamp">{{
        getSubTitle(note.additionalText)
      }}</span>

      <hr v-if="isShowHr(note.id, index)" />
    </div>
  </div>

  <div v-if="!notes.length" class="app-sidebar">
    <div class="app-sidebar__empty-state">Создайте заметку</div>
  </div>
</template>

<style>
  @import './style.css';
</style>

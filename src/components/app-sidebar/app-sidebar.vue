<script setup lang="ts">
  import { onMounted, Ref, ref } from 'vue'
  import { INote } from '@/modules'

  const props = withDefaults(
    defineProps<{
      notes: INote[]
    }>(),
    {
      notes: () => []
    }
  )

  const emit = defineEmits<{
    (e: 'select-note', note: INote): void
  }>()

  const activeElement: Ref<undefined | PropertyKey> = ref(undefined)

  function isShowHr(id: PropertyKey, index: number) {
    return (
      activeElement.value !== id &&
      props.notes?.[index + 1] &&
      props.notes[index + 1].id !== activeElement.value
    )
  }

  function getSubTitle(text: string) {
    return text || 'Нет дополнительного текста'
  }

  function getTitle(title: string) {
    return title || 'Новая заметка'
  }

  function selectNote(id: PropertyKey) {
    activeElement.value = id
    const note = props.notes.find((note) => note.id === id)

    if (note) {
      emit('select-note', note)
    }
  }

  onMounted(() => {
    if (props.notes.length) {
      selectNote(props.notes[0].id)
    }
  })
</script>

<template>
  <div class="app-sidebar">
    <div
      v-for="(note, index) in notes"
      :key="note.id"
      class="app-sidebar__element"
      :class="{ 'app-sidebar__element_active': activeElement === note.id }"
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
</template>

<style>
  @import './style.css';
</style>

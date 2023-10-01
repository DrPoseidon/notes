<script setup lang='ts'>
  import { onMounted, Ref, ref } from 'vue'

  const props = withDefaults(defineProps<{
    notes: Array<{
      id: PropertyKey,
      title: string,
      text: string,
      tasks: Array<{done: boolean, name: string}>
    }>
  }>(), {
    notes: () => []
  })

  const emit = defineEmits<{
    (e: 'select-note', note): void
  }>()

  const activeElement: Ref<undefined | PropertyKey> = ref(undefined)

  function isShowHr(id, index) {
    return activeElement.value !== id && (props.notes?.[index +1] &&
      props.notes[index + 1].id !== activeElement.value);
  }

  function getSubTitle(text) {
    return text || 'Нет дополнительного текста'
  }

  function selectNote(id) {
    activeElement.value = id;
    emit('select-note', props.notes.find(note => note.id === id));
  }

  onMounted(() => {
    selectNote(props.notes[0].id)
  })
</script>

<template>
  <div class='app-sidebar'>
    <div
      @click='selectNote(note.id)'
      class='app-sidebar__element'
      :class='{ "app-sidebar__element_active": activeElement === note.id }'
      v-for='(note, index) in notes'
      :key='note.id'
    >
      <span class='app-sidebar__element-title app-side-bar_clamp'>
        {{ note.title }}
      </span>

      <span class='app-sidebar__element-text app-side-bar_clamp'>{{ getSubTitle(note.text) }}</span>

      <hr v-if='isShowHr(note.id, index)'>
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

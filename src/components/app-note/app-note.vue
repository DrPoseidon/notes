<script setup lang="ts">
  import { computed, nextTick, reactive, Ref, ref } from 'vue'
  import { IProps } from './module'
  import AppSvgIcon from '@/components/app-svg-icon/app-svg-icon.vue'
  const props = withDefaults(defineProps<IProps>(), {
    title: '',
    text: '',
    tasks: () => []
  })

  const emit = defineEmits<{
    (e: 'update:title', value: string): void,
    (e: 'update:text', value: string): void
  }>()

  enum Fields {
    title,
    text
  }

  const textarea: Ref<HTMLDivElement | null> = ref(null)

  const editing = reactive({
    title: false,
    text: false
  })

  function toggleEditing(value: Fields) {
    editing[Fields[value]] = !editing[Fields[value]]

    nextTick(() => {
      if (value === Fields.text) {
        adjustTextareaHeight()
      }
    })
  }

  function adjustTextareaHeight() {
    if (textarea.value) {
      textarea.value.style.height = 'auto';
      textarea.value.style.height = textarea.value.scrollHeight + 'px';
    }
  }

  const titleValue = computed({
    get: () => props.title,
    set(value) {
      emit('update:title', value)
    }
  })

  const textValue = computed({
    get: () => props.text,
    set(value) {
      emit('update:text', value)
    }
  })
</script>

<template>
  <div class="app-note">
    <div class='app-note__title'>
      <h2 v-if='!editing.title'>{{ titleValue }}</h2>

      <div v-if='editing.title'>
        <input class='app-note__input' type='text' v-model='titleValue'/>
      </div>

      <a href='' @click.prevent='toggleEditing(Fields.title)'>
        <app-svg-icon :name="!editing.title ? 'edit' : 'check'"/>
      </a>
    </div>

    <div class='app-note__text'>
      <a href='' @click.prevent='toggleEditing(Fields.text)'>
        <app-svg-icon :name="!editing.text ? 'edit' : 'check'"/>
      </a>

      <pre v-if='!editing.text'>{{ textValue }}</pre>

      <textarea
        class='app-note__textarea'
        ref='textarea'
        v-if='editing.text'
        v-model='textValue'
        @input="adjustTextareaHeight"
      />
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

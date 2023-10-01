<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { Note } from '@/modules'
  import AppSvgIcon from '@/components/app-svg-icon/app-svg-icon.vue'
  import AppTextarea from '@/components/app-input/app-textarea.vue'

  const props = withDefaults(defineProps<Note>(), {
    id: '',
    title: '',
    additionalText: '',
    tasks: () => []
  })

  const emit = defineEmits<{
    (e: 'update:title', value: string): void
    (e: 'update:additionalText', value: string): void
  }>()

  const editing = reactive({
    title: false,
    additionalText: false
  })

  const titleValue = computed({
    get: () => props.title,
    set(value) {
      emit('update:title', value)
    }
  })

  const textValue = computed({
    get: () => props.additionalText,
    set(value) {
      emit('update:additionalText', value)
    }
  })
</script>

<template>
  <div class="app-note">
    <div class="app-note__title">
      <pre v-if="!editing.title" class="app-note__title">{{ titleValue }}</pre>

      <app-textarea
        v-if="editing.title"
        v-model="titleValue"
        class="app-note__input"
      />

      <a href="" @click.prevent="editing.title = !editing.title">
        <app-svg-icon :name="!editing.title ? 'edit' : 'check'" />
      </a>
    </div>

    <div class="app-note__text">
      <a
        href=""
        @click.prevent="editing.additionalText = !editing.additionalText"
      >
        <app-svg-icon :name="!editing.additionalText ? 'edit' : 'check'" />
      </a>

      <pre v-if="!editing.additionalText">{{ textValue }}</pre>

      <app-textarea
        v-if="editing.additionalText"
        v-model="textValue"
        class="app-note__textarea"
      />
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

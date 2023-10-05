<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import AppTextarea from '@/components/app-textarea'

  import { computed, onMounted, reactive } from 'vue'
  import { INote } from '@/modules'

  const props = withDefaults(defineProps<INote>(), {
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

  onMounted(() => {
    if (!props.title) {
      editing.title = true
    }

    if (!props.additionalText) {
      editing.additionalText = true
    }
  })
</script>

<template>
  <div class="app-note">
    <div class="app-note__title">
      <a
        href=""
        class="app-note__switch"
        @click.prevent="editing.title = !editing.title"
      >
        <app-svg-icon :name="!editing.title ? 'edit' : 'check'" />
      </a>

      <pre v-if="!editing.title" class="app-note__title">{{ titleValue }}</pre>

      <app-textarea
        v-if="editing.title"
        v-model="titleValue"
        placeholder="Введите заголовок для заметка"
        class="app-note__input"
      />
    </div>

    <div class="app-note__text">
      <a
        href=""
        class="app-note__switch"
        @click.prevent="editing.additionalText = !editing.additionalText"
      >
        <app-svg-icon :name="!editing.additionalText ? 'edit' : 'check'" />
      </a>

      <pre v-if="!editing.additionalText">{{ textValue }}</pre>

      <app-textarea
        v-if="editing.additionalText"
        v-model="textValue"
        placeholder="Введите текст заметки"
        class="app-note__textarea"
      />
    </div>
  </div>
</template>

<style>
  @import './style.css';
</style>

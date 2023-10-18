<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import AppTextarea from '@/components/app-textarea'
  import { computed, onMounted, ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      text?: string
      placeholder?: string
      textField?: 'input' | 'textarea'
    }>(),
    {
      text: '',
      placeholder: '',
      textField: 'input'
    }
  )

  const emit = defineEmits<{
    (e: 'update:text', value: string): void
  }>()

  const isEditing = ref(true)

  const textValue = computed({
    get: () => props.text,
    set(value) {
      emit('update:text', value)
    }
  })

  const textFieldClass = computed(() =>
    props.textField === 'input'
      ? 'app-note-text-field__input'
      : 'app-note-text-field__textarea'
  )

  function toggleEditing() {
    isEditing.value = !isEditing.value
  }

  function onBlur() {
    if (isEditing.value && textValue.value) {
      isEditing.value = false
    }
  }

  onMounted(() => {
    isEditing.value = !props.text
  })
</script>

<template>
  <div
    class="app-note-text-field"
    :class="{
      'app-note-text-field_title': textField === 'input',
      'app-note-text-field_text': textField === 'textarea'
    }"
  >
    <a
      href=""
      class="app-note-text-field__switch"
      @click.prevent="toggleEditing"
    >
      <app-svg-icon :name="!isEditing ? 'edit' : 'check'" />
    </a>

    <pre
      v-if="!isEditing"
      :class="{ 'app-note-text-field_title': textField === 'input' }"
    >
      {{ text }}
    </pre>

    <app-textarea
      v-if="isEditing"
      v-model="textValue"
      v-click-away="onBlur"
      :placeholder="placeholder"
      :class="textFieldClass"
      @blur="onBlur"
    />
  </div>
</template>

<style>
  @import './style.css';
</style>

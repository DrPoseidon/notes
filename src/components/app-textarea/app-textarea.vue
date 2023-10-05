<script setup lang="ts">
  import { computed, onMounted, Ref, ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue: string
      placeholder?: string
    }>(),
    {
      modelValue: '',
      placeholder: ''
    }
  )

  const textarea: Ref<HTMLDivElement | null> = ref(null)

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const textareaValue = computed({
    get: () => props.modelValue,
    set(value) {
      emit('update:modelValue', value)
    }
  })

  function adjustHeight() {
    if (textarea.value) {
      textarea.value.style.height = 'auto'
      textarea.value.style.height = `${textarea.value.scrollHeight}px`
    }
  }

  onMounted(() => {
    adjustHeight()
  })
</script>

<template>
  <textarea
    ref="textarea"
    v-model="textareaValue"
    rows="1"
    class="app-textarea"
    :placeholder="placeholder"
    @input="adjustHeight"
  />
</template>

<style>
  @import './style.css';
</style>

<script setup lang="ts">
  import { computed, onMounted, Ref, ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue: string
      placeholder?: string
      maxLength?: number | undefined
    }>(),
    {
      modelValue: '',
      placeholder: '',
      maxLength: undefined
    }
  )

  const textarea: Ref<HTMLDivElement | null> = ref(null)

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'blur'): void
  }>()

  const textareaValue = computed({
    get: () => props.modelValue,
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const textareaAttrs = computed(() => {
    const attrs: {
      placeholder: string
      rows: number | string
      maxLength?: number
    } = { placeholder: props.placeholder, rows: 1 }

    console.log(props.maxLength)

    if (typeof props.maxLength === 'number') {
      attrs.maxLength = props.maxLength
    }

    return attrs
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
    v-bind="textareaAttrs"
    @input="adjustHeight"
    @blur="emit('blur')"
  />
</template>

<style>
  @import './style.css';
</style>

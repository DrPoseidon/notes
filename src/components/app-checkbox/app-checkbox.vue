<script setup lang="ts">
  import AppSvgIcon from '@/components/app-svg-icon'
  import { computed } from 'vue'

  const props = defineProps<{
    value: { id: PropertyKey; label: string; checked: boolean }
  }>()

  const emit = defineEmits<{
    (e: 'change', id: PropertyKey, value: boolean): void
  }>()

  const checkboxValue = computed({
    get: () => props.value.checked,
    set() {
      emit('change', props.value.id, props.value.checked)
    }
  })
</script>

<template>
  <div>
    <input :id="String(value.id)" v-model="checkboxValue" type="checkbox" />
    <label :for="String(value.id)" class="app-checkbox">
      <span v-if="value.checked" class="app-checkbox_checked">
        <app-svg-icon name="check" :size="12" />
      </span>

      <span v-if="!value.checked" class="app-checkbox_unchecked" />

      {{ value.label }}
    </label>
  </div>
</template>

<style>
  @import './style.css';
</style>

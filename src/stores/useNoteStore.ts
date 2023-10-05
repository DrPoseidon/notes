import { defineStore } from 'pinia'
import { INote } from '@/modules'
import { Ref, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useNoteStore = defineStore('note', () => {
  const notes: Ref<{ [key: PropertyKey]: INote }> = ref({})

  function createNote() {
    const id = uuidv4()
    notes.value[id] = { id, title: '', additionalText: '', tasks: [] }
  }

  return { notes, createNote }
})

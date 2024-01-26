import { defineStore } from 'pinia'
import { INote } from '../types'
import { computed, Ref, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useNoteStore = defineStore('note', () => {
  const notes: Ref<{ [key: PropertyKey]: INote }> = ref({})
  const note: Ref<INote | undefined> = ref(undefined)
  const isShowAddPopup = ref(false)

  function createNote() {
    const id = uuidv4()
    notes.value[id] = { id, title: '', additionalText: '', tasks: [] }
    selectNote(id)
  }

  function deleteNote() {
    if (note.value) {
      delete notes.value[note.value?.id]
      note.value = undefined
    }
  }

  const selectedNote = computed(() => note.value)

  function selectNote(id: PropertyKey) {
    if (notes.value[id]) {
      note.value = notes.value[id]
    }
  }

  function updateTitle(id: PropertyKey, title: string) {
    notes.value[id].title = title
  }

  function updateAdditionalText(id: PropertyKey, additionalText: string) {
    notes.value[id].additionalText = additionalText
  }

  function toggleAddPopup() {
    isShowAddPopup.value = !isShowAddPopup.value
  }

  function addTask(name: string) {
    const id = uuidv4()
    note.value?.tasks.push({ id, name, done: false })
    isShowAddPopup.value = false
  }

  function changeTask(id: PropertyKey, value: boolean) {
    try {
      const index = note.value?.tasks.findIndex((task) => task.id === id)
      if (typeof index === 'number' && index !== -1 && note.value?.id) {
        notes.value[note.value?.id].tasks[index].done = !value
      }
    } catch (err) {
      console.error(err)
    }
    //
    // console.log(index)
    //
    // if (index && index !== -1) {
    //   console.log(note.value?.tasks[index].done)
    // }
  }

  return {
    notes,
    selectedNote,
    isShowAddPopup,
    changeTask,
    toggleAddPopup,
    createNote,
    deleteNote,
    selectNote,
    updateTitle,
    updateAdditionalText,
    addTask
  }
})

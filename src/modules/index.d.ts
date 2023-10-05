type Note = {
  id: PropertyKey
  title: string
  additionalText: string
  tasks: Array<{ name: string; done: boolean }>
}

interface INote {
  id: PropertyKey
  title: string
  additionalText: string
  tasks: Array<{ name: string; done: boolean }>
}

export { Note, INote }

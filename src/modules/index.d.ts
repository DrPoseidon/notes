interface INote {
  id: PropertyKey
  title: string
  additionalText: string
  tasks: Array<{ id: PropertyKey; name: string; done: boolean }>
}

export { Note, INote }

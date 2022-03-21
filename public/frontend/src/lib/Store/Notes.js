import { writable, derived } from 'svelte/store'

export const originalStore = writable([])
export const editedStore = writable([])
export const activeStore = writable({})
export const notesStore = derived([originalStore, editedStore], ([original, edited], set) => {
  const newArray = original.map(note => {
    const newNote = {...note}
    const found = edited.find(note => note.id === newNote.id)
    if(found) {
      newNote.isEdited = true
      newNote.title = found.title
      newNote.text = found.text
    } else newNote.isEdited = false

    return newNote
  })
  set(newArray.sort((noteA, noteB) => noteA.isEdited === noteB.isEdited ? 0 : noteA.isEdited ? -1 : 1))
})



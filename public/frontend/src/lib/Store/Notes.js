import { writable } from 'svelte/store'
import mockNotes from '../../mock.rest.api.call.js'
import Note from '../Classes/Note.js'



export const notesStore = writable(mockNotes)
export const activeStore = writable(new Note())

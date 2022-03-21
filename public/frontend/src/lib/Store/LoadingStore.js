import { writable } from 'svelte/store'

export const loadingStore = writable(false)
export const messageFromServerStore = writable('')
export const modalTitleStore = writable('')
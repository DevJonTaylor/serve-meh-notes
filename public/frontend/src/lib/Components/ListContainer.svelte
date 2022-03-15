<script>
import { activeStore, notesStore } from '../Store/Notes.js';
import Note from '../Classes/Note.js';
import { onDestroy } from 'svelte'

let note, notes

let unsubscribeActive = activeStore.subscribe(value => note = value)
let unsubscribeNotes = notesStore.subscribe(value => notes = value)

const noteById = id => {
  if(note.id === id) return
  const find = notes.find(activeNote => activeNote.id === id)
  const newNote = Note.toNote(find)
  activeStore.set(newNote)
}

onDestroy(unsubscribeActive)
onDestroy(unsubscribeNotes)
</script>

<div class="col-4 list-container">
  <div class="card">
    <ul class="list-group">
      {#if notes.length === 0}
        <li class="list-group-item">
          <span class="list-item-title">No Notes To List</span>
        </li>
      {:else}
        {#each notes as n}
          <li class="list-group-item" on:click={() => noteById(n.id)}>
            <span class="list-item-title">{n.title}</span>
            <i class="fas fa-trash-alt float-right text-danger delete-note"></i>
            <span class="list-item-date">{new Date(parseInt(n.date)).toLocaleString()}</span>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>
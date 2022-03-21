<script>
import { activeStore, notesStore, editedStore } from '../Store/Notes.js';
import { titleStore, textStore } from '../Store/NoteTaker.js'
import { onDestroy } from 'svelte'

let notes

const unsubscribeNotes = notesStore.subscribe(value => notes = value)

const noteById = id => {
  if($activeStore.id === id) return
  const find = notes.find(activeNote => activeNote.id === id)
  const oldNote = {...$activeStore}
  if(oldNote.isEdited) {
    oldNote.title = $titleStore
    oldNote.text = $textStore
    editedStore.set($editedStore.map(note => {
      if(note.id !== oldNote.id) return note
      return oldNote
    }))
  }
  activeStore.set(find)
}

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
        {#each notes as note}
          <li class="list-group-item" class:text-white={note.isEdited} class:bg-warning={note.isEdited} on:click={() => noteById(note.id)}>
            <h5 class="list-item-title">{note.title}</h5>
            <i class="fas fa-save fade float-right save-note" class:show={note.isEdited}></i>
            <i class="fas fa-trash-alt float-right text-danger delete-note"></i>
            <span class="list-item-date">Saved On: {note.updated}</span>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>


<style>
  .list-item-date {
      color: #bdbdbd;
  }

  .save-note {
      position: absolute;
      top: 10px;
      right: 15px;
  }

  .delete-note {
      position: absolute;
      top: 55px;
      right: 15px;
  }
</style>
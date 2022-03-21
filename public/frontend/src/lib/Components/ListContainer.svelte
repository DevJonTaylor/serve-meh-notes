<script>
  import { server } from '../../../package.json'
  import { activeStore, notesStore, editedStore, originalStore } from '../Store/Notes.js';
  import { titleStore, textStore } from '../Store/NoteTaker.js'
  import { onDestroy } from 'svelte'
  import { loadingStore } from '../Store/LoadingStore.js'

  let notes

  const unsubscribeNotes = notesStore.subscribe(value => notes = value)

  const noteById = (event, n) => {
    if(n.isEdited && event.target.classList.contains('save-note')) return
    if(event.target.classList.contains('delete-note')) return
    const id = n.id
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
    window.scrollTo(0,0)
    document.querySelector('.note-textarea').focus()
  }

  const deleteNote = id => {
    loadingStore.set(true)
    if(id === $activeStore.id) activeStore.set({})
    editedStore.set($editedStore.filter(note => id !== note.id))
    fetch(`${server}${id}`,{
      method:'delete'
    })
      .then(resp => resp.json())
      .then(notes => originalStore.set(notes))
      .then(() => loadingStore.set(false))

  }

  const saveNote = (note) => {
    if(!note.isEdited) return
    editedStore.set($editedStore.filter(n => n.id !== note.id))
    loadingStore.set(true)
    if(note.id === $activeStore.id) {
      note.title = $titleStore
      note.text = $textStore
    }
    fetch(`http://localhost:3001/api/notes/${note.id}`, {
      method: 'put',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        originalStore.set(json)
        if(note.id === $activeStore.id) activeStore.set({})
        loadingStore.set(false)
      })
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
          <li class="list-group-item" class:text-white={note.isEdited} class:bg-warning={note.isEdited} on:click={event => noteById(event, note)}>
            <h5 class="list-item-title">{note.title}</h5>
            <i class="fas fa-save fade float-right save-note" class:show={note.isEdited} on:click|preventDefault={() => saveNote(note)}></i>
            <i class="fas fa-trash-alt float-right text-danger delete-note" on:click|preventDefault={() => deleteNote(note.id)}></i>
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

  .list-container .card {
      height: calc(100vh - 70px);
      border-bottom: none;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
  }

  .list-container {
      padding-left: 0;
  }

  .list-container .list-group,
  .list-container .list-group-item:first-child,
  .list-container .card {
      border-top: none;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
  }

  .list-item-title {
      display: inline-block;
      width: 100%;
  }

  .list-container i {
      font-size: 1.1rem;
      cursor: pointer;
  }

  .list-container .list-group-item {
      border-left: none;
      border-right: none;
      padding: 20px;
      cursor: pointer;
  }
</style>
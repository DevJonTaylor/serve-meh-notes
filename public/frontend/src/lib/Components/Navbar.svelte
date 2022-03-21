<script>
  import { server } from '../../../package.json'
  import { activeStore, originalStore, editedStore } from '../Store/Notes.js'
  import { titleStore, textStore } from '../Store/NoteTaker.js'
  import { loadingStore } from '../Store/LoadingStore.js'

  const icon = i => `fas fa-${i} text-light fade show`
  let disableRevert = true
  let disableSave = true
  let disableNew = true
  let note = $activeStore
  let title = $titleStore
  let text = $textStore

  const runBooleanChecks = () => {
    if(!note.id) {
      disableRevert = true
      disableSave = !title || !text
      disableNew = !title && !text
    } else {
      disableSave = disableRevert = !note.isEdited
      disableNew = false
    }
  }

  const getOriginalById = () => $originalStore.find(n => n.id === note.id)
  const removeEdited = () => editedStore.set($editedStore.filter(n => n.id !== note.id))
  const addEdited = () => editedStore.set([...$editedStore, note])

  const checkForTitle = () => {
    if(!note.id) return
    const original = getOriginalById()
    if(note.isEdited) {
      if(title === original.title) {
        removeEdited()
        note.isEdited = false
      }
    } else {
      if(title !== original.title) {
        addEdited()
        note.isEdited = true
      }
    }
  }

  const checkForText = () => {
    if(!note.id) return
    const original = getOriginalById()
    if(note.isEdited) {
      if(title === original.title && text === original.text) {
        removeEdited()
        note.isEdited = false
      }
    } else {
      if(text !== original.text) {
        addEdited()
        note.isEdited = true
      }
    }
  }

  activeStore.subscribe(v => {
    note = v;
    runBooleanChecks();
  })

  titleStore.subscribe(v => {
    title = v;
    checkForTitle()
    runBooleanChecks();
  })

  textStore.subscribe(v => {
    text = v;
    checkForText()
    runBooleanChecks();
  })

  const newNote = () => {
    if(note.id && note.isEdited) {
      note.title = title
      note.text = text
      editedStore.set($editedStore.map(n => n.id === note.id ? note : n))
    }
    activeStore.set({})
  }

  const revert = () => {
    if(disableRevert) return

    removeEdited()
    activeStore.set($originalStore.find(n => n.id === note.id))
  }

  const createNote = () => {
    fetch(server, {
      method: 'post',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        originalStore.set(json)
        newNote()
      })
  }

  const updateNote = () => {
    fetch(`${server}${note.id}`, {
      method: 'put',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        removeEdited()
        originalStore.set(json)
        newNote()
        loadingStore.set(false)
      })
  }

  const saveNote = () => {
    if(disableSave) return

    note.title = title
    note.text = text
    if(!note.id) createNote()
    else updateNote()
  }

</script>

<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Note Taker</a>
  <div class="icons">
    <i class={icon('redo')} class:btn-disabled={ disableRevert } on:click={ revert }></i>
    <i class={icon('save')} class:btn-disabled={ disableSave } on:click={ saveNote }></i>
    <i class={icon('plus')} class:btn-disabled={ disableNew } on:click={ newNote }></i>
  </div>
</nav>

<style>
    .icons i {
        margin-left: 15px;
        margin-right: 15px;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .btn-disabled {
        opacity: .3;
        cursor: not-allowed !important;
    }
</style>
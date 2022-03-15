<script>
import { activeStore } from '../Store/Notes.js'
import { titleStore, textStore } from '../Store/NoteTaker.js'
import Note from '../Classes/Note.js'

const icon = i => `fas fa-${i} text-light fade show`
let disableRevert = true
let disableSave = true
let disableNew = true
let note = $activeStore
let title = $titleStore
let text = $textStore

const runBooleanChecks = (note, title, text) => {
  const titleEqual = note.title === title
  const textEqual = note.text === text
  const noChanges = titleEqual && textEqual
  const isEmpty = !title && !text
  const isId = note.id !== ''
  disableRevert = !isId || noChanges
  disableSave = isEmpty || noChanges
  disableNew = !isId && isEmpty
}
activeStore.subscribe(v => {
  note = v;
  runBooleanChecks(note, title, text);
})

titleStore.subscribe(v => {
  title = v;
  runBooleanChecks(note, title, text);
})

textStore.subscribe(v => {
  text = v;
  runBooleanChecks(note, title, text);
})

const startOver = () => {
  activeStore.set(new Note())
}

</script>

<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Note Taker</a>
  <div class="icons">
    <i class={icon('redo')} class:btn-disabled={ disableRevert }></i>
    <i class={icon('save')} class:btn-disabled={ disableSave }></i>
    <i class={icon('plus')} class:btn-disabled={ disableNew } on:click={ startOver }></i>
  </div>
</nav>
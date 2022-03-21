<script>
  import { titleStore, textStore } from '../Store/NoteTaker.js'
  import { activeStore } from '../Store/Notes.js'
  import { onDestroy } from 'svelte'

  let unsubscribeActive = activeStore.subscribe(note => {
    titleStore.set(note.title)
    textStore.set(note.text)
  })

  onDestroy(unsubscribeActive)
</script>

<div class="col-8">
  <input bind:value={$titleStore} class="note-title" placeholder="Note Title" maxlength="28" type="text" />
  <textarea bind:value={$textStore} class="note-textarea" placeholder="Note noteText"></textarea>
</div>

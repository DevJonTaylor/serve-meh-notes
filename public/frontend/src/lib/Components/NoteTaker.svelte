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

<style>
    .note-textarea,
    .note-title {
        color: #000000;
        width: 100%;
        outline: none;
        border: none;
    }

    .note-textarea {
        resize: none;
        height: calc(100% - 63px);
        padding-top: 15px;
    }

    .note-title {
        height: 50px;
        margin-top: 13px;
        font-size: 3rem;
    }

    .note-title:read-only,
    .note-textarea:read-only {
        color: #757575;
    }
</style>

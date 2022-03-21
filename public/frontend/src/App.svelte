<script>
  import { onMount } from 'svelte'
  import { originalStore } from './lib/Store/Notes.js'
  import Navbar from './lib/Components/Navbar.svelte'
  import NoteTaker from './lib/Components/NoteTaker.svelte'
  import ListContainer from './lib/Components/ListContainer.svelte'
  import LoadingModal from './lib/Components/LoadingModal.svelte'

  onMount(() => {
    fetch('http://localhost:3001/api/notes')
      .then(resp => resp.json())
      .then(notes => originalStore.set(notes))
  })



</script>

<Navbar />
<main class="container-fluid">
  <div class="row">
    <ListContainer />
    <NoteTaker />
  </div>
</main>
<LoadingModal />
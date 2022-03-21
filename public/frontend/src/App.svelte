<script>
  import { server } from '../package.json'
  import { onMount } from 'svelte'
  import { originalStore } from './lib/Store/Notes.js'
  import { loadingStore } from './lib/Store/LoadingStore.js'
  import Navbar from './lib/Components/Navbar.svelte'
  import NoteTaker from './lib/Components/NoteTaker.svelte'
  import ListContainer from './lib/Components/ListContainer.svelte'
  import LoadingModal from './lib/Components/LoadingModal.svelte'

  onMount(() => {
    loadingStore.set(true)
    fetch(server)
      .then(resp => resp.json())
      .then(notes => originalStore.set(notes))
      .then(() => loadingStore.set(false))
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

<style>

</style>
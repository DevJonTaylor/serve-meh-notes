<script>
  import { onMount } from 'svelte'
  import { originalStore } from './lib/Store/Notes.js'
  import Navbar from './lib/Components/Navbar.svelte'
  import NoteTaker from './lib/Components/NoteTaker.svelte'
  import ListContainer from './lib/Components/ListContainer.svelte'

  onMount(() => {
    fetch('http://localhost:3001/api/notes')
      .then(resp => resp.json())
      .then(json => originalStore.set(json))
  })
</script>

<Navbar />
<main class="container-fluid">
  <div class="row">
    <ListContainer />
    <NoteTaker />
  </div>
</main>
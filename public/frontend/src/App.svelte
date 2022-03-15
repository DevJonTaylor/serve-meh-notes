<script>
  import Navbar from './lib/Components/Navbar.svelte'
  import NoteTaker from './lib/Components/NoteTaker.svelte'
  import ListContainer from './lib/Components/ListContainer.svelte'

</script>

<Navbar />
<main class="container-fluid">
  <div class="row">
    <ListContainer />
    <NoteTaker />
  </div>
</main>
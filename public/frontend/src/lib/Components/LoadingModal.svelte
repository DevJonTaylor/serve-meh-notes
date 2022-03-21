<script>
  import { onDestroy } from 'svelte'
  import { loadingStore } from '../Store/LoadingStore.js'
  import { Diamonds } from 'svelte-loading-spinners'

  function showModal() {
    jQuery('#loading').modal({ backdrop: false, keyboard: false })
  }

  function hideModal() {
    jQuery('#loading').modal('hide')
  }

  const unsubscribe = loadingStore.subscribe(isLoading => {
    if(isLoading) showModal()
    else hideModal()
  })

  onDestroy(unsubscribe)
</script>


{#if $loadingStore}
  <div class="modal fade show" id="loading" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">TALKING WITH SERVER</h5>
        </div>
        <div class="modal-body">
          <Diamonds size="100" color="#18BC9C" />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-body {
      display: flex;
      justify-content: center;
      align-content: center;
  }
</style>
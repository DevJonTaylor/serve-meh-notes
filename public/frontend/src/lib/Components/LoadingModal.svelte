<script>
  import { loadingStore } from '../Store/LoadingStore.js'
  import { Diamonds } from 'svelte-loading-spinners'

  loadingStore.subscribe(isLoading => {
    const modal = jQuery('#loading').modal({ backdrop: 'static', keyboard: false })
    if(isLoading) modal.modal('show')
    else modal.modal('hide')
  })
</script>

<div class="modal fade" id="loading" tabindex="-1">
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

<style>
  .modal-body {
      display: flex;
      justify-content: center;
      align-content: center;
  }
</style>
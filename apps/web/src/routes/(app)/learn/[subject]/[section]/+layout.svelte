<script lang="ts">
  import type { LayoutData } from '../$types'

  export let data: LayoutData
</script>

<div class="dev px-4">
  <p>breadcrumbs</p>
</div>

<aside class="h-full">
  <ul class="dev">
    <!-- TODO: -->
  </ul>
</aside>
<section class="dev min-h-full flex">
  <slot />
</section>

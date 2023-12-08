<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<main class="flex flex-col items-center min-h-screen">
  <section class="m-8">
    <a href="/" class="block">
      <img src="/logo.png" alt="Logo" class="h-16 w-16 md:h-20 md:w-20" />
    </a>
  </section>
  <slot />
</main>

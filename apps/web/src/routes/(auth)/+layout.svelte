<script lang="ts">
  import { fade } from 'svelte/transition'
</script>

<main class="flex items-center justify-between flex-col pt-8 min-h-screen pb-4">
  <a href="/" class="block p-4">
    <img src="/logo_white.svg" alt="Logo" class="h-20 md:h-24" />
  </a>

  <section class="container max-w-sm md:max-w-md" transition:fade>
    <slot />
  </section>

  <footer class="flex gap-x-2 text-sm">
    <a href="/privacy-polcy"> Политика за поверителност </a>
    <span>|</span>
    <a href="/terms"> Условия за ползване</a>
  </footer>
</main>

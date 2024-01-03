<script lang="ts">
  import { fade } from 'svelte/transition'
</script>

<main class="flex items-center justify-between flex-col pt-8 min-h-screen">
  <a href="/" class="block p-4">
    <img src="/jb/Jet-Black.svg" alt="Logo" class="h-20 md:h-24 invert" />
  </a>

  <section class="container min-h-full md:max-w-sm max-w-xs" transition:fade>
    <slot />
  </section>

  <footer class="flex items-center justify-center gap-x-2 text-sm mb-4">
    <a href="/privacy-polcy"> Политика за поверителност </a>
    <span>|</span>
    <a href="/terms"> Условия за ползване</a>
  </footer>
</main>

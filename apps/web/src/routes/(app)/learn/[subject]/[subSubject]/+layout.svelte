<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
  const { chapters, subSubject, subject } = data
</script>

<section class="h-full flex">
  <aside class="h-full">
    <ul class="h-full dev w-40 py-8">
      {#each chapters as chapter, i}
        <li class="dev">
          {#each chapter.lessons as item}
            <!-- content here -->
          {/each}
          <a href={`/learn/${subject}/${subSubject}/${chapter.label}/`}>
            {chapter.label}
          </a>
        </li>
        <!-- content here -->
      {/each}
    </ul>
  </aside>
  <slot />
</section>

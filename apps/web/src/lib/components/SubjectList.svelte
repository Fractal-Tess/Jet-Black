<script lang="ts">
  import type { Subject } from '$lib/directus'

  export let subjects: Subject[]
</script>

<ul class="p-8 flex flex-col mx-auto">
  {#each subjects.sort( (s1, s2) => s1.label.localeCompare(s2.label) ) as subject, i}
    <li
      class="first:rounded-t-md last:rounded-b-md variant-outline-primary font-bold inline-flex"
    >
      <a
        href={`/learn/${encodeURI(subject.label)}`}
        class="inline-flex px-8 items-center gap-x-3.5 py-4 -mt-px w-full"
      >
        <div
          class="h-4 w-4 overflow-hidden fill-black dark:fill-white [&>svg]:h-full [&>svg]:w-full"
        >
          {@html subject.svg_icon}
        </div>
        <h3>
          {subject.label}
        </h3>
      </a>
    </li>
  {/each}
</ul>

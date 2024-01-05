<script lang="ts">
  import type { Subject } from '$lib/directus'

  export let subjects: Subject[]
</script>

<ul class=" p-8 flex flex-col mx-auto">
  {#each subjects.sort( (s1, s2) => s1.label.localeCompare(s2.label) ) as subject, i}
    <li
      class="inline-flex items-center gap-x-3.5 py-3 px-4 -mt-px text-sm font-medium border variant-outline first:rounded-t-lg first:mt-0 last:rounded-b-lg"
    >
      <a href={`/learn/${encodeURI(subject.label)}`} class="contents">
        <div
          class="h-6 w-6 overflow-hidden fill-black dark:fill-white [&>svg]:h-full [&>svg]:w-full ]"
        >
          {@html subject.icon}
        </div>
        <h3>
          {subject.label}
        </h3>
      </a>
    </li>
  {/each}
</ul>

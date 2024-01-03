<script lang="ts">
  import type { PageData } from './$types'
  import SubjectNav from '$lib/components/SubjectNav.svelte'

  export let data: PageData
</script>

<section class="flex items-center justify-center h-full container mx-auto">
  <span class="italic">TODO: Redesign this page</span>
  <SubjectNav subjects={data.subjects} />
</section>

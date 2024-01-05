<script lang="ts">
  import type { PageData } from './$types'
  import SubjectList from '$lib/components/SubjectList.svelte'

  export let data: PageData
</script>

<section class="flex items-center justify-center h-full container mx-auto">
  <span class="italic">TODO: Redesign this page</span>
  <SubjectList subjects={data.subjects} />
</section>

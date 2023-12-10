<script lang="ts">
  import { Avatar, Tab, TabGroup } from '@skeletonlabs/skeleton'
  import type { PageData } from './$types'
  import {
    faCalendar,
    faCalendarCheck,
    faCalendarDay,
    faCalendarDays,
    faChartColumn,
    faFlask,
    faQuestion,
    faScroll
  } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let data: PageData
  console.log(data)
  let tabSet: number = 0
</script>

<section class="h-full flex flex-col p-8">
  <h1 class="h1 variant-glass btn select-none pointer-events-none">Табло</h1>
  <div class="flex items-center justify-center w-max gap-x-2">
    <Fa icon={faChartColumn} size="0.8x" />
    <p class="font-bold text-lg">Вашето съдържание</p>
  </div>
  <div class="flex-1"></div>
  <TabGroup justify={'items-center'} class="flex-1" flex={'flex-row'}>
    <div class="mr-4">
      <Fa icon={faCalendarDays} size="0.8x" />
    </div>
    <Tab bind:group={tabSet} name="tab1" value={0} active={'variant-filled'}>
      <span>7 Дни</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab2" value={1} active={'variant-filled'}
      >30 Дни</Tab
    >
    <Tab bind:group={tabSet} name="tab3" value={2} active={'variant-filled'}
      >Всички</Tab
    >
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      <div class="flex flex-col md:flex-row gap-20">
        {#if tabSet === 0}
          <div class="rounded-md p-8 variant-filled flex gap-8">
            <div class="">
              <p class="font-bold text-2xl italic">Уроци</p>
              <span class="font-extrabold text-4xl">1</span>
            </div>
            <Fa icon={faScroll} size="4x" />
          </div>

          <div class="rounded-md p-8 variant-filled flex gap-4">
            <div class="">
              <p class="font-bold text-2xl italic">Тестове</p>
              <span class="font-extrabold text-4xl">4</span>
            </div>
            <Fa icon={faFlask} size="4x" />
          </div>

          <div class="rounded-md p-6 variant-filled flex gap-4">
            <div class="flex flex-col gap-4">
              <p class="font-bold text-2xl italic">Упражнения</p>
              <span class="font-extrabold text-4xl">4</span>
            </div>
            <Fa icon={faQuestion} size="4x" />
          </div>
        {:else if tabSet === 1}
          (tab panel 2 contents)
        {:else if tabSet === 2}
          (tab panel 3 contents)
        {/if}
      </div>
    </svelte:fragment>
  </TabGroup>
</section>

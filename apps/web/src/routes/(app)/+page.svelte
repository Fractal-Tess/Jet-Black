<script lang="ts">
  import type { createDrawerStore } from '$lib/stores'
  import anime from 'animejs'
  import { getContext, onMount } from 'svelte'
  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  let animationHidden = true
  let animator: HTMLDivElement
  let mounted = false
  onMount(() => {
    mounted = true
    const bigDarkRectangle = anime
      .timeline({
        targets: '.hero-figure-box-05',
        autoplay: false,
        begin: () => {
          smallDarkRectangles.play()
          colouredRectangles.play()
        }
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: [0.05, 0.05],
        scaleY: [0, 1],
        perspective: '500px'
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: 1
      })
      .add({
        duration: 800,
        rotateY: '-15deg',
        rotateX: '8deg',
        rotateZ: '-1deg'
      })

    const smallDarkRectangles = anime
      .timeline({
        targets: '.hero-figure-box-06, .hero-figure-box-07',
        autoplay: false
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: [0.05, 0.05],
        scaleY: [0, 1],
        perspective: '500px'
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: 1
      })
      .add({
        duration: 800,
        rotateZ: '20deg'
      })

    const colouredRectangles = anime
      .timeline({
        targets:
          '.hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10',
        autoplay: false
      })
      .add({
        duration: anime.random(600, 800),
        delay: anime.random(600, 800),
        rotate: [
          anime.random(-360, 360),
          (e: HTMLElement) => {
            return e.getAttribute('data-rotation')
          }
        ],
        scale: [0.7, 1],
        opacity: [0, 1],
        easing: 'easeInOutExpo'
      })

    function init() {
      animator.classList.add('anime-ready')
      animationHidden = false
      setTimeout(function () {
        bigDarkRectangle.play()
      }, 500)
    }

    init()
  })
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
<section
  class="flex h-full items-center justify-center mx-auto container max-lg:justify-end max-lg:flex-col-reverse max-lg:-order-last select-none"
>
  <div
    class={`max-w-md transition-all max-lg:pt-6 max-lg:mb-6 flex flex-col gap-y-8 duration-700 items-center ${
      mounted ? 'opacity-100' : 'opacity-0'
    }
    ${$drawerStore ? 'max-2xl:opacity-0' : 'delay-500'}
    `}
  >
    <h1 class="h1 mt-0 max-lg:text-center font-extrabold">Jet-Black</h1>
    <p class="opacity-75 max-sm:text-center">
      <b>Jet-Black</b>
      е нова иновативна платформа предлагаща набор от специализирани уроци упражнения
      и тестове фокусиращи се върху материала изучаван от студентите в началните
      курсове в
      <b> TU-Sofia</b>.
    </p>
    <div class="flex max-lg:justify-center space-x-4 d">
      <a
        on:dragstart|preventDefault
        href="/learn"
        class="btn max-md:btn-sm variant-outline-primary"
        >Започни
      </a>
      <a
        on:dragstart|preventDefault
        href="/about"
        class="btn max-md:btn-sm variant-filled-secondary"
        >Научи повече
      </a>
    </div>
  </div>
  <div
    bind:this={animator}
    class={`hero-figure my-auto ${
      mounted
        ? 'after:opacity-100 before:opacity-100'
        : 'after:opacity-0 before:opacity-0'
    }
    `}
    class:opacity-0={animationHidden}
  >
    <div class="absolute z-10 inset-0 flex items-center justify-center">
      <img
        src="/jb/Jet-Black.svg"
        alt="logo"
        class={`invert !delay-[2000ms] transition-all duration-1000 ${
          mounted
            ? 'opacity-100 w-20 drop-shadow-[0_0_0.75rem_rgba(var(--color-primary-500))]'
            : 'opacity-0 w-0'
        }`}
      />
    </div>
    <svg class="" width="528" height="396" viewBox="0 0 528 396">
      <rect width="528" height="396" class="opacity-0" />
    </svg>
    <div class="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
    <div
      class="hero-figure-box hero-figure-box-02"
      data-rotation="-45deg"
    ></div>
    <div class="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
    <div
      class="hero-figure-box hero-figure-box-04"
      data-rotation="-135deg"
    ></div>
    <div class="hero-figure-box hero-figure-box-05"></div>
    <div class="hero-figure-box hero-figure-box-06"></div>
    <div class="hero-figure-box hero-figure-box-07"></div>
    <div
      class="hero-figure-box hero-figure-box-08"
      data-rotation="-22deg"
    ></div>
    <div
      class="hero-figure-box hero-figure-box-09"
      data-rotation="-52deg"
    ></div>
    <div
      class="hero-figure-box hero-figure-box-10"
      data-rotation="-50deg"
    ></div>
  </div>
</section>

<style lang="postcss">
  .hero-figure {
    @apply relative;
  }
  .hero-figure::after,
  .hero-figure::before {
    @apply absolute duration-[2000ms] transition-all bg-no-repeat;
  }
  .hero-figure::after {
    @apply -top-[35%] left-full w-1/2 h-[90%];
    background-image: url('/images/hero-top-illustration.svg');
  }
  .hero-figure::before {
    @apply -top-1/2 w-[150%] h-[175%];
    background-image: url('/images/hero-back-illustration.svg');
  }
  .hero-figure-box {
    @apply absolute top-0 will-change-transform;
  }
  .hero-figure-box-01,
  .hero-figure-box-02,
  .hero-figure-box-03,
  .hero-figure-box-04,
  .hero-figure-box-08,
  .hero-figure-box-09 {
    @apply overflow-hidden;
  }
  .hero-figure-box-01::before,
  .hero-figure-box-02::before,
  .hero-figure-box-03::before,
  .hero-figure-box-04::before,
  .hero-figure-box-08::before,
  .hero-figure-box-09::before {
    @apply absolute inset-0;
  }
  .hero-figure-box-01 {
    left: 103.2%;
    top: 41.9%;
    width: 28.03%;
    height: 37.37%;
    background: linear-gradient(to left top, #00bffb, rgba(0, 191, 251, 0));
    transform: rotateZ(45deg);
  }
  .hero-figure-box-01::before {
    background: linear-gradient(to left, #15181d 0%, rgba(21, 24, 29, 0) 60%);
    transform: rotateZ(45deg) scale(1.5);
  }
  .hero-figure-box-02 {
    left: 61.3%;
    top: 64.1%;
    width: 37.87%;
    height: 50.5%;
    background: linear-gradient(to left top, #0270d7, rgba(2, 112, 215, 0));
    transform: rotateZ(-45deg);
  }
  .hero-figure-box-02::before {
    background: linear-gradient(to top, #15181d 0%, rgba(21, 24, 29, 0) 60%);
    transform: rotateZ(-45deg) scale(1.5);
  }
  .hero-figure-box-03 {
    left: 87.7%;
    top: -56.8%;
    width: 56.81%;
    height: 75.75%;
    background: linear-gradient(to left top, #00bffb, rgba(0, 191, 251, 0));
  }
  .hero-figure-box-03::before {
    background: linear-gradient(to left, #15181d 0%, rgba(21, 24, 29, 0) 60%);
    transform: rotateZ(45deg) scale(1.5);
  }
  .hero-figure-box-04 {
    left: 54.9%;
    top: -8%;
    width: 45.45%;
    height: 60.6%;
    background: linear-gradient(to left top, #0270d7, rgba(2, 112, 215, 0));
    transform: rotateZ(-135deg);
  }
  .hero-figure-box-04::before {
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: rotateZ(-45deg) scale(1.5);
  }
  .hero-figure-box-05,
  .hero-figure-box-06,
  .hero-figure-box-07 {
    background-color: #242830;
    box-shadow: -20px 32px 64px rgba(0, 0, 0, 0.25);
  }
  .hero-figure-box-05 {
    left: 17.4%;
    top: 13.3%;
    width: 64%;
    height: 73.7%;
    transform: perspective(500px) rotateY(-15deg) rotateX(8deg) rotateZ(-1deg);
  }
  .hero-figure-box-06 {
    left: 65.5%;
    top: 6.3%;
    width: 30.3%;
    height: 40.4%;
    transform: rotateZ(20deg);
  }
  .hero-figure-box-07 {
    left: 1.9%;
    top: 42.4%;
    width: 12.12%;
    height: 16.16%;
    transform: rotateZ(20deg);
  }
  .hero-figure-box-08 {
    left: 27.1%;
    top: 81.6%;
    width: 19.51%;
    height: 26.01%;
    background: #0270d7;
    transform: rotateZ(-22deg);
  }
  .hero-figure-box-08::before {
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.48) 100%
    );
    transform: rotateZ(45deg) scale(1.5);
  }
  .hero-figure-box-09 {
    left: 42.6%;
    top: -17.9%;
    width: 6.63%;
    height: 8.83%;
    background: #00bffb;
    transform: rotateZ(-52deg);
  }
  .hero-figure-box-09::before {
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.64) 100%
    );
    transform: rotateZ(45deg) scale(1.5);
  }
  .hero-figure-box-10 {
    left: -3.8%;
    top: 4.3%;
    width: 3.03%;
    height: 4.04%;
    background: rgba(0, 191, 251, 0.32);
    transform: rotateZ(-50deg);
  }
</style>

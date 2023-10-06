<template>
  <div class="bg-[#F5F4F4]">
    <div class="container 2xl:max-w-7xl mx-auto pt-[14px] pb-[8px] lg:pl-[52px] pr-[0px]">
      <Carousel
        :breakpoints="breakpoints"
        :mouse-drag="false"
        :itemsToShow="1"
        :touch-drag="false"
        :autoplay="2000"
        :snapAlign="center"
      >
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="carousel__item inline ml-[12px]">
            <NuxtLink to="" class="flex items-center">
              <div class="float-left">
                <NuxtImg class="h-[18px] lg:w-[28px] lg:h-[24px]" :src="slide.content" alt="" />
              </div>

              <p
                class="text-[12px] lg:text-[14px] font-[Arial] font-bold text-[#4a4a4a] ml-[7px] lg:mt-[4px] mt-[2px] md:text-[11px]"
              >
                {{ slide.title }}
              </p>
            </NuxtLink>
          </div>
        </Slide>
        <template #addons> </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

const props = defineProps({
  brakpoints: Object,
});

const breakpoints = {
  767: {
    itemsToShow: 3,
  },
};
const slides = [
  { id: '1', title: 'Free Delievery Over £299* ', content: '/img/truck.png' },
  { id: '2', title: 'Totaly free cut samples', content: '/img/sample.png' },
  { id: '3', title: 'Over 29,000 Positive Reviews', content: '/img/star.png' },
];
</script>
<style scoped>
@media only screen and (min-width: 1024px) {
  .carousel__slide {
    width: 30% !important;
  }
}
@media only screen and (min-width: 768px) {
  .carousel__slide {
    width: 29% !important;
  }
}

@media only screen and (max-width: 767px) {
  .carousel__slide {
    width: 100% !important;
  }
}
</style>
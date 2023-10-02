<template>
  <div class="bg-[#F5F4F4]">
    <div class="container mx-auto 2xl:max-w-7xl py-[11px] pr-[70px] mobile-only:py-[13px] Tab-only:py-[16px] pl-[44px]">
      <Carousel :breakpoints="breakpoints">
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="carousel__item flex justify-between">
            <img class="h-[24px] Tab-only:h-[18px]" :src="slide.content" />
            <p
              class="text-[14px] mobile-only:text-[12px] Lap-only:text-[14px] font-[Arial] font-bold text-[#4a4a4a] ml-[7px] mt-[4px] mb-[0rem] Lap-only:pr-[20px] Tab-only:text-[11px] Tab-only:ml-[6px] Tab-only:mt-[1px] Tab-only:pr-[16px]"
            >
              {{ slide.title }}
            </p>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const breakpoints = {
  320: {
    itemsToShow: 1,
    snapAlign: 'center',
    wrapAround: 'true',
    autoplay: '2000',
  },
  // 700px and up
  768: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
};
const slides = [
  { id: '1', title: 'Free Delievery Over £299* ', content: '/icons/truck.png' },
  { id: '2', title: 'Totaly free cut samples', content: '/icons/sample.png' },
  { id: '3', title: 'Over 29,000 Positive Reviews', content: '/icons/star.png' },
];
</script>

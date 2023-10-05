<template>
<div class="bg-[#F5F4F4]">
<div class="container mx-auto pt-[14px] pb-[8px] lg:pl-[52px] pr-[0px]  md:pl-[]" >
<Carousel :breakpoints="breakpoints"  :mouse-drag="false"  itemsToShow="1" :touch-drag="false" :autoplay= "2000" :snapAlign='center'>
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="carousel__item flex justify-between">
           <img class="h-[18px] lg:w-[32px] lg:h-[24px] " :src="slide.content"  alt="">
            <p   class="text-[12px] lg:text-[14px] font-[Arial] font-bold text-[#4a4a4a] ml-[7px] lg:mt-[4px] mt-[2px]  md:text-[11px]  md:pr-[25px] lg:pr-[45px] xl:pr-[127px]">
           {{slide.title}}
            </p>
      </div>
    </Slide>
    <template #addons>
    </template>
  </Carousel>
  </div>
</div>
</template>

<script setup>

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { Navigation, Pagination } from 'vue3-carousel'
import { ref } from 'vue';

const widthmd = ref(767);

const props = defineProps({
  brakpoints: Object,

})

const breakpoints = {
767: {
  itemsToShow: 3, 
},
 
};
  const slides = [
  { id: '1', title: "Free Delievery Over £299* " , content: '/img/truck.png' },
  { id: '2', title: "Totaly free cut samples", content: '/img/sample.png' },
  { id: '3', title: "Over 29,000 Positive Reviews",content: '/img/star.png' }
  ] 
 
 
  </script>
<style scoped>
</style>
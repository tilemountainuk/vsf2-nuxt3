<template>
  <Carousel :autoplay="4000" :wrap-around="true" :pagination="true" class="hidden md:block">
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="carousel__item relative ma">
        <div class="backdrop"></div>
        <img :src="slide.content" alt="slider" />
      </div>
    </Slide>
    <template #addons>
      <Pagination />
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
// :autoplay="4000"
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { Navigation, Pagination } from 'vue3-carousel';

const slides = [
  { id: '1', content: '/slider1.jpg' },
  { id: '2', content: '/slider2.jpg' },
  { id: '3', content: '/slider3.jpg' },
  { id: '4', content: '/slider3.jpg' },
];
</script>

<style scoped lang="scss">
.carousel__item {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}

carousel__slide {
  border: none !important;
}

.carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-text {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel__slide--active .product-text {
  animation-name: textTransform;
  animation-duration: 1.05s;
}

@keyframes textTransform {
  from {
    top: 65%;
  }
  to {
    top: 50%;
  }
}

.backdrop {
  background-color: #000;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
}

.sliderCAT {
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 20px 30px;
  border: none;
  border-radius: 30px;
  transition: background-color 250ms ease-in-out;
}

.sliderCAT:hover {
  background-color: #000;
}
</style>
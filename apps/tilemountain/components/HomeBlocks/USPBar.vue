<template>
  <div class="bg-[#F5F4F4]">
    <div class="container 2xl:max-w-7xl mx-auto pt-[14px] pb-[8px] lg:pl-[52px] pr-[0px]">
      <Carousel
          :items-to-show="3"
          :mouse-drag="false"
          :touch-drag="false"
          :autoplay="2000"
      >
        <Slide v-for="(slide, index) in blockData" :key="index">
          <div class="carousel__item inline ml-[12px]">
            <NuxtLink to="" class="flex items-center">
              <div class="float-left">
                <NuxtImg class="h-[18px] lg:w-[28px] lg:h-[24px]" :src="slide.img" alt=""/>
              </div>

              <p
                  class="text-[12px] lg:text-[14px] font-[Arial] font-bold text-[#4a4a4a] ml-[7px] lg:mt-[4px] mt-[2px] md:text-[11px]"
              >
                {{ slide.title }}
              </p>
            </NuxtLink>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parse } from 'node-html-parser';

interface ParseDataContent {
  content: string;
}

interface ReturnParseData {
  title: string;
  link: string | undefined;
  img: string | undefined;
}

const props = defineProps<{
  data: ParseDataContent;
}>();
const parseData = (data: string): ReturnParseData[] => {
  const root = parse(data);
  const uspArray: ReturnParseData[] = [];

  root.querySelectorAll('.item').forEach((data) => {
    const anchortextHtml = data.querySelector('a');
    const imgicon = data.querySelector('img');

    if (anchortextHtml) {
      const title = anchortextHtml.innerHTML;
      const link = anchortextHtml.getAttribute('href');
      const imgSource = imgicon?.getAttribute('src');

      const uspBlockData: ReturnParseData = {
        title,
        link,
        img: imgSource,
      };

      uspArray.push(uspBlockData);
    }
  });

  return uspArray;
};

const blockData = computed(() => parseData(props.data.content));
</script>


<template>
  <div>
    USP BAR IS LOADED <br />
    After Parsing : {{ blockData }}
  </div>
  <div class="bg-[#F5F4F4]">
    <div class="container mx-auto py-[11px] pr-[70px] mobile-only:py-[13px] Tab-only:py-[16px] pl-[44px]">
      <Carousel :breakpoints="breakpoints">
        <Slide v-for="(slide, index) in blockData" :key="index">
          <div class="carousel__item flex justify-between">
            <img class="h-[24px] Tab-only:h-[18px]" :src="slide.img" alt="" />
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

const breakpoints = {
  320: {
    itemsToShow: 1,
    snapAlign: 'center',
    wrapAround: true,
    autoplay: '2000',
  },
  // 700px and up
  768: {
    itemsToShow: 3,
    snapAlign: 'center',
    mouseDrag: false,
    touchDrag: false,
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
    mouseDrag: false,
    touchDrag: false,
  },
};
</script>

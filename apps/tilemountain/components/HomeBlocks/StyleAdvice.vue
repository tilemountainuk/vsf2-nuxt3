<template>
  <div class=" container 2xl:max-w-7xl mx-auto px-[8px] flex flex-col md:flex-row">
    <div class="bg-yellow-600:10 text-black h-26  basis-[50%] mx-w-[50%]">
      <h3 class="text-base md:text-xl lg:text xl:text-3xl mt-10 text-indigo-800 font-bold font-serif mb-4" v-html="blockData.title">
      </h3>
      <h1 class="text-[22px] md:text-[30px] lg:text-[36px] text-[#59595b] font-bold leading-5 m-0 font-normal">{{blockData.title2}}</h1>
      <p class="pr-20 pb-16 pt-7 line-height-[1.6] text-[#59595b]">{{blockData.subtitle}}</p>
      <nuxt-link :to="blockData.link" class="text-[#4f4f4f] relative hidden md:block">
        <button class="text-center border-0 font-bold h-14 leading-none text-base rounded-md bg-[#29275b] text-white mb-10 outline-none cursor-pointer m-0 px-10">{{blockData.button}}</button>
      </nuxt-link>
    </div>
    <div class="bg-yellow-600:10 text-black h-26 basis-[50%] mx-w-[100%]">
      <NuxtLink :to="blockData.link" class="decoration-[#4f4f4f] no-underline relative cursor-pointer mx-w-[100%]">
        <img src="https://m2.tilemountain.co.uk/media/wysiwyg/home-vid_05.1524600742.jpg" class="mb-4 w-100" />
        <button class="text-center border-0 font-bold h-14 leading-none text-base rounded-md bg-[#29275b] text-white outline-none px-10 block md:hidden mx-auto my-auto">{{blockData.button}}</button>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';

interface parseDataContent {
  content: string;
}
interface ReturnParseData {
  title: string;
  title2: string;
  subtitle: string;
  button: string;
  link: string;
  image: string;
}
const props = defineProps<{
  data: parseDataContent;
}>();
const parseData = (data: string): ReturnParseData => {
  const root = parse(data);
  const adviceBlockData: ReturnParseData = {
    title: '',
    title2: '',
    subtitle: '',
    button: '',
    link: '',
    image: '',
  };

  if (root) {
    const titleElement = root.querySelector('h3');
    const title2Element = root.querySelector('h1');
    const subtitleElement = root.querySelector('p');
    const buttonElement = root.querySelector('button');
    const linkElement = root.querySelector('a');
    const imageElement = root.querySelector('img');

    adviceBlockData.title = titleElement?.rawText || '';
    adviceBlockData.title2 = title2Element?.rawText || '';
    adviceBlockData.subtitle = subtitleElement?.rawText || '';
    adviceBlockData.button = buttonElement?.rawText || '';
    adviceBlockData.link = linkElement?.getAttribute('href') || '';
    adviceBlockData.image = imageElement?.getAttribute('src') || '';
  }

  return adviceBlockData;
};
const blockData = computed(() => parseData(props.data.content));
</script>

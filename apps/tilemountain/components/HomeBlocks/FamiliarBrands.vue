<template>
  <div class="text-[16px] font-[Roboto, sans-serif] font-[400] bg-[#fff] p-[0] md:bg-[#f1f1f1] md:pt-[1%]">
    <div class="container mx-auto  px-[8px]">
      <div class="flex flex-row flex-wrap mx-[-8px]">
        <div class=" cursor-pointer mb-[10px] mt-[4px] px-[14px] basis-full max-w-full smn:mb-[10px] sm:mt-[2px] sm:pr-[8px] sm:pl-[8px] sm:basis-[50%] sm:max-w-[50%] md:relative  md:pt-0 md:pr-[10px] md:pb-[8px] md:pl-[10px] md:basis-[33.33%] md:max-w-[33.33%] lg:basis-[33.33%] lg:max-w-[33.33%] "  v-for="(block, index) in blockData" :key="'tile' + index">
          <NuxtLink :to="block.atag"  class="decoration-[#4f4f4f] no-underline relative">
            <div class="relative pb-[109%]">
              <img :src="block.img" :alt="block.hthree" class=" object-contain transform -translate-x-1/2 -translate-y-1/2 absolute mb-[-4px] w-[100%] top-[50%] left-[50%] " />
              <div class="absolute bottom-0 bg-[rgba(207,206,202,0.7)] w-full font-[Arial] block text-[#29275b] text-[20px] py-[25px] text-center font-[700]">
                <h3 class="text-[16px] lg:text-[17.2px] md:text-[14px] xld:text-[22px] px-[6px] leading-[1.4]">
                  {{block.hthree}}
                </h3>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';
interface parseDataContent {
  content: string;
}
interface FamiliarSmallBlock {
  img: string;
  atag: string;
  hthree: string;
  btntxt: string;
  rockBottomSuperScript: string | '';
  classrockBottom: string;
}

const props = defineProps<{
  data: parseDataContent;
}>();
const parseData = (data: string): FamiliarSmallBlock[] => {
  const root = parse(data);
  const FamiliarSingleblockData: FamiliarSmallBlock[] = [];

  if (root) {
    const mbclasses = root.querySelectorAll('.mb_home_small_img');

    mbclasses.forEach((mbclass) => {
      const singleBlock = {
        img: mbclass.querySelector('img')?.getAttribute('src') || '',
        atag: mbclass.querySelector('a')?.innerHTML || '',
        hthree: mbclass.querySelector('h2')?.textContent || '',
        btntxt: mbclass.querySelector('button')?.textContent || '',
        rockBottomSuperScript: mbclass.querySelector('h2')?.outerHTML.includes('<sup>') ? '2' : '',
        classrockBottom: mbclass.classList.contains('stylishSaving') ? 'rockBottom' : '',
      };

      FamiliarSingleblockData.push(singleBlock);
    });
  }

  return FamiliarSingleblockData;
};
const blockData = computed(() => parseData(props.data.content));
</script>

<template>
  <div>
    Familiar Brand IS LOADED <br />
    After Parsing : {{ blockData }}
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
const parseData = (data: string) => {
  const root = parse(data);
  const FamiliarSingleblockData = ref<FamiliarSmallBlock[]>([]);

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

      FamiliarSingleblockData.value.push(singleBlock);
    });
  }

  return FamiliarSingleblockData;
};
const blockData = computed(() => parseData(props.data.content));
</script>

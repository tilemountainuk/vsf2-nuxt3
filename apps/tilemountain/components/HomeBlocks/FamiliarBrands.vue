<template>
  <div>
    familiar brand IS LOADED <br />
    After Parsing : {{ blockData }}
  </div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';
interface parseDataContent {
  content: string;
}
interface ReturnParseData {
  title: string;
  saveAllData: string | string[];
  anchorText: string;
  anchorLink: string;
  imgIcon: string;
}
const props = defineProps<{
  data: parseDataContent;
}>();
const parseData = (data: string) => {
  const root = parse(data);
  if (!root) return [];
  const saveAllData = Array.from(root.querySelectorAll('.mb_home_small_img')).map(data => {
    const anchortext = data.querySelector('h2')?.innerHTML || '';
    const anchorlink = data.querySelector('a')?.getAttribute('href') || '';
    const imgicon = data.querySelector('img')?.getAttribute('src') || ' ';
    return {
      title: anchortext.toString(),
      actuallink: anchorlink.toString(),
      icon: imgicon.toString()
    };
  })
  return saveAllData // Moved outside of the map function
};
const blockData = computed(() => parseData(props.data.content));
</script>

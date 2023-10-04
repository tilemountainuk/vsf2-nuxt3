<template>
  <div>
    STYLE AND ADVICE IS LOADED <br />
    After Parsing : {{ blockData }}
  </div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';
interface parseDataContent {
  content: string;
  saveAllData: string | string[];
  anchorLink: string;
  imgIcon: string;
}
interface ReturnParseData {
  saveAllData: string | string[];
  anchorLink: string;
  imgIcon: string;
}
const props = defineProps<{
  data: parseDataContent;
}>();
const parseData: parseDataContent = (data: string) => {
  const root = parse(data);
  if (!root) return [];
  const saveAllData:Array[] = Array.from(root.querySelectorAll('.mb_home_small_img')).map(data => {
    const anchorLink = data.querySelector('a')?.getAttribute('href') || '';
    const imgIcon = data.querySelector('img')?.getAttribute('src') || ' ';
    return {
      actualLink: anchorLink.toString(),
      icon: imgIcon.toString()
    };
  })
  return saveAllData // Moved outside of the map function
};
const blockData = computed(() => parseData(props.data.content));
</script>

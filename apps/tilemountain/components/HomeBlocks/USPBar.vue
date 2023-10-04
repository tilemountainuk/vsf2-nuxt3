<template>
  <div>
    USP BAR IS LOADED <br />
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
  const saveAllData = Array.from(root.querySelectorAll('.item')).map(data => {
    const anchorText = data.querySelector('a')?.innerHTML || '';
    const anchorLink = data.querySelector('a')?.getAttribute('href') || '';
    const imgIcon = data.querySelector('img')?.getAttribute('src') || ' ';
    return {
      title: anchorText.toString(),
      actuallink: anchorLink.toString(),
      icon: imgIcon.toString()
    };
  })
  return saveAllData// Moved outside of the map function
};
const blockData = computed(() => parseData(props.data.content));
</script>

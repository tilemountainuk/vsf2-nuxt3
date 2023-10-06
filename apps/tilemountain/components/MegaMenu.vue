<template>
  <!-- <div>Mega Menu is {{ data }}</div> -->
  <div>Mega Menu is {{ blockData }}</div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';

interface parseDataContent {
  content: string;
}
interface ReturnParseData {
  name: string;
  link: string;
}
const props = defineProps<{
  data: parseDataContent;
}>();
const parseData = (data: string): ReturnParseData[] => {
  const root = parse(data);
  const menuItemListArray: ReturnParseData[] = [];
  if (root) {
    // const menuContentHtml = root.querySelectorAll('.sb-menu');
    let menuItem = {
      name: 'Menu Item Name 1',
      link: 'Menu Item Link 1',
    };
    menuItemListArray.push(menuItem);
  }
  return menuItemListArray;
};
const blockData = computed(() => parseData(props.data.content));
</script>

<template>
  <div>SITE RATING IS LOADED Thew sa {{ blockData.title }}</div>
</template>
<script setup lang="ts">
import { parse } from 'node-html-parser';

interface parseDataContent {
  content: string;
}

interface ReturnParseData {
  title: string;
  subtitle: string;
  stars: string;
  logo: string;
}

const props = defineProps<{
  data: parseDataContent;
}>();

const parseData = (data: string) => {
  const root = parse(data);
  let ratingBlockData: ReturnParseData = {
    title: '',
    subtitle: '',
    stars: '',
    logo: '',
  };
  if (root.querySelector('h5')) {
    const titleElement = root.querySelector('h5');
    const subtitleElement = root.querySelector('p');
    if (titleElement) {
      const title = titleElement.rawText;
      ratingBlockData.title = title;
    }
    if (subtitleElement) {
      const subtitle = subtitleElement.rawText;
      ratingBlockData.subtitle = subtitle;
    }
    ratingBlockData.stars = 'From assets';
    ratingBlockData.logo = 'from assets';
  }
  return ratingBlockData;
};
const blockData = computed(() => parseData(props.data.content));
</script>

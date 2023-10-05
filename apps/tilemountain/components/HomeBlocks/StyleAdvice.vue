<template>
  <div>
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

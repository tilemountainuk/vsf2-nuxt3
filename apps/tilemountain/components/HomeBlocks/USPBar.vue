<template>
  <div>
    USP BAR IS LOADED <br />
    Original Data : {{ data }} <br />
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
  return ratingBlockData;
};
const blockData = computed(() => parseData(props.data.content));
</script>

<template>
  <div class="flex justify-center py-2 gap-x-6 md:self-start px-2">
    <a
      v-for="{ label, link, icon } in socialMediaNew"
      :key="label"
      :title="label"
      :href="link"
      target="_blank"
      rel="noopener"
      v-html="icon"
      class="text-white fill-white"
    >
    </a>
  </div>
</template>

<script setup lang="ts">
import { parse } from 'node-html-parser';

const props = defineProps<{ data: any }>();

interface SocialMedia {
  link: string;
  label: string;
  icon: string;
}

const parseData = (data: string): SocialMedia[] => {
  const root = parse(data);
  const socialLinksListArray: SocialMedia[] = [];

  if (!root) {
    return socialLinksListArray;
  }

  const socialMediaHtml = root.querySelectorAll('.sb-white-background');

  socialMediaHtml.forEach((socialMediaIcon) => {
    const socialIcons = socialMediaIcon.querySelectorAll('a');

    socialIcons.forEach((link, index) => {
      const iconLink = link.attributes['href'];
      const icon = link.innerHTML;

      const linkObject: SocialMedia = {
        link: iconLink || '',
        label: 'Social Link' + index,
        icon: icon || '',
      };

      socialLinksListArray.push(linkObject);
    });
  });

  return socialLinksListArray;
};
const socialMediaNew = computed(() => parseData(props.data));
console.log('>>>socialMediaNew', socialMediaNew)
console.log('>>>props.data', props.data)
</script>
<style scoped>
:deep(svg) {
  width: 20px;
  height: 20px;
}
</style>

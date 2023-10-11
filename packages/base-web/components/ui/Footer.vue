<template>
  <footer class="pt-10 bg-neutral-100 mb-[58px] md:mb-0" data-testid="footer">
    <div
      class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-screen-3xl mx-auto"
      data-testid="section-top"
    >
      <div v-for="{ key, subcategories } in FooterLinks" :key="key" class="min-w-[25%] xs:min-w-[50%] flex flex-col">
        <div class="ml-4 text-lg font-medium leading-7 text-neutral-900 font-body">
          {{ key }}
        </div>
        <ul>
          <SfListItem
            v-for="{ key: subcategoryKey, link } in subcategories"
            :key="subcategoryKey"
            class="py-2 !bg-transparent typography-text-sm font-body"
          >
            <SfLink
              :tag="NuxtLink"
              class="no-underline text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
              variant="secondary"
              :to="link"
            >
              {{ subcategoryKey }}
            </SfLink>
          </SfListItem>
        </ul>
      </div>
      <div class="min-w-[25%] xs:min-w-[50%] flex flex-col">
        <TMFooterSocial v-if="SocialMediaIcons" :data="SocialMediaIcons"/>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfButton, SfLink, SfListItem } from '@storefront-ui/vue';
import { parse } from 'node-html-parser';

const NuxtLink = resolveComponent('NuxtLink');

type BlockObject = {
  identifier: string;
  content: string;
  title: string;
  __typename: string;
};

type FooterArray = {
  identifier: string;
  block: BlockObject;
};

const props = defineProps<{ data: FooterArray[] }>();

type FooterLinks = {
  key?: string;
  link?: string;
};

const parseData = (data: string) => {
  const root = parse(data);

  const getSubCategoryNodes = (selector: string) =>
    root?.querySelectorAll(selector + ' li').map((element) => ({
      key: element.querySelector('a')?.rawText,
      link: element.querySelector('a')?.attributes['href'],
    })) || [];

  const footerSections = [
    { selector: '.footerlink1', key: '#footerlink1' },
    { selector: '.footerlink2', key: '#footerlink2' },
    { selector: '.footerlink3', key: '#footerlink3' },
  ];

  return footerSections.map((section) => ({
    key: root?.querySelector(section.key)?.innerHTML,
    subcategories: getSubCategoryNodes(section.selector),
  }));
};

const FooterLinks = computed(() =>
  parseData(
    props.data.find((data) => data.identifier === 'tm_footer_links')?.block.content || ''
  )
);

const SocialMediaIcons = computed(() => props.data.find((data) => data.identifier === 'sb-social-links')?.block.content);
</script>

<template>
  <footer class="pt-10 bg-footer mb-[58px] md:mb-0" data-testid="footer">
    <div
      class="flex justify-center container flex-col md:flex-row pb-10 pl-4 gap-4 md:gap-0 md:pl-0"
      data-testid="section-top"
    >
      <div v-for="{ key, subcategories } in FooterLinks" :key="key" class="flex-1 flex flex-col">
        <div class="text-lg font-medium leading-7 text-footer-heading">
          {{ key }}
        </div>
        <ul class="pt-2">
          <SfListItem
            v-for="{ key: subcategoryKey, link } in subcategories"
            :key="subcategoryKey"
            class="py-2 pl-0 !bg-transparent typography-text-sm font-body"
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
    </div>
    <div class="bg-primary">
      <div class="container flex flex-col justify-between items-center py-10 2md:py-4 2md:flex-row gap-4 2md:gap-0">
        <TMFooterSocial v-if="SocialMediaIcons" class="w-full 2md:w-auto" :data="SocialMediaIcons"/>
        <div class="flex items-center gap-3 py-3 md:py-0">
          <span class="fill-white"><TMLocation type='bottom' /></span>
          <span class="text-white font-medium">Find Your Local Store</span>
        </div>
        <div class="flex items-center gap-4">
          <div><TMIconsVisa/></div>
          <div><TMIconsMaestro/></div>
          <div><TMIconsAM/></div>
          <div><TMIconsMastercard/></div>
          <div><TMIconsVisa/></div>
        </div>
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

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
    <TMFooterBottom />
  </footer>
</template>

<script setup lang="ts">
import { SfLink, SfListItem } from '@storefront-ui/vue';
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

const FooterLinks = [
  {
    "key": "Customer Info",
    "subcategories": [
      {
        "key": "Clearance & Offers",
        "link": "/sale.html"
      },
      {
        "key": "Contact Us",
        "link": "/i/contact-us"
      },
      {
        "key": "Delivery",
        "link": "/i/delivery"
      },
      {
        "key": "FAQ",
        "link": "/i/faq"
      },
      {
        "key": "Discount & Vouchers",
        "link": "/i/discount-and-vouchers"
      },
      {
        "key": "Returns & Exchange Policy",
        "link": "/i/returns"
      },
      {
        "key": "Tile Terms Glossary",
        "link": "/i/tiles-terms-glossary"
      },
      {
        "key": "Samples",
        "link": "/i/sample-service"
      }
    ]
  },
  {
    "key": "Popular Tiles",
    "subcategories": [
      {
        "key": "Bathroom Tiles",
        "link": "/bathroom-tiles.html"
      },
      {
        "key": "Kitchen Tiles",
        "link": "/kitchen-tiles.html"
      },
      {
        "key": "Floor Tiles",
        "link": "/floor-tiles.html"
      },
      {
        "key": "Wall Tiles",
        "link": "/wall-tiles.html"
      },
      {
        "key": "Mosaic Tiles",
        "link": "/mosaic-tiles.html"
      },
      {
        "key": "Metro Subway Tiles",
        "link": "/metro-tiles.html"
      },
      {
        "key": "Porcelain Tiles",
        "link": "/porcelain-tiles.html"
      },
      {
        "key": "Quartz Tiles",
        "link": "/quartz-tiles.html"
      }
    ]
  },
  {
    "key": "Company",
    "subcategories": [
      {
        "key": "About Us",
        "link": "/i/about-us"
      },
      {
        "key": "Careers",
        "link": "/i/careers_info"
      },
      {
        "key": "Press",
        "link": "/blog/category/tile-mountain-press-releases/"
      },
      {
        "key": "Terms Of Use",
        "link": "/i/terms_of_use"
      },
      {
        "key": "Terms & Conditions",
        "link": "/i/terms_and_condition"
      },
      {
        "key": "Privacy Policy",
        "link": "/i/privacy_policy"
      },
      {
        "key": "Sitemap",
        "link": "/i/site_map"
      },
      {
        "key": "Our Flagship Showrooms",
        "link": "/i/showrooms_info"
      },
      {
        "key": "Bathroom Mountain",
        "link": "https://www.bathroommountain.co.uk/"
      }
    ]
  }
]


</script>

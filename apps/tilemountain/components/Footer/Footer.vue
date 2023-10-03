<template>
  <div>Footer IS LOADEDs</div>
  {{ FooterDataAllComputed }}
  FooterBlocksData - {{ FooterDataAllComputed[0].block }}
  <SiteRating :data="FooterDataAllComputed[0].block" />
</template>
<script setup lang="ts">
const { data: FooterBlocksData } = useCmsBlocks({
  identifiers: ['trust-pilot', 'tm_footer_links', 'sb-social-links']
});

const FooterDataAllComputed = computed(() =>
  FooterBlocksData.value.filter((footerBlock) => footerBlock.identifier === 'trust-pilot')
);
</script>

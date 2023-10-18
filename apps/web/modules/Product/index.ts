import { createResolver, defineNuxtModule, extendPages, addComponentsDir, addImportsDir } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'Product',
  },
  setup() {
    console.log('Product Module');
    const resolver = createResolver(import.meta.url);
    extendPages((pages) => {
      pages.unshift({
        name: 'pdp',
        path: '/p/:slug',
        file: resolver.resolve('pages/p/[slug].vue'),
      });
    });
    // Import components
    addComponentsDir({
      path: resolver.resolve('components'),
      prefix: 'Product',
    });
    // Import composables
    addImportsDir(resolver.resolve('composables'));
  },
});

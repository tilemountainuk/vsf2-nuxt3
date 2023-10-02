import sfTypography from '@storefront-ui/typography';
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';
import type { Config } from 'tailwindcss';

export default {
  presets: [tailwindConfig],
  content: ['./**/*.vue', '../../node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        'product-page': ['left-top right', 'left-bottom right'],
      },
      gridTemplateColumns: {
        'product-page': 'minmax(56%, 500px) auto',
      },
      gridTemplateRows: {
        'category-sidebar': 'min-content auto min-content',
      },
      screens: {
        '4xl': '1920px',
        '3xl': '1536px',
        '2xl': '1366px',
        xl: '1280px',
        lg: '1024px',
        '2md': '992px',
        md: '768px',
        sm: '640px',
        xs: '376px',
        '2xs': '360px',
        '2sm': '576px',
        '1xl': '1200px',
        '3xs': { max: '420px' },
        '4xs': { max: '480px' },
        mp: { max: '767px' },
        tab: { max: '991px' },
        '1tab': { max: '1199px' },
      },
      fontSize: {
        '11': '11px',
        '13': '13px',
        '15': '15px',
        '17': '17px',
      },
      fontFamily: {
        'arial': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [sfTypography, require('@savvywombat/tailwindcss-grid-areas')],
} as Config;

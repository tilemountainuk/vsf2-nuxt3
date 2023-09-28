# Nuxt 3 CMS Blocks Composable

## Overview

This is a Nuxt 3 composable for fetching CMS blocks from Magento. It allows you to easily integrate CMS content into your Nuxt 3 application.

## Features

- Fetch CMS blocks based on identifiers
- Optionally include default CMS blocks
- Fetch CMS blocks based on pages

## Installation

To install this composable, add it to your project's `composables` directory.

## Usage

### Basic Usage

Here's how you can use this composable in your Nuxt 3 application.

In your component:

```vue
<script setup>
const { getCmsBlocks, data } = useCmsBlocks({ page: 'home' });
// Trigger the method to fetch the CMSBlocks Data
getCmsBlocks();
</script>
```

### Parameters
The `useCmsBlocks` composable accepts an object with the following keys:

`page`: The page for which to fetch CMS blocks. (Type: `string`)

`identifiers`: An array of additional identifiers to fetch. (Type: `string | string[]`)

`includeDefaults`: A boolean flag to include default CMS blocks. (Type: `boolean`, default: `false`)

### Returned Data
The composable returns an object with the following keys:

`getCmsBlocks`: A function to trigger the CMS blocks fetching.
`data`: A reactive reference holding the fetched CMS blocks data.

<template>
  <div>
<!--    <div v-if="products">
      <h1>Product List</h1>
      <ul>
        <li v-for="product in products.items" :key="product.id">
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      No products found.
    </div>-->
  </div>
</template>

<script setup lang="ts">
/*import { ref } from 'vue';
import { useSdk } from '~/sdk';
const { magento } = useSdk();

interface Product {
  id: string;
  name: string;
  sku: string;

  [key: string]: string;
  // ... other fields
}

interface ProductsResponse {
  items: Product[];
  // ... other fields
}

const products = ref<ProductsResponse | null>(null);

async function fetchProducts() {
  try {

    const customQuery = {
      products: 'products-my-custom-query',
      metadata: {
        fields: 'items { id sku name }',
      },
    };

    const { data } = await magento.products({
      filter: {
        sku: {
          eq: '445520', // optional SKU filter
        },
      },
    }, { customQuery });

    if (data) {
      products.value = data.products as unknown as ProductsResponse;  // Typecast if necessary
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

// Fetch products on component mount
fetchProducts();*/
</script>


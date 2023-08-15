export const searchCustomQuery = {
  products: 'products-custom-query',
  metadata: {
    fields: `
      items {
          sku
          name
          url_key
      }
    `,
  },
};

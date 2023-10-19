export const productDetailsCustomQuery = {
  productDetails: 'product-details-custom-query',
  metadata: {
    fields: `
        items {
          uid
          sku
          name
          media_gallery {
            url
            label
          }
          price_range {
            maximum_price {
              regular_price {
                currency
                value
              }
              final_price {
                currency
                value
              }
            }
            minimum_price {
              regular_price {
                currency
                value
              }
              final_price {
                currency
                value
              }
            }
          }
          url_key
          url_path
          thumbnail {
            url
          }
        }
      `,
  },
};

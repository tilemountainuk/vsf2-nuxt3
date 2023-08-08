export const productDetailsCustomQuery = {
  productDetails: 'product-details-custom-query',
  metadata: {
    fields: `
      items {
        name
        sku
        review_count
        size
        description {
          html
        }
        media_gallery {
          disabled
          label
          position
          url
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
      }
    `,
  },
};

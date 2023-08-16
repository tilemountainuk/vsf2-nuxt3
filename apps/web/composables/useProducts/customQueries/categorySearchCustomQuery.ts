export const categorySearchCustomQuery = {
  categorySearch: 'category-search-custom-query',
  metadata: {
    fields: `
        name
        product_count
        products {
            items {
                uid
                sku
                name
                price_range {
                    maximum_price {
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        regular_price {
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
            page_info {
                total_pages
                page_size
                current_page
            }
        }
      `,
  },
};

export const categoryMenuCustomQuery = {
  categorySearch: 'category-search-custom-query',
  metadata: {
    fields: `
        name
        children {
            name
            url_key
            children {
                name
                url_key
            }
        }
    `,
  },
};

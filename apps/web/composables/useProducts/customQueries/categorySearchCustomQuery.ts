export const categorySearchCustomQuery = {
    categorySearch: 'category-search-custom-query',
    metadata: {
        fields: `products {
        items {
            uid
            sku
            name
            url_key
        }
    }`,
    },
};

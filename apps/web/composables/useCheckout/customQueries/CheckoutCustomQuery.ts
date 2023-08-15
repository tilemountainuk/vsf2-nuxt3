export const setBillingAddressOnCartCustomQuery: {
  setBillingAddressOnCart: string;
  metadata?: { fields: string };
} = {
  setBillingAddressOnCart: 'set-billing-address-on-cart-custom-query',
  metadata: {
    fields: `
        id
        total_quantity
        is_virtual
        billing_address {
            city
            company
            country {
                code
                label
            }
            firstname
            lastname
            postcode
            region {
                code
                label
                region_id
            }
            street
            telephone
        }
        applied_coupons { 
            code
        }
        prices {
            grand_total {
                currency
                value
            }
            subtotal_including_tax {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
        }
        items {
            uid
            quantity
            product {
                name
                sku
                url_key
                url_path
                thumbnail {
                url
                }
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
            }
        }
    `,
  },
};
export const setShippingAddressesOnCartCustomQuery: {
  setShippingAddressesOnCart: string;
  metadata?: { fields: string };
} = {
  setShippingAddressesOnCart: 'set-shipping-addresses-on-cart-custom-query',
  metadata: {
    fields: `
          id
          total_quantity
          is_virtual
          shipping_addresses {
            city
              company
              country {
                  code
                  label
              }
              firstname
              lastname
              postcode
              region {
                  code
                  label
                  region_id
              }
              street
              telephone
          }
          billing_address {
              city
              company
              country {
                  code
                  label
              }
              firstname
              lastname
              postcode
              region {
                  code
                  label
                  region_id
              }
              street
              telephone
          }
          applied_coupons { 
              code
          }
          prices {
              grand_total {
                  currency
                  value
              }
              subtotal_including_tax {
                  currency
                  value
              }
              discounts {
                  amount {
                      currency
                      value
                  }
                  label
              }
          }
          items {
              uid
              quantity
              product {
                  name
                  sku
                  url_key
                  url_path
                  thumbnail {
                  url
                  }
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
              }
          }
      `,
  },
};

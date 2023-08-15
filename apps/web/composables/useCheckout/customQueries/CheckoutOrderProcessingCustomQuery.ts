export const setShippingMethodsOnCartCustomQuery: {
  setShippingMethodsOnCart: string;
  metadata?: { fields: string };
} = {
  setShippingMethodsOnCart: 'set-shipping-methods-on-cart-custom-query',
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
            shipping_addresses {
                available_shipping_methods {
                    amount {
                        currency
                        value
                    }
                    available
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                    price_incl_tax {
                        currency
                        value
                    }
                }
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

export const setPaymentMethodOnCartCustomQuery: {
  setPaymentMethodOnCart: string;
  metadata?: { fields: string };
} = {
  setPaymentMethodOnCart: 'set-payment-method-on-cart-custom-query',
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
            shipping_addresses {
                available_shipping_methods {
                    amount {
                        currency
                        value
                    }
                    available
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                    price_incl_tax {
                        currency
                        value
                    }
                }
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
            available_payment_methods {
                code
                title
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

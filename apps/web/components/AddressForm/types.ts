import { Maybe } from '@vue-storefront/unified-data-model';

interface M2Address {
  address1: Maybe<string>;
  address2?: Maybe<string>;
  city: Maybe<string>;
  street: Maybe<string>;
  country: { code: string };
  firstname: string;
  lastname: string;
  telephone: string;
  postcode: Maybe<string>;
  state: Maybe<string>;
  titleCode: Maybe<string>;
}

export type AddressFormProps = {
  type: 'billingAddress' | 'shippingAddress';
  // savedAddress?: M2Address[] | Maybe<M2Address>;
  savedAddress?: any;
};

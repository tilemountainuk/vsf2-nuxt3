import { SfAddress, Maybe } from '@vue-storefront/unified-data-model';

export interface Address extends SfAddress {
  streetNumber: Maybe<string>;
  phone: Maybe<string>;
  streetName: Maybe<string>;
}
interface M2Country {
  code: string;
}
interface M2Address {
  address1: Maybe<string>;
  address2?: Maybe<string>;
  city: Maybe<string>;
  street: Maybe<string>;
  country: Maybe<M2Country>;
  firstname: string;
  lastname: string;
  telephone: string;
  postcode: Maybe<string>;
  state: Maybe<string>;
  titleCode: Maybe<string>;
}
export type CheckoutAddressProps = {
  type: 'billingAddress' | 'shippingAddress';
  heading: string;
  description: string;
  buttonText: string;
  savedAddress?: M2Address[] | Maybe<M2Address>;
};

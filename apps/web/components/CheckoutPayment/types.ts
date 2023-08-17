export enum PaymentMethod {
  CreditCard = 'checkmo',
  PayPal = 'banktransfer',
}

export type CheckoutPaymentProps = {
  activePayment: string;
};

export type CheckoutPaymentEmits = (event: 'update:activePayment', parameter: PaymentMethod) => void;

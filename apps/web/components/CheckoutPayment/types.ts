export enum PaymentMethod {
  CreditCard = 'checkoutcom_card_payment',
  PayPal = 'paypal_express',
}

export type CheckoutPaymentProps = {
  activePayment: string;
};

export type CheckoutPaymentEmits = (event: 'update:activePayment', parameter: PaymentMethod) => void;
